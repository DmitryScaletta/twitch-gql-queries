import type { ClipsCardsGameVariables } from '../types.generated.ts';

export const getQueryClipsCardsGame = (variables: ClipsCardsGameVariables) => ({
  operationName: 'ClipsCards__Game' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'cc14976959c8f31c617e956a7c4c32216c3e04f6b586088b7bf49561c35e841b',
    },
  },
});
