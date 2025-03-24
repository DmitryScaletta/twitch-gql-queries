import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
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

export const VariablesSchema = strictObject(
  {
    login: T.String(),
    limit: T.Integer({ minimum: 1 }),
    criteria: T.Optional(
      strictObject({
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

export const ClipSchema = strictObject(
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
  },
  { $id: `${displayName}Clip` },
);

const ClipsSchema = strictObject({
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

const UserSchema = strictObject({
  ...pick(schemas.User, ['id']),
  clips: T.Union([T.Null(), ClipsSchema]),
});

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
