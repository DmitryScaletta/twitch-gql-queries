import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import { ClipsCardsClip, ClipsCardsFilter } from '../ClipsCards.schema.ts';
import { getQueryClipsCardsGame } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('ClipsCards__Game', () => {
  const validate = createValidate(ResponseSchema, [
    ClipsCardsClip,
    ClipsCardsFilter,
  ]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: 'just-chatting',
        limit: 30,
      }),
    ]);
    validate(queryResponse);
  });
});
