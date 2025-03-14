import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import { getQueryUseViewCount } from './query.ts';
import { ResponseSchema } from './schema.ts';

import resOnline from './mocks/response-online.json' with { type: 'json' };
import resOffline from './mocks/response-offline.json' with { type: 'json' };

describe('UseViewCount', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryUseViewCount({ channelLogin: 'xqc' }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryUseViewCount({ channelLogin: 'not-exists' }),
    ]);
    validate(queryResponse);
  });

  test('mock: online', () => validate(resOnline));
  test('mock: offline', () => validate(resOffline));
});
