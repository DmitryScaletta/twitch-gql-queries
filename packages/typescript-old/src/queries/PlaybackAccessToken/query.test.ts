import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels, getVideos } from '../../testHelpers.ts';
import { getQueryPlaybackAccessToken } from './query.ts';
import {
  ResponseSchema,
  StreamPlaybackAccessTokenSchema,
  VideoPlaybackAccessTokenSchema,
} from './schema.ts';

describe('PlaybackAccessToken', () => {
  const validate = createValidate(ResponseSchema, [
    VideoPlaybackAccessTokenSchema,
    StreamPlaybackAccessTokenSchema,
  ]);

  test('real request: vod', async () => {
    const videos = await getVideos('twitch');
    const responses = await gqlRequest(
      videos.archiveIds.map((vodID) =>
        getQueryPlaybackAccessToken({
          isLive: false,
          login: '',
          isVod: true,
          vodID,
          playerType: 'site',
          platform: 'web',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: stream', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryPlaybackAccessToken({
          isLive: true,
          login,
          isVod: false,
          vodID: '',
          playerType: 'site',
          platform: 'web',
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: vod not exists', async () => {
    const responses = await gqlRequest([
      getQueryPlaybackAccessToken({
        isLive: false,
        login: '',
        isVod: true,
        vodID: '1234567890',
        playerType: 'site',
        platform: 'web',
      }),
    ]);
    responses.map(validate);
  });

  test('real request: stream not exists', async () => {
    const responses = await gqlRequest([
      getQueryPlaybackAccessToken({
        isLive: true,
        login: '-channel-not-exists-',
        isVod: false,
        vodID: '',
        playerType: 'site',
        platform: 'web',
      }),
    ]);
    responses.map(validate);
  });
});
