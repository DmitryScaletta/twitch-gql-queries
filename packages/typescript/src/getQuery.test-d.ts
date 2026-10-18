import type { UseLiveResponse } from "./generated/types.generated.ts";
import { getQuery } from "./getQuery.ts";
import { gqlRequest } from "./gqlRequest.ts";

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Assert<T extends true> = T;

// an operation with variables asks for them
{
  const query = getQuery("UseLive", { channelLogin: "xqc" });
  const [response] = await gqlRequest([query]);
  type Test = Assert<Equal<typeof response, UseLiveResponse>>;
  type Name = Assert<Equal<typeof query.operationName, "UseLive">>;
}

// @ts-expect-error a required variable is asked for
getQuery("UseLive", {});

// an operation without variables is called with only its name
{
  const query = getQuery("GlobalBadges");
  type Test = Assert<Equal<typeof query.variables, Record<string, never>>>;
}

// @ts-expect-error no such operation
getQuery("QueryNotExists");
