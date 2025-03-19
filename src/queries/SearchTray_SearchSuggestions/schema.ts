import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'SearchTray_SearchSuggestions';
const category = 'SearchTray';
const displayName = `SearchTraySearchSuggestions`;

export const VariablesSchema = buildObject(
  {
    queryFragment: T.String(),
    withOfflineChannelContent: T.Optional(T.Union([T.Null(), T.Boolean()])),
  },
  { $id: `${displayName}Variables` },
);

export const SuggestionChannelSchema = buildObject(
  {
    id: T.String(),
    login: T.String(),
    profileImageURL: T.String(),
    isLive: T.Boolean(),
    isVerified: T.Boolean(),
    user: buildObject({
      ...pick(schemas.User, ['id']),
      stream: T.Union([
        T.Null(),
        buildObject({
          ...pick(schemas.Stream, ['id']),
          game: T.Union([T.Null(), buildObject(pick(schemas.Game, ['id']))]),
        }),
      ]),
    }),
    __typename: T.Literal('SearchSuggestionChannel'),
  },
  { $id: `${category}SuggestionChannel` },
);

export const SuggestionCategorySchema = buildObject(
  {
    id: T.String(),
    boxArtURL: T.String(),
    game: buildObject(pick(schemas.Game, ['id', 'slug'])),
    __typename: T.Literal('SearchSuggestionCategory'),
  },
  { $id: `${category}SuggestionCategory` },
);

export const SuggestionSchema = buildObject(
  {
    id: T.String(),
    text: T.String(),
    content: T.Union([
      T.Null(),
      LegacyRef(SuggestionChannelSchema),
      LegacyRef(SuggestionCategorySchema),
    ]),
    matchingCharacters: buildObject({
      start: T.Number(),
      end: T.Number(),
      __typename: T.Literal('SearchSuggestionHighlight'),
    }),
    __typename: T.Literal('SearchSuggestion'),
  },
  { $id: `${category}Suggestion` },
);

export const SuggestionsSchema = buildObject(
  {
    edges: T.Array(
      buildObject({
        node: LegacyRef(SuggestionSchema),
        __typename: T.Literal('SearchSuggestionEdge'),
      }),
    ),
    tracking: buildObject({
      modelTrackingID: T.String(),
      responseID: T.String(),
      __typename: T.Literal('SearchSuggestionTracking'),
    }),
    __typename: T.Literal('SearchSuggestionConnection'),
  },
  { $id: `${category}Suggestions` },
);

export const DataSchema = buildObject(
  { searchSuggestions: LegacyRef(SuggestionsSchema) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
