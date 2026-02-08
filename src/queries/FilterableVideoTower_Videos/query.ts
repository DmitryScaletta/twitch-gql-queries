import type { FilterableVideoTowerVideosVariables } from '../types.generated.ts';

export const getQueryFilterableVideoTowerVideos = (
  variables: FilterableVideoTowerVideosVariables,
) => ({
  operationName: 'FilterableVideoTower_Videos' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '67004f7881e65c297936f32c75246470629557a393788fb5a69d6d9a25a8fd5f',
    },
  },
});
