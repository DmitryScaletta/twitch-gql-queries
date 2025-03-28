import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryBowsePageAllDirectories } from './query.ts';
import { GameSchema, ResponseSchema } from './schema.ts';

import resMusicBadDate from './mocks/3-music-bad-release-date.json' with { type: 'json' };

describe('BrowsePage_AllDirectories', () => {
  const validate = createValidate(ResponseSchema, [GameSchema]);

  test('real request: only required variables', async () => {
    const responses = await gqlRequest([
      getQueryBowsePageAllDirectories({
        limit: 100,
        options: { sort: 'VIEWER_COUNT' },
      }),
    ]);
    responses.map(validate);
  });

  test('real request: all variables', async () => {
    const responses = await gqlRequest([
      getQueryBowsePageAllDirectories({
        cursor: null,
        limit: 20,
        options: {
          recommendationsContext: {
            platform: 'web',
          },
          sort: 'RELEVANCE',
          tags: ['4d1eaa36-f750-4862-b7e9-d0a13970d535'],
        },
      }),
    ]);
    responses.map(validate);
  });

  test('real request: integrity error', async () => {
    const responses = await gqlRequest([
      getQueryBowsePageAllDirectories({
        cursor: 'eyJzIjoxMDAsImQiOmZhbHNlLCJ0Ijp0cnVlfQ==',
        limit: 20,
        options: { sort: 'RELEVANCE' },
      }),
    ]);
    responses.map(validate);
  });

  test('mock', () => validate(resMusicBadDate));
});
