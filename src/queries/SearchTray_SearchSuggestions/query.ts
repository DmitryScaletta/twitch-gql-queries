import type { SearchTraySearchSuggestionsVariables } from '../types.generated.ts';

export const getQuerySearchTraySuggestions = (
  variables: SearchTraySearchSuggestionsVariables,
) => ({
  operationName: 'SearchTray_SearchSuggestions' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '34e1899cd559b7d6a4ac25e3bdaad37a83324644b0085b4cc478d0f845f8f0de',
    },
  },
});
