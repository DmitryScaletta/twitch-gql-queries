import type { QueryVariablesMap } from "./generated/types.generated.ts";

export const getQuery = <TName extends keyof QueryVariablesMap>(
  [operationName, sha256Hash]: readonly [TName, string],
  variables?: QueryVariablesMap[TName],
) => ({
  operationName,
  variables: (variables ?? {}) as QueryVariablesMap[TName],
  extensions: { persistedQuery: { version: 1, sha256Hash } },
});
