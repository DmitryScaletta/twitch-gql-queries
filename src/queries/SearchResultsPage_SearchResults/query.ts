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
        'f4964f83289fa2d6b6454e7d765e32a1f2d1d2b63884ff919c96a3d597a35518',
    },
  },
});
