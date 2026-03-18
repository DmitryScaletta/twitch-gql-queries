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
        '4f35f1ac933d76b1da008c806cd5546a7534dfaff83e033a422a81f24e5991b3',
    },
  },
});
