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

  test('real request 1', async () => {
    const responses = await gqlRequest([
      getQuerySearchTraySuggestions({ queryFragment: 'forse' }),
    ]);
    responses.map(validate);
  });

  test('real request 2', async () => {
    const responses = await gqlRequest([
      getQuerySearchTraySuggestions({ queryFragment: 'summ' }),
    ]);
    responses.map(validate);
  });
});
