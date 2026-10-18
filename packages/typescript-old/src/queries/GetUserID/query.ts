import type { GetUserIdVariables } from '../types.generated.ts';

export const getQueryGetUserId = (variables: GetUserIdVariables) => ({
  operationName: 'GetUserID' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'bf6c594605caa0c63522f690156aa04bd434870bf963deb76668c381d16fcaa5',
    },
  },
});
