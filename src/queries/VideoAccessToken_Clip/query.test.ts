import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getClips } from '../../testHelpers.ts';
import { ClipAssetSchema } from '../ShareClipRenderStatus/schema.ts';
import { getQueryVideoAccessTokenClip } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('VideoAccessToken_Clip', () => {
  const validate = createValidate(ResponseSchema, [ClipAssetSchema]);

  test('real request', async () => {
    const clips = await getClips();
    const responses = await gqlRequest(
      clips.map(({ slug }) =>
        getQueryVideoAccessTokenClip({ platform: 'web', slug }),
      ),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryVideoAccessTokenClip({ platform: 'web', slug: 'hello-world' }),
    ]);
    responses.map(validate);
  });
});
