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
        'acea7539a293dfd30f0b0b81a263134bb5d9a7175592e14ac3f7c77b192de416',
    },
  },
});
