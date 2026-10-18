import type { ShareClipRenderStatusVariables } from '../types.generated.ts';

export const getQueryShareClipRenderStatus = (
  variables: ShareClipRenderStatusVariables,
) => ({
  operationName: 'ShareClipRenderStatus' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '324783ea014524fa10a88739aa507de7a52f9624574dba9739a52b8c97d885cf',
    },
  },
});
