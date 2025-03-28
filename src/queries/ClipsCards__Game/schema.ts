import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'ClipsCards__Game';
export const displayName = 'ClipsCardsGame';
export const tags = ['Clips'];
const category = 'ClipsCards';

export const FilterSchema = T.Union(
  [
    T.Literal('LAST_DAY'),
    T.Literal('LAST_WEEK'),
    T.Literal('LAST_MONTH'),
    T.Literal('ALL_TIME'),
  ],
  { $id: `${category}Filter` },
);

export const VariablesSchema = strictObject(
  {
    categorySlug: T.String(),
    limit: T.Integer({ minimum: 1 }),
    criteria: T.Optional(
      strictObject({
        languages: T.Optional(T.Union([T.Null(), T.Array(T.String())])),
        filter: T.Optional(T.Union([T.Null(), LegacyRef(FilterSchema)])),
        shouldFilterByDiscoverySetting: T.Optional(
          T.Union([T.Null(), T.Boolean()]),
        ),
      }),
    ),
    cursor: T.Optional(T.Union([T.Null(), T.String()])),
  },
  { $id: `${displayName}Variables` },
);

export const GuestStarParticipantsSchema = strictObject({
  guests: T.Array(
    T.Union([
      T.Null(),
      strictObject(
        pick(schemas.User, [
          'id',
          'login',
          'displayName',
          'profileImageURL',
          'primaryColorHex',
          'description',
        ]),
      ),
    ]),
  ),
  sessionIdentifier: T.Union([T.Literal(''), T.String({ minLength: 1 })]),
  __typename: T.Literal('GuestStarParticipants'),
});

export const ClipSchema = strictObject(
  {
    ...pick(schemas.Clip, [
      'id',
      'slug',
      'title',
      'viewCount',
      'thumbnailURL',
      'createdAt',
      'durationSeconds',
      'isFeatured',
    ]),
    curator: T.Union([
      T.Null(),
      strictObject(pick(schemas.User, ['id', 'login', 'displayName'])),
    ]),
    game: T.Union([
      T.Null(),
      strictObject(pick(schemas.Game, ['id', 'slug', 'name', 'boxArtURL'])),
    ]),
    broadcaster: T.Union([
      T.Null(),
      strictObject({
        ...pick(schemas.User, [
          'id',
          'login',
          'displayName',
          'profileImageURL',
          'primaryColorHex',
        ]),
        roles: strictObject(pick(schemas.UserRoles, ['isPartner'])),
      }),
    ]),
    guestStarParticipants: T.Union([T.Null(), GuestStarParticipantsSchema]),
    previewThumbnailProperties: strictObject(
      pick(schemas.PreviewThumbnailProperties, ['blurReason']),
    ),
    __typename: T.Literal('Clip'),
  },
  { $id: `${displayName}Clip` },
);

const ClipsSchema = strictObject({
  banners: T.Union([
    T.Null(),
    T.Array(T.Union([T.Literal('MAY_CONTAIN_MATURE_CONTENT')])),
  ]),
  pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
  edges: T.Array(
    strictObject({
      cursor: T.Union([T.Null(), T.String()]),
      node: LegacyRef(ClipSchema),
      __typename: T.Literal('ClipEdge'),
    }),
  ),
  __typename: T.Literal('ClipConnection'),
});

const GameSchema = strictObject({
  ...pick(schemas.Game, ['id', 'name', 'displayName']),
  clips: T.Union([T.Null(), ClipsSchema]),
});

export const DataSchema = strictObject(
  { game: T.Union([T.Null(), GameSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
