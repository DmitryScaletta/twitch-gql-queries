import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'SearchTray_SearchSuggestions';
const category = 'SearchTray';
const displayName = `SearchTraySearchSuggestions`;

export const VariablesSchema = T.Object(
  {
    queryFragment: T.String(),
    withOfflineChannelContent: T.Optional(T.Union([T.Null(), T.Boolean()])),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const SuggestionChannelSchema = T.Object(
  {
    id: T.String(),
    login: T.String(),
    profileImageURL: T.String(),
    isLive: T.Boolean(),
    isVerified: T.Boolean(),
    user: T.Object(
      {
        id: T.String(),
        stream: T.Union([
          T.Null(),
          T.Object(
            {
              id: T.String(),
              game: T.Union([
                T.Null(),
                T.Object(
                  {
                    id: T.String(),
                    __typename: T.Literal('Game'),
                  },
                  { additionalProperties: false },
                ),
              ]),
              __typename: T.Literal('Stream'),
            },
            { additionalProperties: false },
          ),
        ]),
        __typename: T.Literal('User'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('SearchSuggestionChannel'),
  },
  {
    $id: `${category}SuggestionChannel`,
    additionalProperties: false,
  },
);

export const SuggestionCategorySchema = T.Object(
  {
    id: T.String(),
    boxArtURL: T.String(),
    game: T.Object(
      {
        id: T.String(),
        slug: T.String(),
        __typename: T.Literal('Game'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('SearchSuggestionCategory'),
  },
  {
    $id: `${category}SuggestionCategory`,
    additionalProperties: false,
  },
);

export const SuggestionSchema = T.Object(
  {
    id: T.String(),
    text: T.String(),
    content: T.Union([
      T.Null(),
      LegacyRef(SuggestionChannelSchema),
      LegacyRef(SuggestionCategorySchema),
    ]),
    matchingCharacters: T.Object(
      {
        start: T.Number(),
        end: T.Number(),
        __typename: T.Literal('SearchSuggestionHighlight'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('SearchSuggestion'),
  },
  {
    $id: `${category}Suggestion`,
    additionalProperties: false,
  },
);

export const SuggestionsSchema = T.Object(
  {
    edges: T.Array(
      T.Object(
        {
          node: LegacyRef(SuggestionSchema),
          __typename: T.Literal('SearchSuggestionEdge'),
        },
        { additionalProperties: false },
      ),
    ),
    tracking: T.Object(
      {
        modelTrackingID: T.String(),
        responseID: T.String(),
        __typename: T.Literal('SearchSuggestionTracking'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('SearchSuggestionConnection'),
  },
  {
    $id: `${category}Suggestions`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  { searchSuggestions: LegacyRef(SuggestionsSchema) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
