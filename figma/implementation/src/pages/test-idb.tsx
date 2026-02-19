import { Suspense, Fragment } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { paginationCache } from "@datashare/pagination-cache";
interface DefinitionResult {
  uuid: string;
  term: string;
  definition: string;
}
export interface PaginatedDefinition {
  data: DefinitionResult[];
}
function Definition({
  requester,
  storeName,
}: {
  requester: () => Promise<PaginatedDefinition>;
  storeName: string;
}) {
  const definitions = paginationCache<DefinitionResult>(
    storeName,
    requester,
  ).read();
  console.log({ definitions });
  return (
    <Fragment>
      <h1>jjjj</h1>
      <dl>
        {definitions.map((definition) => (
          <Fragment key={definition.uuid}>
            <dt>{definition.term}</dt>
            <dd>{definition.definition}</dd>
          </Fragment>
        ))}
      </dl>
    </Fragment>
  );
}
export default function SampleSuspense({
  requester,
  storeName,
}: {
  requester: () => Promise<PaginatedDefinition>;
  storeName: string;
}) {
  return (
    <ErrorBoundary>
      <Suspense fallback="Préparation des données ...">
        <Definition {...{ requester, storeName }} />
      </Suspense>
    </ErrorBoundary>
  );
}
