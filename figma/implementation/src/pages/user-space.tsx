import { Icons } from "../contexts/Icons";
import { cn } from "../lib/utils";
import { Copyright } from "../components/Copyright";
import { HeaderActions } from "../components/PageHeader/HeaderActions";
import { Suspense, useState, type ReactElement } from "react";
import MimeTypeIcon from "../components/MimeTypeIcon";
import { type UploadDetail, type PaginatedUploads } from "@datashare/types";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { UploadFilter } from "../components/UploadFilter";
import {
  paginationCache,
  type PaginationPayload,
} from "@datashare/pagination-cache";
import ErrorBoundary from "../components/ErrorBoundary";
import Profile from "../components/PageHeader/Profile";

function FileEntry({
  mimeType,
  fileName,
  expiration,
  isExpired,
  isLocked,
  downloadLink,
}: {
  mimeType: string;
  fileName: string;
  expiration: string;
  isExpired?: boolean;
  isLocked?: boolean;
  downloadLink: string;
}) {
  return (
    <Icons.Consumer>
      {({ deleteIcon, accessIcon, lockIcon }) => (
        <div
          className={cn(
            "bg-orange-50/5 border border-orange-200/50 rounded-lg flex items-center p-3 pb-7 pt-7 gap-4 w-full overflow-hidden",
          )}
        >
          <div className={cn("flex flex-0 items-center")}>
            <MimeTypeIcon mimeType={mimeType} classes={cn("w-6 h-6")} />
          </div>
          <div
            className={cn(
              "flex flex-11 flex-col overflow-hidden text-ellipsis w-full",
            )}
          >
            <p
              className={cn("font-semibold text-black truncate")}
              title={fileName}
            >
              {fileName}
            </p>
            <p
              className={cn(
                "text-sm",
                isExpired ? "text-red-600" : "text-black",
              )}
            >
              {expiration}
            </p>
          </div>
          {isExpired ? (
            <p className={cn("text-sm text-gray-500 hidden md:block")}>
              Ce fichier à expiré, il n’est plus stocké chez nous
            </p>
          ) : (
            <div className={cn("flex-initial flex items-center gap-2")}>
              {isLocked && (
                <img src={lockIcon} alt="lock icon" className={cn("w-4 h-4")} />
              )}
              <button className={cn("md:hidden")}>...</button>
              <div className={cn("hidden md:inline-flex md:gap-2")}>
                <button
                  className={cn(
                    "flex items-center gap-2 p-2 border border-orange-300 rounded-md",
                  )}
                >
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    className={cn("w-4 h-4")}
                  />
                  <span>Supprimer</span>
                </button>
                <a
                  href={downloadLink}
                  className={cn(
                    "flex items-center gap-2 p-2 border border-orange-300 rounded-md",
                  )}
                >
                  <span>Accéder</span>
                  <img
                    src={accessIcon}
                    alt="access icon"
                    className={cn("w-4 h-4")}
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </Icons.Consumer>
  );
}

function UploadsJSON({
  uploads,
}: {
  uploads: (number?: number) => Promise<PaginatedUploads>;
}) {
  const uploadPagination = paginationCache<UploadDetail>(
    "uploads-meta",
    uploads,
  );
  const resolved = uploadPagination.read();

  console.log({ resolved });
  const [loadedUploads, setLoadedUploads] = useState<UploadDetail[]>(
    resolved.reduce((localUploads, { records }) => {
      return localUploads.concat(records);
    }, [] as UploadDetail[]),
  );
  const [nextPage, setNextPage] = useState<number | null>(
    resolved[resolved.length - 1].nextPage,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(
    loadedUploads
      .reduce((mostRecent, uploaded) => {
        // console.log(uploaded);
        // console.log({
        //   mostRecent: mostRecent.getUTCMilliseconds(),
        //   currentCreation: new Date(uploaded.created_at).getUTCMilliseconds(),
        //   currentDeletion: new Date(
        //     uploaded.deleted_at ?? 0,
        //   ).getUTCMilliseconds(),
        // });
        return new Date(
          Math.max(
            mostRecent.getTime(),
            new Date(uploaded.created_at).getTime(),
            new Date(uploaded.deleted_at).getTime(),
          ),
        );
      }, new Date(0))
      .getTime(),
  );
  const handleLoadMore = async () => {
    console.log(nextPage);
    if (!nextPage) return;
    setIsLoadingMore(true);
    setError(null);
    try {
      uploadPagination.read(
        nextPage,
        (response: PaginationPayload<UploadDetail>[]) => {
          console.log(response);
          setLoadedUploads(
            response.reduce((localUploads, { records }) => {
              return localUploads.concat(records);
            }, [] as UploadDetail[]),
          );
          setNextPage(response[response.length - 1].nextPage);
        },
      );
    } catch (error) {
      console.error("Failed to load more uploads", error);
      setError("Une erreur est survenue lors du chargement des fichiers.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      {loadedUploads.map((upload) => {
        const hasExpired = new Date(upload.expires_at) < new Date();
        return (
          <FileEntry
            key={upload.uuid}
            isExpired={hasExpired}
            mimeType={upload.mime_type}
            fileName={upload.original_name}
            expiration={
              hasExpired
                ? "Expiré"
                : `Expire ${formatDistance(
                    new Date(upload.expires_at),
                    new Date(),
                    {
                      locale: fr,
                      addSuffix: true,
                    },
                  )}`
            }
            downloadLink={upload.url}
            isLocked={upload.locked}
          />
        );
      })}
      {error && (
        <div
          className={cn(
            "mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-lg self-center",
          )}
        >
          {error}
        </div>
      )}
      {nextPage && (
        <button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          className={cn(
            "mt-4 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 disabled:opacity-50 self-center",
          )}
        >
          {isLoadingMore ? "Chargement..." : "Charger plus"}
        </button>
      )}
    </>
  );
}

export default function UserSpacePage({
  uploads,
  user,
  refresher,
  actions,
  SidebarProvider,
  Sidebar,
  AppShell,
  SidebarTrigger,
  Avatar,
  AvatarFallback,
}: {
  refresher: () => void;
  user: { name: string; avatarUrl?: string };
  uploads: (number?: string) => Promise<PaginatedUploads>;
  actions: {
    logout: () => { url: string; method: "post" };
    upload: () => { url: string; method: "get" };
  };
  Sidebar: ReactElement;
  SidebarProvider: ReactElement;
  AppShell: ReactElement;
  SidebarTrigger: ReactElement;
  Avatar: ReactElement;
  AvatarFallback: ReactElement;
}) {
  return (
    <Icons.Consumer>
      {({ logoutIcon }) => (
        <AppShell variant="sidebar">
          <SidebarProvider defaultOpen={true} className={cn("block")}>
            <div className={cn("flex h-screen bg-[#fff8f3]")}>
              <Sidebar collapsible="icon" variant="inset">
                <aside
                  className={cn(
                    "flex flex-col -right-2 -left-2 -top-2 -bottom-2 absolute",
                  )}
                  style={{
                    backgroundImage:
                      "linear-gradient(153.58deg, #FFB88C 2.29%, #DE6262 97.71%)",
                  }}
                >
                  <div className={cn("p-8")}>
                    <h1 className={cn("text-4xl font-bold text-white")}>
                      <span className={cn("md:hidden pr-6 align-text-top")}>
                        <SidebarTrigger>
                          <Icons.Consumer>
                            {({ CloseMenuIcon }) => <CloseMenuIcon />}
                          </Icons.Consumer>
                        </SidebarTrigger>
                      </span>
                      DataShare
                    </h1>
                  </div>
                  <nav className={cn("p-6")}>
                    <a
                      href="#"
                      className={cn(
                        "block bg-white/40 text-orange-900 font-semibold p-3 rounded-xl",
                      )}
                    >
                      Mes fichiers
                    </a>
                  </nav>
                  <div
                    className={cn(
                      "mt-auto p-6 text-white/80 text-sm font-inter ",
                    )}
                  >
                    <Copyright />
                  </div>
                </aside>
              </Sidebar>

              <div className={cn("flex-1 flex flex-col overflow-hidden")}>
                <header
                  className={cn(
                    "bg-[#ffeee3] border-b border-orange-200/50 flex justify-end items-center p-4",
                  )}
                >
                  <span className={cn("w-full md:hidden")}>
                    <Profile
                      name={user.name}
                      avatarUrl={user.avatarUrl}
                      Avatar={Avatar}
                      AvatarFallback={AvatarFallback}
                      SidebarTrigger={SidebarTrigger}
                    />
                  </span>

                  <span className={cn("hidden md:block")}>
                    <HeaderActions {...{ actions, logoutIcon }} />
                  </span>
                </header>

                <main
                  className={cn("p-6 flex flex-col gap-6  overflow-hidden")}
                >
                  <h2 className={cn("text-3xl font-bold text-black")}>
                    Mes fichiers
                  </h2>
                  <UploadFilter className={cn("w-full md:w-fit")} />
                  <button
                    onClick={() => {
                      refresher();
                    }}
                  >
                    refresh
                  </button>
                  <div
                    className={cn(
                      "flex flex-col gap-4 overflow-y-auto overflow-x-hidden pr-3.5 w-[calc(100%+var(--spacing)*3.5)]",
                    )}
                  >
                    <ErrorBoundary>
                      <Suspense fallback={<div>Chargement ...</div>}>
                        <UploadsJSON uploads={uploads} />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AppShell>
      )}
    </Icons.Consumer>
  );
}
