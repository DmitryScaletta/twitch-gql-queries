import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryUseLive } from './query.ts';
import { ResponseSchema } from './schema.ts';

import resOnline from './mocks/response-online.json' with { type: 'json' };
import resOffline from './mocks/response-offline.json' with { type: 'json' };

describe('UseLive', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) => getQueryUseLive({ channelLogin: login })),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryUseLive({ channelLogin: 'not-exists' }),
    ]);
    validate(queryResponse);
  });

  test('mock: online', () => validate(resOnline));
  test('mock: offline', () => validate(resOffline));
});
