import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { getQueryChannelShell } from './query.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import {
  ResponseSchema,
  UserDoesNotExistSchema,
  UserSchema,
} from './schema.ts';

import resOnline from './mocks/1-online.json' with { type: 'json' };
import resOffline from './mocks/2-offline.json' with { type: 'json' };
import resNotFound from './mocks/3-not-found.json' with { type: 'json' };
import resWithTrailer from './mocks/4-with-trailer.json' with { type: 'json' };
import resBannedDmca from './mocks/5-banned-dmca.json' with { type: 'json' };
import resBannedTosTemporary from './mocks/6-banned-tos-temporary.json' with { type: 'json' };
import resBannedTosIndefinite from './mocks/7-banned-tos-indefinite.json' with { type: 'json' };

describe('ChannelShell', () => {
  const validate = createValidate(ResponseSchema, [
    UserSchema,
    UserDoesNotExistSchema,
  ]);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) => getQueryChannelShell({ login })),
    );
    responses.map(validate);
  });
  test('mock: online', () => validate(resOnline));
  test('mock: offline', () => validate(resOffline));
  test('mock: not found', () => validate(resNotFound));
  test('mock: with trailer', () => validate(resWithTrailer));
  test('mock: banned dmca', () => validate(resBannedDmca));
  test('mock: banned tos temporary', () => validate(resBannedTosTemporary));
  test('mock: banned tos indefinite', () => validate(resBannedTosIndefinite));
});
