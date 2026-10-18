import type { GetPinnedChatVariables } from '../types.generated.ts';

export const getQueryGetPinnedChat = (variables: GetPinnedChatVariables) => ({
  operationName: 'GetPinnedChat' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '2d099d4c9b6af80a07d8440140c4f3dbb04d516b35c401aab7ce8f60765308d5',
    },
  },
});
