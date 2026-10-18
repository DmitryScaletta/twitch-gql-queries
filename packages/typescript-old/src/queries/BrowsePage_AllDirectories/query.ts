import type { BrowsePageAllDirectoriesVariables } from '../types.generated.ts';

export const getQueryBowsePageAllDirectories = (
  variables: BrowsePageAllDirectoriesVariables,
) => ({
  operationName: 'BrowsePage_AllDirectories' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '2f67f71ba89f3c0ed26a141ec00da1defecb2303595f5cda4298169549783d9e',
    },
  },
});
