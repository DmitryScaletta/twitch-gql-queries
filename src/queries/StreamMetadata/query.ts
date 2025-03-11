import type { StreamMetadataVariables } from '../types.generated.ts';

export const getQueryStreamMetadata = (variables: StreamMetadataVariables) => ({
  operationName: 'StreamMetadata' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '252a46e3f5b1ddc431b396e688331d8d020daec27079893ac7d4e6db759a7402',
    },
  },
});
