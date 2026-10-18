import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getClips } from '../../testHelpers.ts';
import { getQueryClipsDownloadButton } from './query.ts';
import { ClipSchema, ResponseSchema } from './schema.ts';

describe('ClipsDownloadButton', () => {
  const validate = createValidate(ResponseSchema, [ClipSchema]);

  test('real request', async () => {
    const clips = await getClips();
    const responses = await gqlRequest(
      clips.map(({ slug }) => getQueryClipsDownloadButton({ slug })),
    );
    responses.map(validate);
  });

  test('real request: no broadcaster', async () => {
    const responses = await gqlRequest([
      getQueryClipsDownloadButton({
        slug: 'ShakingBlitheOwlBrokeBack',
      }),
    ]);
    responses.map(validate);
  });

  test('real request: no game', async () => {
    const responses = await gqlRequest([
      getQueryClipsDownloadButton({
        slug: 'AstuteEncouragingCroquetteJebaited',
      }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryClipsDownloadButton({
        slug: 'hello-world',
      }),
    ]);
    responses.map(validate);
  });
});
