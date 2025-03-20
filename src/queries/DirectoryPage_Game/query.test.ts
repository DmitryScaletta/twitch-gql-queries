import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getCategories } from '../../testHelpers.ts';
import { getQueryDirectoryPageGame } from './query.ts';
import { GameSchema, ResponseSchema, StreamSchema } from './schema.ts';

import resNoStreams from './mocks/response-no-streams.json' with { type: 'json' };

describe('DirectoryPage_Game', () => {
  const validate = createValidate(ResponseSchema, [GameSchema, StreamSchema]);

  test('real request: all variables', async () => {
    const categories = await getCategories();
    const responses = await gqlRequest(
      categories.map(({ slug }) =>
        getQueryDirectoryPageGame({
          imageWidth: 50,
          slug,
          options: {
            sort: 'RELEVANCE',
            recommendationsContext: {
              platform: 'web',
            },
            freeformTags: null,
            tags: [],
            broadcasterLanguages: [],
            systemFilters: [],
          },
          sortTypeIsRecency: false,
          limit: 30,
          includeIsDJ: true,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: only required variables', async () => {
    const categories = await getCategories();
    const responses = await gqlRequest(
      categories.map(({ slug }) =>
        getQueryDirectoryPageGame({
          slug,
          options: { sort: 'VIEWER_COUNT' },
          sortTypeIsRecency: false,
          limit: 30,
          includeIsDJ: true,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: broadcasterLanguages', async () => {
    const responses = await gqlRequest([
      getQueryDirectoryPageGame({
        slug: 'dota-2',
        options: { sort: 'VIEWER_COUNT', broadcasterLanguages: ['DE'] },
        sortTypeIsRecency: false,
        limit: 30,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: freeformTags', async () => {
    const responses = await gqlRequest([
      getQueryDirectoryPageGame({
        slug: 'grand-theft-auto-v',
        options: { sort: 'VIEWER_COUNT', freeformTags: ['GTARP'] },
        sortTypeIsRecency: false,
        limit: 30,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryDirectoryPageGame({
        slug: '-category-not-exists-',
        options: { sort: 'VIEWER_COUNT' },
        sortTypeIsRecency: false,
        limit: 30,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('mocks: no streams', () => validate(resNoStreams));
});
