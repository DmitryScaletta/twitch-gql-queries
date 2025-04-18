import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getCategories } from '../../testHelpers.ts';
import { getQueryClipsCardsGame } from './query.ts';
import { ClipSchema, ResponseSchema } from './schema.ts';

describe('ClipsCards__Game', () => {
  const validate = createValidate(ResponseSchema, [ClipSchema]);

  test('real request: all variables', async () => {
    const categories = await getCategories();
    const responses = await gqlRequest(
      categories.map(({ slug }) =>
        getQueryClipsCardsGame({
          categorySlug: slug,
          limit: 20,
          criteria: {
            languages: ['EN'],
            filter: 'LAST_WEEK',
            shouldFilterByDiscoverySetting: true,
          },
          cursor: null,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: only required variables', async () => {
    const categories = await getCategories();
    const responses = await gqlRequest(
      categories.map(({ slug }) =>
        getQueryClipsCardsGame({
          categorySlug: slug,
          limit: 20,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: '-category-not-exists-',
        limit: 20,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: integrity error', async () => {
    const responses = await gqlRequest([
      getQueryClipsCardsGame({
        categorySlug: 'just-chatting',
        limit: 20,
        cursor: 'MjA=',
      }),
    ]);
    responses.map(validate);
  });
});
