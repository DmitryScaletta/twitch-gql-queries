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

  test('real request: 1440p', async () => {
    const responses = await gqlRequest([
      getQueryShareClipRenderStatus({
        slug: 'TenaciousOriginalMooseNononoCat-AEuwlukHCpsIR0wn',
      }),
    ]);
    responses.map(validate);
  });

  test('real request: HEVC', async () => {
    const responses = await gqlRequest([
      getQueryShareClipRenderStatus({
        slug: 'DeliciousCarelessCrowLitty-ccS0mlymOKwRZBjV',
      }),
    ]);
    responses.map(validate);
  });
});
