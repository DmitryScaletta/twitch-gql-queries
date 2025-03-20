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
        'eea6c7a6baaa6ee60825f469c943cfda7e7c2415c01c64d7fd1407d172e82a7b',
    },
  },
});
