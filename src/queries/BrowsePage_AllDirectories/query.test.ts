import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import { getQueryBowsePageAllDirectories } from './query.ts';
import { GameSchema, ResponseSchema } from './schema.ts';

describe('BrowsePage_AllDirectories', () => {
  const validate = createValidate(ResponseSchema, [GameSchema]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryBowsePageAllDirectories({
        limit: 100,
        options: { sort: 'VIEWER_COUNT' },
      }),
    ]);
    validate(queryResponse);
  });
});
