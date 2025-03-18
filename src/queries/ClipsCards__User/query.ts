import type { ClipsCardsUserVariables } from '../types.generated.ts';

export const getQueryClipsCardsUser = (variables: ClipsCardsUserVariables) => ({
  operationName: 'ClipsCards__User' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '4eb8f85fc41a36c481d809e8e99b2a32127fdb7647c336d27743ec4a88c4ea44',
    },
  },
});
