import type { ChannelShellVariables } from '../types.generated.ts';

export const getQueryChannelShell = (variables: ChannelShellVariables) => ({
  operationName: 'ChannelShell' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '580ab410bcd0c1ad194224957ae2241e5d252b2c5173d8e0cce9d32d5bb14efe',
    },
  },
});
