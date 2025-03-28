import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getClips } from '../../testHelpers.ts';
import { getQueryVideoAccessTokenClip } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('VideoAccessToken_Clip', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const clips = await getClips();
    const responses = await gqlRequest(
      clips.map(({ slug }) => getQueryVideoAccessTokenClip({ slug })),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryVideoAccessTokenClip({ slug: 'hello-world' }),
    ]);
    responses.map(validate);
  });
});
