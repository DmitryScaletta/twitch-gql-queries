import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQuerySearchTraySuggestions } from './query.ts';
import {
  ResponseSchema,
  SuggestionCategorySchema,
  SuggestionChannelSchema,
  SuggestionSchema,
  SuggestionsSchema,
} from './schema.ts';

describe('SearchTray_SearchSuggestions', () => {
  const validate = createValidate(ResponseSchema, [
    SuggestionCategorySchema,
    SuggestionChannelSchema,
    SuggestionSchema,
    SuggestionsSchema,
  ]);

  test('real request: all variables', async () => {
    const responses = await gqlRequest([
      getQuerySearchTraySuggestions({
        queryFragment: 'forse',
        withOfflineChannelContent: false,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: includeIsDJ = false', async () => {
    const responses = await gqlRequest([
      getQuerySearchTraySuggestions({
        queryFragment: 'summ',
        includeIsDJ: false,
      }),
    ]);
    responses.map(validate);
  });

  test('real request: withOfflineChannelContent = true', async () => {
    const responses = await gqlRequest([
      getQuerySearchTraySuggestions({
        queryFragment: 'xqc',
        withOfflineChannelContent: true,
        includeIsDJ: true,
      }),
    ]);
    responses.map(validate);
  });
});
