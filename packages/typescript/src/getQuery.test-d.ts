import type { UseLiveResponse } from "./generated/types.generated.ts";
import { GlobalBadgesQuery, UseLiveQuery } from "./generated/operations.generated.ts";
import { getQuery } from "./getQuery.ts";
import { gqlRequest } from "./gqlRequest.ts";

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Assert<T extends true> = T;

// an operation with variables asks for them
{
  const query = getQuery(UseLiveQuery, { channelLogin: "xqc" });
  const [response] = await gqlRequest([query]);
  type Test = Assert<Equal<typeof response, UseLiveResponse>>;
  type Name = Assert<Equal<typeof query.operationName, "UseLive">>;
}

// @ts-expect-error a required variable is asked for
getQuery(UseLiveQuery, {});

// an operation without variables is called with only its descriptor
{
  const query = getQuery(GlobalBadgesQuery);
  type Test = Assert<Equal<typeof query.variables, Record<string, never>>>;
}

// @ts-expect-error no such operation
getQuery(["QueryNotExists", "0"]);
