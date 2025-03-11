import { describe, test } from 'node:test';
import { gqlRequest } from '../../../index.ts';
import { getQueryChannelShell } from './query.ts';
import { createValidate } from '../testHelpers.ts';
import {
  ResponseSchema,
  UserDoesNotExistSchema,
  UserSchema,
} from './schema.ts';

import resOnline from './mocks/response-online.json' with { type: 'json' };
import resOffline from './mocks/response-offline.json' with { type: 'json' };
import resNotFound from './mocks/response-not-found.json' with { type: 'json' };
import resWithTrailer from './mocks/response-with-trailer.json' with { type: 'json' };
import resBannedDmca from './mocks/response-banned-dmca.json' with { type: 'json' };
import resBannedTosTemporary from './mocks/response-banned-tos-temporary.json' with { type: 'json' };
import resBannedTosIndefinite from './mocks/response-banned-tos-indefinite.json' with { type: 'json' };

describe('ChannelShell', () => {
  const validate = createValidate(ResponseSchema, [
    UserSchema,
    UserDoesNotExistSchema,
  ]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryChannelShell({ login: 'xqc' }),
    ]);
    validate(queryResponse);
  });
  test('mock: online', () => validate(resOnline));
  test('mock: offline', () => validate(resOffline));
  test('mock: not found', () => validate(resNotFound));
  test('mock: with trailer', () => validate(resWithTrailer));
  test('mock: banned dmca', () => validate(resBannedDmca));
  test('mock: banned tos temporary', () => validate(resBannedTosTemporary));
  test('mock: banned tos indefinite', () => validate(resBannedTosIndefinite));
});
