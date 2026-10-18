import type { FfzRecentBroadcastsVariables } from '../types.generated.ts';

export const getQueryFfzRecentBroadcasts = (
  variables: FfzRecentBroadcastsVariables,
) => ({
  operationName: 'FFZ_RecentBroadcasts' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'a92c0ad34fdba9b3f5e6125dce4b0acc9373f2b2c06c74c92187749d12f73d4c',
    },
  },
});
