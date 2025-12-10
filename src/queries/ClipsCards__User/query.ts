import type { ClipsCardsUserVariables } from '../types.generated.ts';

export const getQueryClipsCardsUser = (variables: ClipsCardsUserVariables) => ({
  operationName: 'ClipsCards__User' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '1cd671bfa12cec480499c087319f26d21925e9695d1f80225aae6a4354f23088',
    },
  },
});
