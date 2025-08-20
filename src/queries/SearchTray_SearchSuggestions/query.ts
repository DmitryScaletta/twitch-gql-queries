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
        '2749d8bc89a2ddd37518e23742a4287becd3064c40465d8b57317cabd0efe096',
    },
  },
});
