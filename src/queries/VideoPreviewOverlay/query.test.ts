import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../testHelpers.ts';
import { getQueryVideoPreviewOverlay } from './query.ts';
import { ResponseSchema } from './schema.ts';

import resOnline from './mocks/response-online.json' with { type: 'json' };
import resOffline from './mocks/response-offline.json' with { type: 'json' };

describe('VideoPreviewOverlay', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryVideoPreviewOverlay({ login: 'xqc' }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryVideoPreviewOverlay({ login: 'user-not-exists' }),
    ]);
    validate(queryResponse);
  });

  test('mocks: online', () => validate(resOnline));
  test('mocks: offline', () => validate(resOffline));
});
