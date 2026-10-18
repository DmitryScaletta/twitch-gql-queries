import type { VideoPreviewOverlayVariables } from '../types.generated.ts';

export const getQueryVideoPreviewOverlay = (
  variables: VideoPreviewOverlayVariables,
) => ({
  operationName: 'VideoPreviewOverlay' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '9515480dee68a77e667cb19de634739d33f243572b007e98e67184b1a5d8369f',
    },
  },
});
