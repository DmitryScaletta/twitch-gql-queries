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
    const [queryResponse] = await gqlRequest([
      getQueryClipsDownloadButton({
        slug: 'ShakingBlitheOwlBrokeBack',
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: no game', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsDownloadButton({
        slug: 'AstuteEncouragingCroquetteJebaited',
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsDownloadButton({
        slug: 'hello-world',
      }),
    ]);
    validate(queryResponse);
  });
});
