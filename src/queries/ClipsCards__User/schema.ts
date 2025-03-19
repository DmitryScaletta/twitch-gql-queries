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

const name = 'ClipsCards__User';
const displayName = 'ClipsCardsUser';

export const VariablesSchema = buildObject(
  {
    login: T.String(),
    limit: T.Number(),
    criteria: T.Optional(
      buildObject({
        filter: T.Optional(T.Union([LegacyRef(FilterSchema), T.Null()])),
        shouldFilterByDiscoverySetting: T.Optional(
          T.Union([T.Boolean(), T.Null()]),
        ),
      }),
    ),
    cursor: T.Optional(T.Union([T.String(), T.Null()])),
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
