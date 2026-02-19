import { openDB, IDBPDatabase } from "idb";

export interface ResourcePagination<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
  };
}

const DB_NAME = "DataShare-prev";
const DB_VERSION = 1;
const memoryCache = new Map<string, any[]>();
const suspenseCache = new Map<
  string,
  {
    status: "pending" | "success" | "error";
    data?: any;
    error?: any;
    promise?: Promise<void>;
  }
>();

async function ensureDBAndStore(storeName: string): Promise<IDBPDatabase> {
  let db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, ...others) {
      console.log({ "upgrade ?": others });
      console.log({
        storeName,
        exists: db.objectStoreNames.contains(storeName),
      });

      if (!db.objectStoreNames.contains(storeName)) {
        const result = db.createObjectStore(storeName, {
          autoIncrement: true,
        });
        console.log({ result });
      }
    },
  }).catch((error) => console.error(error));

  return db as IDBPDatabase;
}
export interface PaginationPayload<T> {
  records: T[];
  nextPage: number | null;
}
// waring: atomic write ?
function appendPageToCache(
  cache: Map<string, any[]>,
  cacheKey: string,
  item: any,
) {
  if (cache.has(cacheKey)) {
    const cachedPages = cache.get(cacheKey)!;
    cachedPages.push(item);
    cache.set(cacheKey, cachedPages);
    console.log({ expectedFromAppend: cachedPages });
  } else {
    cache.set(cacheKey, [item]);
    console.log({ expectedFromAppendEmptyCache: [item] });
  }
}
export function paginationCache<ResourceType>(
  resourceName: string,
  fetchPromise: (page?: number) => Promise<ResourcePagination<ResourceType>>,
) {
  return {
    read(
      page?: number,
      updater?: (pages: PaginationPayload<ResourceType>[]) => void,
    ): PaginationPayload<ResourceType>[] | void {
      // waring: pageoffset start at 1 how prevent 0 accessor ?
      const requestedPage = page ?? 1;
      console.log({
        requestedPage,
        [resourceName]: suspenseCache.get(resourceName),
      });
      // 1. Check module-based cache
      if (memoryCache.has(resourceName)) {
        const cachedPages = memoryCache.get(resourceName)!;

        if (cachedPages[Math.trunc(requestedPage) - 1]) {
          console.log("[returning from cached pages]");
          suspenseCache.delete(resourceName);
          return cachedPages;
        }
      }

      // 2. Check suspense cache for ongoing or completed operations
      let record = suspenseCache.get(resourceName);
      console.log(record);
      if (!record) {
        const promise = (async () => {
          try {
            const dbWithStore = await ensureDBAndStore(resourceName);

            const storedData = (await dbWithStore.getAll(
              resourceName,
            )) as PaginationPayload<ResourceType>[];
            console.log({
              storedData,
              requestedPage: Math.trunc(requestedPage) - 1,
              currentStoragePage: storedData[Math.trunc(requestedPage) - 1],
            });
            if (storedData && storedData[Math.trunc(requestedPage) - 1]) {
              console.log("[returning and reset cache from indexedDB]");
              memoryCache.set(resourceName, storedData);
              suspenseCache.set(resourceName, {
                status: "success",
                data: storedData,
              });
              return;
            }

            // B. If not in DB or store doesn't exist, use the promise
            const response = await fetchPromise(
              Math.trunc(requestedPage) > 1
                ? Math.trunc(requestedPage)
                : undefined,
            );
            // const data = response.data;
            const {
              current_page,
              last_page,
              // per_page,
              // total,
            } = response.meta;
            // console.log({ resourceName, data });
            const data = {
              records: response.data,
              nextPage: current_page === last_page ? null : current_page + 1,
            };

            // C. Store in IndexedDB
            const tx = dbWithStore.transaction(resourceName, "readwrite");
            const store = tx.objectStore(resourceName);
            // await store.clear();
            await store.add(data);
            await tx.done;

            // D. Store in module-based cache
            appendPageToCache(memoryCache, resourceName, data);
            console.log({ afterAppend: memoryCache.get(resourceName) });
            if (typeof updater === "function") {
              updater(
                memoryCache.get(
                  resourceName,
                ) as PaginationPayload<ResourceType>[],
              );
              suspenseCache.delete(resourceName);
              return;
            }
            suspenseCache.set(resourceName, {
              status: "success",
              data: memoryCache.get(resourceName),
            });
          } catch (error) {
            suspenseCache.set(resourceName, { status: "error", error });
          }
        })();

        record = { status: "pending", promise };
        suspenseCache.set(resourceName, record);
      }
      console.log({ record, updater: updater?.toString(), page });
      if (typeof updater !== "function") {
        if (record.status === "pending") {
          throw record.promise;
        } else if (record.status === "error") {
          throw record.error;
        } else {
          console.log("[returning from successful fetch]");
          suspenseCache.delete(resourceName);
          return record.data;
        }
      }
    },
  };
}
