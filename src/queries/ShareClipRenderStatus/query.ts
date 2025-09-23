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
        'e0a46b287d760c6890a39d1ccd736af5ec9479a267d02c710e9ac33326b651d2',
    },
  },
});
