import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryVideoAccessTokenClip } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('VideoAccessToken_Clip', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryVideoAccessTokenClip({ slug: 'DeliciousDelightfulPicklesWOOP' }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryVideoAccessTokenClip({ slug: 'hello-world' }),
    ]);
    validate(queryResponse);
  });
});
