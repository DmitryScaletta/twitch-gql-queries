import type { UseLiveVariables } from '../types.generated.ts';

export const getQueryUseLive = (variables: UseLiveVariables) => ({
  operationName: 'UseLive' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '639d5f11bfb8bf3053b424d9ef650d04c4ebb7d94711d644afb08fe9a0fad5d9',
    },
  },
});
