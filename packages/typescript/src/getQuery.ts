import { sha256Hashes } from "./generated/operations.generated.ts";
import type { QueryVariablesMap } from "./generated/types.generated.ts";

export const getQuery = <TName extends keyof QueryVariablesMap>(
  operationName: TName,
  variables?: QueryVariablesMap[TName],
) => ({
  operationName,
  variables: (variables ?? {}) as QueryVariablesMap[TName],
  extensions: {
    persistedQuery: { version: 1, sha256Hash: sha256Hashes[operationName] },
  },
});
