import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';
import {
  FilterSchema,
  GuestStarParticipantsSchema,
} from '../ClipsCards__Game/schema.ts';

export const name = 'ClipsCards__User';
export const displayName = 'ClipsCardsUser';
export const tags = ['Clips'];

export const VariablesSchema = buildObject(
  {
    login: T.String(),
    limit: T.Integer({ minimum: 1 }),
    criteria: T.Optional(
      buildObject({
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

export const ClipSchema = buildObject(
  {
    ...pick(schemas.Clip, [
      'id',
      'slug',
      'url',
      'embedURL',
      'title',
      'viewCount',
      'language',
      'thumbnailURL',
      'createdAt',
      'durationSeconds',
      'champBadge',
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
  },
  { $id: `${displayName}Clip` },
);

const ClipsSchema = buildObject({
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

const UserSchema = buildObject({
  ...pick(schemas.User, ['id']),
  clips: T.Union([T.Null(), ClipsSchema]),
});

export const DataSchema = buildObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
