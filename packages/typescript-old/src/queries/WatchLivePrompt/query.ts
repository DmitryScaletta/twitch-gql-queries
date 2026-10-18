import type { WatchLivePromptVariables } from '../types.generated.ts';

export const getQueryWatchLivePrompt = (
  variables: WatchLivePromptVariables,
) => ({
  operationName: 'WatchLivePrompt' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'dcf741d88e5066ac8c140f1247309c36ce459b9c15a1ef726634081733d7147d',
    },
  },
});
