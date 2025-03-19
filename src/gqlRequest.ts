import type { QueryResponseMap } from './queries/types.generated.ts';

const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';
export const MAX_QUERIES_PER_REQUEST = 35;

export const gqlRequest = async <
  TQuery extends readonly (
    | { operationName: keyof QueryResponseMap }
    | { __response: unknown }
  )[],
>(
  queries: [...TQuery],
  requestInit?: RequestInit,
): Promise<{
  [TIndex in keyof TQuery]: TQuery[TIndex] extends {
    operationName: infer TOperationName;
  }
    ? TOperationName extends keyof QueryResponseMap
      ? QueryResponseMap[TOperationName]
      : never
    : TQuery[TIndex] extends { __response: infer TRawQueryResponse }
      ? TRawQueryResponse
      : never;
}> => {
  if (queries.length === 0) return [] as any;
  if (queries.length > MAX_QUERIES_PER_REQUEST) {
    throw new Error(`Too many queries. Max: ${MAX_QUERIES_PER_REQUEST}`);
  }
  const res = await fetch('https://gql.twitch.tv/gql', {
    method: 'POST',
    body: JSON.stringify(queries),
    headers: {
      'Client-Id': CLIENT_ID,
      ...requestInit?.headers,
    },
    ...requestInit,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};
