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
        'f130048a462a0ac86bb54d653c968c514e9ab9ca94db52368c1179e97b0f16eb',
    },
  },
});
