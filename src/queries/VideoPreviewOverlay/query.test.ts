import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryVideoPreviewOverlay } from './query.ts';
import { ResponseSchema } from './schema.ts';

import resOnline from './mocks/1-online.json' with { type: 'json' };
import resOffline from './mocks/2-offline.json' with { type: 'json' };

describe('VideoPreviewOverlay', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) => getQueryVideoPreviewOverlay({ login })),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryVideoPreviewOverlay({ login: 'user-not-exists' }),
    ]);
    responses.map(validate);
  });

  test('mocks: online', () => validate(resOnline));
  test('mocks: offline', () => validate(resOffline));
});
