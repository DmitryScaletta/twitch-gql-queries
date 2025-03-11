import type { Query, QueryMapping } from './types.ts';

const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';
const MAX_QUERIES = 35;

export const gqlRequest = async <const T extends Query[]>(
  queries: T,
  requestInit?: RequestInit,
): Promise<QueryMapping<T>> => {
  if (queries.length > MAX_QUERIES) {
    throw new Error(`Too many queries. Max: ${MAX_QUERIES}`);
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
  if (!res.ok) throw new Error();
  return res.json();
};
