import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQuerySearchResultsPageSearchResults } from './query.ts';
import {
  ChannelSchema,
  GameSchema,
  RelatedLiveChannelSchema,
  ResponseSchema,
  VideoSchema,
} from './schema.ts';

import resChannels from './mocks/response-channels.json' with { type: 'json' };
import resChannelsWithTag from './mocks/response-channels-with-tag.json' with { type: 'json' };
import resGames from './mocks/response-games.json' with { type: 'json' };
import resVods from './mocks/response-vods.json' with { type: 'json' };
import resChannelWithSchedule from './mocks/response-channel-with-schedule.json' with { type: 'json' };
import resWithRelatedChannels from './mocks/response-with-related-live-channels.json' with { type: 'json' };

describe('SearchResultsPage_SearchResults', () => {
  const validate = createValidate(ResponseSchema, [
    ChannelSchema,
    RelatedLiveChannelSchema,
    GameSchema,
    VideoSchema,
  ]);

  test('real request: only required variables', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({ query: 'forse' }),
    ]);
    responses.map(validate);
  });

  test('real request: all variables', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'forsen',
        options: {
          targets: null,
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: CHANNEL', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'forsen',
        options: {
          targets: [{ index: 'CHANNEL' }],
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: CHANNEL_WITH_TAG', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'forsen',
        options: {
          targets: [{ index: 'CHANNEL_WITH_TAG' }],
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: GAME', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'forsen',
        options: {
          targets: [{ index: 'GAME' }],
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: VOD', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'forsen',
        options: {
          targets: [{ index: 'VOD' }],
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('mock: channels', () => validate(resChannels));
  test('mock: channels with tag', () => validate(resChannelsWithTag));
  test('mock: games', () => validate(resGames));
  test('mock: vods', () => validate(resVods));
  test('mock: channel with schedule', () => validate(resChannelWithSchedule));
  test('mock: with relatedLiveChannels', () =>
    validate(resWithRelatedChannels));
});
