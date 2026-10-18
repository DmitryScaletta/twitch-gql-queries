import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getClips } from '../../testHelpers.ts';
import { getQueryWatchLivePrompt } from './query.ts';
import { ResponseSchema } from './schema.ts';

import resStreamOnline from './mocks/1-stream-online.json' with { type: 'json' };
import resStreamOffline from './mocks/2-stream-offline.json' with { type: 'json' };

describe('WatchLivePrompt', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const clips = await getClips();
    const responses = await gqlRequest(
      clips.map(({ slug }) => getQueryWatchLivePrompt({ slug })),
    );
    responses.map(validate);
  });

  test('real request: no broadcaster', async () => {
    const responses = await gqlRequest([
      getQueryWatchLivePrompt({ slug: 'ShakingBlitheOwlBrokeBack' }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryWatchLivePrompt({ slug: 'not-exists' }),
    ]);
    responses.map(validate);
  });

  test('mock: stream online', () => validate(resStreamOnline));
  test('mock: stream offline', () => validate(resStreamOffline));
});
