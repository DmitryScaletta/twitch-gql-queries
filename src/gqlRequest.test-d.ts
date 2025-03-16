import { gqlRequest } from './gqlRequest.ts';
import type {
  UseLiveResponse,
  UseViewCountResponse,
} from './queries/types.generated.ts';
import { getQueryUseLive } from './queries/UseLive/query.ts';
import { getQueryUseViewCount } from './queries/UseViewCount/query.ts';

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;
type Assert<T extends true> = T;

// tuple
{
  const [useLiveRes, useViewCountRes] = await gqlRequest([
    getQueryUseLive({ channelLogin: 'xqc' }),
    getQueryUseViewCount({ channelLogin: 'xqc' }),
  ]);

  type Test1 = Assert<Equal<typeof useLiveRes, UseLiveResponse>>;
  type Test2 = Assert<Equal<typeof useViewCountRes, UseViewCountResponse>>;
}

// array
{
  const queries = [].map(() => getQueryUseLive({ channelLogin: 'xqc' }));
  const response = await gqlRequest(queries);

  type Test = Assert<Equal<typeof response, UseLiveResponse[]>>;
}

// query not exists
{
  // @ts-expect-error
  gqlRequest([{ operationName: 'QueryNotExists' }]);
}
