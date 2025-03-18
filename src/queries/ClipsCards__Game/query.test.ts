import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import { ClipsCardsFilterSchema } from '../ClipsCards.schema.ts';
import { getQueryClipsCardsGame } from './query.ts';
import { ClipSchema, ResponseSchema } from './schema.ts';

describe('ClipsCards__Game', () => {
  const validate = createValidate(ResponseSchema, [
    ClipSchema,
    ClipsCardsFilterSchema,
  ]);

  test('real request: all variables', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: 'just-chatting',
        limit: 20,
        criteria: {
          languages: ['EN'],
          filter: 'LAST_WEEK',
          shouldFilterByDiscoverySetting: true,
        },
        cursor: null,
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: only required variables', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: 'just-chatting',
        limit: 20,
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: '-category-not-exists-',
        limit: 20,
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: integrity error', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: 'just-chatting',
        limit: 20,
        cursor: 'MjA=',
      }),
    ]);
    validate(queryResponse);
  });
});
