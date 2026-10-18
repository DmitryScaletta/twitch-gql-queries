import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryFfzRecentBroadcasts } from './query.ts';
import { ResponseSchema, UserSchema, VideoSchema } from './schema.ts';

describe('FFZ_RecentBroadcasts', () => {
  const validate = createValidate(ResponseSchema, [UserSchema, VideoSchema]);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ id }) =>
        getQueryFfzRecentBroadcasts({ id, sort: 'TIME', limit: 1 }),
      ),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryFfzRecentBroadcasts({
        id: '9999999999999',
        sort: 'TIME',
        limit: 1,
      }),
    ]);
    responses.map(validate);
  });
});
