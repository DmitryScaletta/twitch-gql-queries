import type { ClipsDownloadButtonVariables } from '../types.generated.ts';

export const getQueryClipsDownloadButton = (
  variables: ClipsDownloadButtonVariables,
) => ({
  operationName: 'ClipsDownloadButton' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '9c0a5b51612a41b06bfb93065deb6fd7bb7e011db2beb6e5e5d7588ae7f3ff4b',
    },
  },
});
