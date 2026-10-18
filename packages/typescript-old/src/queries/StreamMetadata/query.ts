import type { StreamMetadataVariables } from '../types.generated.ts';

export const getQueryStreamMetadata = (variables: StreamMetadataVariables) => ({
  operationName: 'StreamMetadata' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'b57f9b910f8cd1a4659d894fe7550ccc81ec9052c01e438b290fd66a040b9b93',
    },
  },
});
