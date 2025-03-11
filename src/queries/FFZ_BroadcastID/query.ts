import type { FfzBroadcastIdVariables } from '../types.generated.ts';

export const getQueryFfzBroadcastId = (variables: FfzBroadcastIdVariables) => ({
  operationName: 'FFZ_BroadcastID' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'cc89dfe8fcfe71235313b05b34799eaa519d162ebf85faf0c51d17c274614f0f',
    },
  },
});
