import type { SearchResultsPageSearchResultsVariables } from '../types.generated.ts';

export const getQuerySearchResultsPageSearchResults = (
  variables: SearchResultsPageSearchResultsVariables,
) => ({
  operationName: 'SearchResultsPage_SearchResults' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'f6c2575aee4418e8a616e03364d8bcdbf0b10a5c87b59f523569dacc963e8da5',
    },
  },
});
