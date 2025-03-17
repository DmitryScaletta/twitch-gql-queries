import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../testHelpers.ts';
import { getQueryShareClipRenderStatus } from './query.ts';
import {
  BroadcasterSchema,
  ClipAssetSchema,
  ClipSchema,
  ResponseSchema,
} from './schema.ts';

import resClipFromHighlight from './mocks/response-clip-from-highlight.json' with { type: 'json' };

describe('ShareClipRenderStatus', () => {
  const validate = createValidate(ResponseSchema, [
    BroadcasterSchema,
    ClipAssetSchema,
    ClipSchema,
  ]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryShareClipRenderStatus({
        slug: 'ManlyLittleHabaneroTwitchRaid-FIvuPaqPC4CHIif4',
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: no broadcaster', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryShareClipRenderStatus({ slug: 'ShakingBlitheOwlBrokeBack' }),
    ]);
    validate(queryResponse);
  });

  test('real request: no game', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryShareClipRenderStatus({
        slug: 'AstuteEncouragingCroquetteJebaited',
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryShareClipRenderStatus({
        slug: 'not-exists',
      }),
    ]);
    validate(queryResponse);
  });

  test('mocks: clip from highlight', () => validate(resClipFromHighlight));
});
