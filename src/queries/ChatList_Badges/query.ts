import type { ChatListBadgesVariables } from '../types.generated.ts';

export const getQueryChatListBadges = (variables: ChatListBadgesVariables) => ({
  operationName: 'ChatList_Badges' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '838a7e0b47c09cac05f93ff081a9ff4f876b68f7624f0fc465fe30031e372fc2',
    },
  },
});
