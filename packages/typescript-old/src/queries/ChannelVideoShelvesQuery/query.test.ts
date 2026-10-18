import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryChannelVideoShelvesQuery } from './query.ts';
import {
  ClipSchema,
  ResponseSchema,
  VideoSchema,
  VideoShelfSchema,
} from './schema.ts';

describe('ChannelVideoShelvesQuery', () => {
  const validate = createValidate(ResponseSchema, [
    VideoShelfSchema,
    ClipSchema,
    VideoSchema,
  ]);

  test('real request: all variables', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryChannelVideoShelvesQuery({
          includePreviewBlur: false,
          channelLogin: login,
          first: 20,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: only required variables', async () => {
    const channels = await getChannels('dota-2');
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryChannelVideoShelvesQuery({
          channelLogin: login,
          first: 20,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: includePreviewBlur true', async () => {
    const channels = await getChannels('counter-strike');
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryChannelVideoShelvesQuery({
          includePreviewBlur: true,
          channelLogin: login,
          first: 20,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryChannelVideoShelvesQuery({
        includePreviewBlur: true,
        channelLogin: '-channel-not-exists-',
        first: 20,
      }),
    ]);
    responses.map(validate);
  });
});
