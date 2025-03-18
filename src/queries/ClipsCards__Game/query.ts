import type { ClipsCardsGameVariables } from '../types.generated.ts';

export const getQueryClipsCardsGame = (variables: ClipsCardsGameVariables) => ({
  operationName: 'ClipsCards__Game' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'ebcf54afb9aa5d6cec8aad2c35b84e2737a109dac5b184308aae73a27d176707',
    },
  },
});
