import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getClips } from '../../testHelpers.ts';
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
    const clips = await getClips();
    const responses = await gqlRequest(
      clips.map(({ slug }) => getQueryShareClipRenderStatus({ slug })),
    );
    responses.map(validate);
  });

  test('real request: no broadcaster', async () => {
    const responses = await gqlRequest([
      getQueryShareClipRenderStatus({ slug: 'ShakingBlitheOwlBrokeBack' }),
    ]);
    responses.map(validate);
  });

  test('real request: no game', async () => {
    const responses = await gqlRequest([
      getQueryShareClipRenderStatus({
        slug: 'AstuteEncouragingCroquetteJebaited',
      }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryShareClipRenderStatus({
        slug: 'not-exists',
      }),
    ]);
    responses.map(validate);
  });

  test('mocks: clip from highlight', () => validate(resClipFromHighlight));
});
