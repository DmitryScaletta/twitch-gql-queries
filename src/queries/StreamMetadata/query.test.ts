import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryStreamMetadata } from './query.ts';
import { ResponseSchema, UserSchema } from './schema.ts';

import resOnline from './mocks/response-online.json' with { type: 'json' };
import resOffline from './mocks/response-offline.json' with { type: 'json' };

describe('StreamMetadata', () => {
  const validate = createValidate(ResponseSchema, [UserSchema]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryStreamMetadata({ channelLogin: 'xqc' }),
    ]);
    validate(queryResponse);
  });

  test('real request: never streamed', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryStreamMetadata({ channelLogin: 'xqcbot' }),
    ]);
    validate(queryResponse);
  });

  test('mock: online', () => validate(resOnline));
  test('mock: offline', () => validate(resOffline));
});
