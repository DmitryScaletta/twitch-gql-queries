import type { ClipsActionButtonsVariables } from '../types.generated.ts';

export const getQueryClipsActionButtons = (
  variables: ClipsActionButtonsVariables,
) => ({
  operationName: 'ClipsActionButtons' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'c10c0319f1b62107ffaf542f36d82c58db3cdf7451379910fe27c45bac889ab4',
    },
  },
});
