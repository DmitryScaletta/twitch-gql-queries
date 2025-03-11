import type { ClipsCardsUserVariables } from '../types.generated.ts';

export const getQueryClipsCardsUser = (variables: ClipsCardsUserVariables) => ({
  operationName: 'ClipsCards__User' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'af4bd82dcacdda3d693ed274e29b2c97b4990de2b1e683994b16ea26f3abd1af',
    },
  },
});
