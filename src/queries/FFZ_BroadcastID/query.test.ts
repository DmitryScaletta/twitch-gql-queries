import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryFfzBroadcastId } from './query.ts';
import { ResponseSchema, UserSchema } from './schema.ts';

import resOnlineVideo from './mocks/response-online-video.json' with { type: 'json' };
import resOnlineNoVideo from './mocks/response-online-no-video.json' with { type: 'json' };
import resOffline from './mocks/response-offline.json' with { type: 'json' };

describe('FFZ_BroadcastID', () => {
  const validate = createValidate(ResponseSchema, [UserSchema]);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ id }) => getQueryFfzBroadcastId({ id })),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryFfzBroadcastId({ id: '9999999999999' }),
    ]);
    validate(queryResponse);
  });

  test('mock: online with video', () => validate(resOnlineVideo));
  test('mock: online without video', () => validate(resOnlineNoVideo));
  test('mock: offline', () => validate(resOffline));
});
