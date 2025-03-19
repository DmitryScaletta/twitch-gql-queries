import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryGlobalBadges } from './query.ts';
import { BadgeSchema, ResponseSchema } from './schema.ts';

describe('GlobalBadges', () => {
  const validate = createValidate(ResponseSchema, [BadgeSchema]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([getQueryGlobalBadges()]);
    validate(queryResponse);
  });
});
