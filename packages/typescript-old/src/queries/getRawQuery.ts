import type { QueryResponse } from '../types.ts';

type RawQuery = {
  query: string;
  variables?: Record<string, any>;
};

export type GetRawQueryReturnType<T = unknown> = RawQuery & {
  /** Not actually exists. It needs only for types */
  __response: QueryResponse<T>;
};

export const getRawQuery = <TData = unknown>(query: RawQuery) =>
  query as GetRawQueryReturnType<TData>;
