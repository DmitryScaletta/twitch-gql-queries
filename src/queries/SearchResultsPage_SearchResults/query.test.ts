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

describe('SearchResultsPage_SearchResults', () => {
  const validate = createValidate(ResponseSchema, [
    ChannelSchema,
    RelatedLiveChannelSchema,
    GameSchema,
    VideoSchema,
  ]);

  test('real request: all variables', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'action',
        options: {
          targets: null,
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: only required variables', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        query: 'forsen',
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: shouldSkipDiscoveryControl true', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'asmr',
        options: {
          targets: null,
          shouldSkipDiscoveryControl: true,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: includeIsDJ false', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'action',
        options: {
          targets: null,
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: false,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: CHANNEL', async () => {
    const responses = await gqlRequest([
      getQuerySearchResultsPageSearchResults({
        platform: 'web',
        query: 'cohhcarnage',
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
        query: 'monster',
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
        query: 'gtnh',
        options: {
          targets: [{ index: 'VOD' }],
          shouldSkipDiscoveryControl: false,
        },
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });
});
