import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getClips } from '../../testHelpers.ts';
import { getQueryClipsActionButtons } from './query.ts';
import { ClipSchema, ResponseSchema } from './schema.ts';

describe('ClipsActionButtons', () => {
  const validate = createValidate(ResponseSchema, [ClipSchema]);

  test('real request', async () => {
    const clips = await getClips();
    const responses = await gqlRequest(
      clips.map(({ slug }) => getQueryClipsActionButtons({ slug })),
    );
    responses.map(validate);
  });

  test('real request: no broadcaster', async () => {
    const responses = await gqlRequest([
      getQueryClipsActionButtons({
        slug: 'ShakingBlitheOwlBrokeBack',
      }),
    ]);
    responses.map(validate);
  });

  test('real request: no game', async () => {
    const responses = await gqlRequest([
      getQueryClipsActionButtons({
        slug: 'AstuteEncouragingCroquetteJebaited',
      }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryClipsActionButtons({
        slug: 'hello-world',
      }),
    ]);
    responses.map(validate);
  });
});
