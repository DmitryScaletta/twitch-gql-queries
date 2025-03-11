import type { ClipsCardsGameVariables } from '../types.generated.ts';

export const getQueryClipsCardsGame = (variables: ClipsCardsGameVariables) => ({
  operationName: 'ClipsCards__Game' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'ed57101f7f38b69456f50413b05e044e505a0bdcad819ad5ee734b9c3b74cf8c',
    },
  },
});
