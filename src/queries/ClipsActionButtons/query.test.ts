import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import { getQueryClipsActionButtons } from './query.ts';
import { ClipSchema, ResponseSchema } from './schema.ts';

describe('ClipsActionButtons', () => {
  const validate = createValidate(ResponseSchema, [ClipSchema]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsActionButtons({
        slug: 'WrongSplendidWrenYouDontSay-0Pkulh5IfiMkLH_P',
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: no broadcaster', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsActionButtons({
        slug: 'ShakingBlitheOwlBrokeBack',
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: no game', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsActionButtons({
        slug: 'AstuteEncouragingCroquetteJebaited',
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsActionButtons({
        slug: 'hello-world',
      }),
    ]);
    validate(queryResponse);
  });
});
