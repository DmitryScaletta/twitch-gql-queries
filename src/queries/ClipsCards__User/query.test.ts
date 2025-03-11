import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { createValidate } from '../testHelpers.ts';
import {
  ClipsCardsClipSchema,
  ClipsCardsFilterSchema,
} from '../ClipsCards.schema.ts';
import { getQueryClipsCardsUser } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('ClipsCards__User', () => {
  const validate = createValidate(ResponseSchema, [
    ClipsCardsClipSchema,
    ClipsCardsFilterSchema,
  ]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsUser({
        login: 'xqc',
        limit: 30,
      }),
    ]);
    validate(queryResponse);
  });
});
