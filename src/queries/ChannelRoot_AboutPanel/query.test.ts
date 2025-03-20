import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryChannelRootAboutPanel } from './query.ts';
import { ResponseSchema, UserSchema } from './schema.ts';

import resWithSchedule from './mocks/response-with-schedule.json' with { type: 'json' };
import resIntegrityChallenge from './mocks/response-integrity-challenge.json' with { type: 'json' };

describe('ChannelRoot_AboutPanel', () => {
  const validate = createValidate(ResponseSchema, [UserSchema]);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map((channel) =>
        getQueryChannelRootAboutPanel({
          channelLogin: channel.login,
          skipSchedule: false,
          includeIsDJ: true,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: skipSchedule true', async () => {
    const responses = await gqlRequest([
      getQueryChannelRootAboutPanel({
        channelLogin: 'xqc',
        skipSchedule: true,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: includeIsDJ false', async () => {
    const responses = await gqlRequest([
      getQueryChannelRootAboutPanel({
        channelLogin: 'xqc',
        skipSchedule: false,
        includeIsDJ: false,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryChannelRootAboutPanel({
        channelLogin: 'user-not-exists',
        skipSchedule: false,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: never streamed', async () => {
    const responses = await gqlRequest([
      getQueryChannelRootAboutPanel({
        channelLogin: 'tio777',
        skipSchedule: false,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('mock: with schedule', () => validate(resWithSchedule));
  test('mock: integrity challenge', () => validate(resIntegrityChallenge));
});
