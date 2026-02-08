import type { ChannelVideoShelvesQueryVariables } from '../types.generated.ts';

export const getQueryChannelVideoShelvesQuery = (
  variables: ChannelVideoShelvesQueryVariables,
) => ({
  operationName: 'ChannelVideoShelvesQuery' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '280f582866d0914749c1666da7adfcdb42739182b060ef4050641aa9324da19b',
    },
  },
});
