import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import { getQueryBowsePageAllDirectories } from './query.ts';
import { GameSchema, ResponseSchema } from './schema.ts';

describe('BrowsePage_AllDirectories', () => {
  const validate = createValidate(ResponseSchema, [GameSchema]);

  test('real request: only required variables', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryBowsePageAllDirectories({
        limit: 20,
        options: { sort: 'VIEWER_COUNT' },
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: all variables', async () => {
    const [queryResponse] = await gqlRequest([
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
    validate(queryResponse);
  });

  test('real request: integrity error', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryBowsePageAllDirectories({
        cursor: 'eyJzIjoxMDAsImQiOmZhbHNlLCJ0Ijp0cnVlfQ==',
        limit: 20,
        options: { sort: 'RELEVANCE' },
      }),
    ]);
    validate(queryResponse);
  });
});
