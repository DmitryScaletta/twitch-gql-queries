import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryFilterableVideoTowerVideos } from './query.ts';
import { ResponseSchema, VideoSchema } from './schema.ts';

describe('FilterableVideoTower_Videos', () => {
  const validate = createValidate(ResponseSchema, [VideoSchema]);

  test('real request: only required variables', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryFilterableVideoTowerVideos({
          limit: 30,
          channelOwnerLogin: login,
          videoSort: 'TIME',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: includePreviewBlur true', async () => {
    const channels = await getChannels('dota-2');
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryFilterableVideoTowerVideos({
          includePreviewBlur: true,
          limit: 30,
          channelOwnerLogin: login,
          videoSort: 'VIEWS',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: broadcastType ARCHIVE', async () => {
    const channels = await getChannels('counter-strike');
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryFilterableVideoTowerVideos({
          includePreviewBlur: false,
          limit: 30,
          channelOwnerLogin: login,
          broadcastType: 'ARCHIVE',
          videoSort: 'TIME',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: broadcastType HIGHLIGHT', async () => {
    const channels = await getChannels('pubg-battlegrounds');
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryFilterableVideoTowerVideos({
          includePreviewBlur: false,
          limit: 30,
          channelOwnerLogin: login,
          broadcastType: 'HIGHLIGHT',
          videoSort: 'TIME',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: broadcastType UPLOAD', async () => {
    const channels = await getChannels('league-of-legends');
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryFilterableVideoTowerVideos({
          includePreviewBlur: false,
          limit: 30,
          channelOwnerLogin: login,
          broadcastType: 'UPLOAD',
          videoSort: 'TIME',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: broadcastType null (all videos)', async () => {
    const channels = await getChannels('minecraft');
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryFilterableVideoTowerVideos({
          includePreviewBlur: false,
          limit: 30,
          channelOwnerLogin: login,
          broadcastType: null,
          videoSort: 'TIME',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryFilterableVideoTowerVideos({
        includePreviewBlur: false,
        limit: 30,
        channelOwnerLogin: '-channel-not-exists-',
        broadcastType: null,
        videoSort: 'TIME',
      }),
    ]);
    validate(queryResponse);
  });
});
