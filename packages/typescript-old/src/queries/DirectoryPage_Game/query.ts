import type { DirectoryPageGameVariables } from '../types.generated.ts';

export const getQueryDirectoryPageGame = (
  variables: DirectoryPageGameVariables,
) => ({
  operationName: 'DirectoryPage_Game' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        'c7c9d5aad09155c4161d2382092dc44610367f3536aac39019ec2582ae5065f9',
    },
  },
});
