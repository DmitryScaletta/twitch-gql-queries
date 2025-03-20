import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryStreamMetadata } from './query.ts';
import { ResponseSchema, UserSchema } from './schema.ts';

import resOnline from './mocks/response-online.json' with { type: 'json' };
import resOffline from './mocks/response-offline.json' with { type: 'json' };

describe('StreamMetadata', () => {
  const validate = createValidate(ResponseSchema, [UserSchema]);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryStreamMetadata({ channelLogin: login }),
      ),
    );
    responses.map(validate);
  });

  test('real request: never streamed', async () => {
    const responses = await gqlRequest([
      getQueryStreamMetadata({ channelLogin: 'xqcbot' }),
    ]);
    responses.map(validate);
  });

  test('mock: online', () => validate(resOnline));
  test('mock: offline', () => validate(resOffline));
});
