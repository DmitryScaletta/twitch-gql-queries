import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryWatchLivePrompt } from './query.ts';
import { ResponseSchema } from './schema.ts';

import resStreamOnline from './mocks/response-stream-online.json' with { type: 'json' };
import resStreamOffline from './mocks/response-stream-offline.json' with { type: 'json' };

describe('WatchLivePrompt', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryWatchLivePrompt({ slug: 'DeliciousDelightfulPicklesWOOP' }),
    ]);
    validate(queryResponse);
  });

  test('real request: no broadcaster', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryWatchLivePrompt({ slug: 'ShakingBlitheOwlBrokeBack' }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryWatchLivePrompt({ slug: 'not-exists' }),
    ]);
    validate(queryResponse);
  });

  test('mock: stream online', () => validate(resStreamOnline));
  test('mock: stream offline', () => validate(resStreamOffline));
});
