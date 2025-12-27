import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'SearchTray_SearchSuggestions';
export const displayName = `SearchTraySearchSuggestions`;
export const tags = ['Search'];
const category = 'SearchTray';

export const VariablesSchema = strictObject(
  {
    queryFragment: T.String(),
    withOfflineChannelContent: T.Optional(T.Union([T.Null(), T.Boolean()])),
    includeIsDJ: T.Boolean(),
  },
  { $id: `${displayName}Variables` },
);

export const SuggestionChannelSchema = strictObject(
  {
    id: T.String({ pattern: '^[0-9]+$' }),
    login: T.String(),
    profileImageURL: T.String({ format: 'uri' }),
    isLive: T.Boolean(),
    isVerified: T.Boolean(),
    user: strictObject({
      ...pick(schemas.User, ['id']),
      roles: strictObject({
        isParticipatingDJ: T.Optional(schemas.UserRoles.isParticipatingDJ),
        ...pick(schemas.UserRoles, []),
      }),
      stream: T.Union([
        T.Null(),
        strictObject({
          ...pick(schemas.Stream, ['id']),
          game: T.Union([T.Null(), strictObject(pick(schemas.Game, ['id']))]),
        }),
      ]),
    }),
    __typename: T.Literal('SearchSuggestionChannel'),
  },
  { $id: `${category}SuggestionChannel` },
);

export const SuggestionCategorySchema = strictObject(
  {
    id: T.String({ pattern: '^[0-9]+$' }),
    boxArtURL: T.String({ format: 'uri' }),
    game: strictObject(pick(schemas.Game, ['id', 'slug'])),
    __typename: T.Literal('SearchSuggestionCategory'),
  },
  { $id: `${category}SuggestionCategory` },
);

export const SuggestionSchema = strictObject(
  {
    id: T.String({ format: 'uuid' }),
    text: T.String(),
    content: T.Union([
      T.Null(),
      TRef(SuggestionChannelSchema),
      TRef(SuggestionCategorySchema),
    ]),
    matchingCharacters: strictObject({
      start: T.Integer({ minimum: 0 }),
      end: T.Integer({ minimum: 0 }),
      __typename: T.Literal('SearchSuggestionHighlight'),
    }),
    __typename: T.Literal('SearchSuggestion'),
  },
  { $id: `${category}Suggestion` },
);

export const SuggestionsSchema = strictObject(
  {
    edges: T.Array(
      strictObject({
        node: TRef(SuggestionSchema),
        __typename: T.Literal('SearchSuggestionEdge'),
      }),
    ),
    tracking: strictObject({
      modelTrackingID: T.String(),
      responseID: T.String(),
      __typename: T.Literal('SearchSuggestionTracking'),
    }),
    __typename: T.Literal('SearchSuggestionConnection'),
  },
  { $id: `${category}Suggestions` },
);

export const DataSchema = strictObject(
  { searchSuggestions: TRef(SuggestionsSchema) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
