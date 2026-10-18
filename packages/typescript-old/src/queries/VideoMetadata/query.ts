import type { VideoMetadataVariables } from '../types.generated.ts';

export const getQueryVideoMetadata = (variables: VideoMetadataVariables) => ({
  operationName: 'VideoMetadata' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '45111672eea2e507f8ba44d101a61862f9c56b11dee09a15634cb75cb9b9084d',
    },
  },
});
