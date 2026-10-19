import type { QueryResponse } from "./types.ts";
import { gqlRequest } from "./gqlRequest.ts";
import { getRawQuery } from "./getRawQuery.ts";
import type { UseLiveResponse, UseViewCountResponse } from "./generated/types.generated.ts";
import { UseLiveQuery, UseViewCountQuery } from "./generated/operations.generated.ts";
import { getQuery } from "./getQuery.ts";

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Assert<T extends true> = T;

// tuple
{
  const [useLiveRes, useViewCountRes] = await gqlRequest([
    getQuery(UseLiveQuery, { channelLogin: "xqc" }),
    getQuery(UseViewCountQuery, { channelLogin: "xqc" }),
  ]);

  type Test1 = Assert<Equal<typeof useLiveRes, UseLiveResponse>>;
  type Test2 = Assert<Equal<typeof useViewCountRes, UseViewCountResponse>>;
}

// array
{
  const queries = [].map(() => getQuery(UseLiveQuery, { channelLogin: "xqc" }));
  const response = await gqlRequest(queries);

  type Test = Assert<Equal<typeof response, UseLiveResponse[]>>;
}

// query not exists
{
  // @ts-expect-error
  gqlRequest([{ operationName: "QueryNotExists" }]);
}

const query = "";
type MyRawQueryData = { foo: "bar" };

// raw query
{
  const [getVideoRes] = await gqlRequest([getRawQuery<MyRawQueryData>({ query })]);

  type Test = Assert<Equal<typeof getVideoRes, QueryResponse<MyRawQueryData>>>;
}

// raw query mixed
{
  const [useLiveRes, getVideoRes] = await gqlRequest([
    getQuery(UseLiveQuery, { channelLogin: "xqc" }),
    getRawQuery<MyRawQueryData>({ query }),
  ]);

  type Test1 = Assert<Equal<typeof useLiveRes, UseLiveResponse>>;
  type Test2 = Assert<Equal<typeof getVideoRes, QueryResponse<MyRawQueryData>>>;
}

// raw query array
{
  const response = await gqlRequest([].map(() => getRawQuery<MyRawQueryData>({ query })));

  type Test = Assert<Equal<typeof response, QueryResponse<MyRawQueryData>[]>>;
}
