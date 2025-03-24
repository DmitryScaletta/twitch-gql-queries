import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getVideos } from '../../testHelpers.ts';
import { getQueryVideoMetadata } from './query.ts';
import { ResponseSchema } from './schema.ts';

import resNoLastBroadcast from './mocks/6-no-last-broadcast.json' with { type: 'json' };

describe('VideoMetadata', () => {
  const validate = createValidate(ResponseSchema);

  test('real request: archive', async () => {
    const channelLogin = 'twitch';
    const videos = await getVideos(channelLogin);
    const responses = await gqlRequest(
      videos.archiveIds.map((videoID) =>
        getQueryVideoMetadata({ channelLogin, videoID }),
      ),
    );
    responses.map(validate);
  });

  test('real request: highlight', async () => {
    const channelLogin = 'twitch';
    const videos = await getVideos(channelLogin);
    const responses = await gqlRequest(
      videos.highlightIds.map((videoID) =>
        getQueryVideoMetadata({ channelLogin, videoID }),
      ),
    );
    responses.map(validate);
  });

  test('real request: upload', async () => {
    const channelLogin = 'twitch';
    const videos = await getVideos(channelLogin);
    const responses = await gqlRequest(
      videos.uploadIds.map((videoID) =>
        getQueryVideoMetadata({ channelLogin, videoID }),
      ),
    );
    responses.map(validate);
  });

  test('real request: no channelLogin', async () => {
    const responses = await gqlRequest([
      getQueryVideoMetadata({ channelLogin: '', videoID: '2404782496' }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryVideoMetadata({ channelLogin: '', videoID: '2185567717' }),
    ]);
    responses.map(validate);
  });

  test('mock: no last broadcast', () => validate(resNoLastBroadcast));
});
