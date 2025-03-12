import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import {
  ClipsCardsClipSchema,
  ClipsCardsFilterSchema,
} from '../ClipsCards.schema.ts';
import { getQueryClipsCardsGame } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('ClipsCards__Game', () => {
  const validate = createValidate(ResponseSchema, [
    ClipsCardsClipSchema,
    ClipsCardsFilterSchema,
  ]);

  test('real request: only required variables', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: 'just-chatting',
        limit: 20,
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: all variables', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: 'just-chatting',
        limit: 20,
        criteria: {
          languages: ['EN'],
          filter: 'LAST_WEEK',
          isFeatured: true,
        },
        cursor: null,
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
