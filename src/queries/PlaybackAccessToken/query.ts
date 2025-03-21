import type { PlaybackAccessTokenVariables } from '../types.generated.ts';

export const getQueryPlaybackAccessToken = (
  variables: PlaybackAccessTokenVariables,
) => ({
  operationName: 'PlaybackAccessToken' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'ed230aa1e33e07eebb8928504583da78a5173989fadfb1ac94be06a04f3cdbe9',
    },
  },
});
