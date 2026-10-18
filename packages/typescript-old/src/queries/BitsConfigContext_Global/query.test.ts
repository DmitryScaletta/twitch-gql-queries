import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryBitsConfigContextGlobal } from './query.ts';
import {
  CheerConfigSchema,
  CheermoteSchema,
  ResponseSchema,
} from './schema.ts';

describe('BitsConfigContext_Global', () => {
  const validate = createValidate(ResponseSchema, [
    CheerConfigSchema,
    CheermoteSchema,
  ]);

  test('real request', async () => {
    const responses = await gqlRequest([getQueryBitsConfigContextGlobal()]);
    responses.map(validate);
  });
});
