import type { VideoAccessTokenClipVariables } from '../types.generated.ts';

export const getQueryVideoAccessTokenClip = (
  variables: VideoAccessTokenClipVariables,
) => ({
  operationName: 'VideoAccessToken_Clip' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11',
    },
  },
});
