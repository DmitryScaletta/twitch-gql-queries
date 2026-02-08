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
        '0a02bb974443b576f5579aab0fef1d4b7f44e58a8a256f0c5adfead0db70640f',
    },
  },
});
