import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryStreamMetadata } from './query.ts';
import { ResponseSchema, UserSchema } from './schema.ts';

import resOnline from './mocks/1-online.json' with { type: 'json' };
import resOffline from './mocks/2-offline.json' with { type: 'json' };
import resIncludeIsDjFalse from './mocks/3-include-is-dj-false.json' with { type: 'json' };

describe('StreamMetadata', () => {
  const validate = createValidate(ResponseSchema, [UserSchema]);

  test('real request: includeIsDj = true', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryStreamMetadata({ channelLogin: login, includeIsDJ: true }),
      ),
    );
    responses.map(validate);
  });

  test('real request: includeIsDj = false', async () => {
    const responses = await gqlRequest([
      getQueryStreamMetadata({ channelLogin: 'xqc', includeIsDJ: false }),
    ]);
    responses.map(validate);
  });

  test('real request: never streamed', async () => {
    const responses = await gqlRequest([
      getQueryStreamMetadata({ channelLogin: 'xqcbot', includeIsDJ: true }),
    ]);
    responses.map(validate);
  });

  test('mock: online', () => validate(resOnline));
  test('mock: offline', () => validate(resOffline));
  test('mock: includeIsDj = false', () => validate(resIncludeIsDjFalse));
});
