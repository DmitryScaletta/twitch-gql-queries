import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'ClipsCards__Game';
const category = 'ClipsCards';
const displayName = 'ClipsCardsGame';

export const FilterSchema = T.Union(
  [
    T.Literal('LAST_DAY'),
    T.Literal('LAST_WEEK'),
    T.Literal('LAST_MONTH'),
    T.Literal('ALL_TIME'),
  ],
  { $id: `${category}Filter` },
);

export const VariablesSchema = buildObject(
  {
    categorySlug: T.String(),
    limit: T.Number(),
    criteria: T.Optional(
      buildObject({
        languages: T.Optional(T.Union([T.Array(T.Null(), T.String())])),
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

export const GuestStarParticipantsSchema = buildObject({
  guests: T.Array(
    T.Union([
      T.Null(),
      buildObject(
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
  sessionIdentifier: T.String(),
  __typename: T.Literal('GuestStarParticipants'),
});

export const ClipSchema = buildObject(
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
      buildObject(pick(schemas.User, ['id', 'login', 'displayName'])),
    ]),
    game: T.Union([
      T.Null(),
      buildObject(pick(schemas.Game, ['id', 'slug', 'name', 'boxArtURL'])),
    ]),
    broadcaster: T.Union([
      T.Null(),
      buildObject({
        ...pick(schemas.User, [
          'id',
          'login',
          'displayName',
          'profileImageURL',
          'primaryColorHex',
        ]),
        roles: buildObject(pick(schemas.UserRoles, ['isPartner'])),
      }),
    ]),
    guestStarParticipants: T.Union([T.Null(), GuestStarParticipantsSchema]),
    previewThumbnailProperties: buildObject(
      pick(schemas.PreviewThumbnailProperties, ['blurReason']),
    ),
    __typename: T.Literal('Clip'),
  },
  { $id: `${displayName}Clip` },
);

const ClipsSchema = buildObject({
  banners: T.Union([
    T.Null(),
    T.Array(T.Union([T.Literal('MAY_CONTAIN_MATURE_CONTENT'), T.String()])),
  ]),
  pageInfo: buildObject(pick(schemas.PageInfo, ['hasNextPage'])),
  edges: T.Array(
    buildObject({
      cursor: T.Union([T.Null(), T.String()]),
      node: LegacyRef(ClipSchema),
      __typename: T.Literal('ClipEdge'),
    }),
  ),
  __typename: T.Literal('ClipConnection'),
});

const GameSchema = buildObject({
  ...pick(schemas.Game, ['id', 'name', 'displayName']),
  clips: T.Union([T.Null(), ClipsSchema]),
});

export const DataSchema = buildObject(
  { game: T.Union([T.Null(), GameSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
