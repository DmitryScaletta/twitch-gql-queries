import type { UseViewCountVariables } from '../types.generated.ts';

export const getQueryUseViewCount = (variables: UseViewCountVariables) => ({
  operationName: 'UseViewCount' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '00b11c9c428f79ae228f30080a06ffd8226a1f068d6f52fbc057cbde66e994c2',
    },
  },
});
