import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';
import { GuestStarParticipantsSchema } from '../ClipsCards__Game/schema.ts';
import { ResourceRestrictionSchema } from '../FilterableVideoTower_Videos/schema.ts';

const name = 'ChannelVideoShelvesQuery';
const displayName = name;

export const VariablesSchema = buildObject(
  {
    includePreviewBlur: T.Optional(T.Boolean()),
    channelLogin: T.String(),
    first: T.Number(),
  },
  { $id: `${displayName}Variables` },
);

export const ClipSchema = buildObject(
  {
    ...pick(schemas.Clip, [
      'id',
      'slug',
      'thumbnailURL',
      'createdAt',
      'durationSeconds',
      'isFeatured',
    ]),
    clipTitle: T.String(),
    clipViewCount: T.Number(),
    curator: T.Union([
      T.Null(),
      buildObject(pick(schemas.User, ['id', 'login', 'displayName'])),
    ]),
    clipGame: T.Union([
      T.Null(),
      buildObject(pick(schemas.Game, ['id', 'slug', 'name', 'boxArtURL'])),
    ]),
    broadcaster: buildObject({
      ...pick(schemas.User, [
        'id',
        'login',
        'displayName',
        'profileImageURL',
        'primaryColorHex',
      ]),
      roles: buildObject(pick(schemas.UserRoles, ['isPartner'])),
    }),
    guestStarParticipants: T.Union([T.Null(), GuestStarParticipantsSchema]),
  },
  { $id: `${displayName}Clip` },
);

export const VideoSchema = buildObject(
  {
    ...pick(schemas.Video, [
      'animatedPreviewURL',
      'id',
      'lengthSeconds',
      'previewThumbnailURL',
      'publishedAt',
      'title',
      'viewCount',
    ]),
    game: T.Union([
      T.Null(),
      buildObject(
        pick(schemas.Game, ['boxArtURL', 'id', 'slug', 'displayName', 'name']),
      ),
    ]),
    owner: buildObject({
      ...pick(schemas.User, [
        'displayName',
        'id',
        'login',
        'profileImageURL',
        'primaryColorHex',
      ]),
      roles: buildObject(pick(schemas.UserRoles, ['isPartner'])),
    }),
    self: buildObject(
      pick(schemas.VideoSelfEdge, ['isRestricted', 'viewingHistory']),
    ),
    resourceRestriction: T.Union([T.Null(), ResourceRestrictionSchema]),
    contentTags: T.Array(T.Unknown()),
    previewThumbnailProperties: T.Optional(
      buildObject(pick(schemas.PreviewThumbnailProperties, ['blurReason'])),
    ),
  },
  { $id: `${displayName}Video` },
);

const CollectionSchema = buildObject({
  id: T.String(),
  description: T.String(),
  owner: buildObject(pick(schemas.User, ['id', 'login'])),
  thumbnailURL: T.Union([
    T.Null(),
    T.String({
      // format: 'uri',
    }),
  ]),
  title: T.String(),
  type: T.Union([T.Literal('DEFAULT')]),
  updatedAt: T.String({
    // format: 'date-time',
  }),
  lengthSeconds: T.Number(),
  items: buildObject({
    totalCount: T.Number(),
    edges: T.Array(
      buildObject({
        cursor: T.Union([T.Null(), T.String()]),
        node: LegacyRef(VideoSchema),
        __typename: T.Literal('CollectionItemEdge'),
      }),
    ),
    pageInfo: buildObject(pick(schemas.PageInfo, ['hasNextPage'])),
    __typename: T.Literal('CollectionConnection'),
  }),
  __typename: T.Literal('Collection'),
});

export const VideoShelfSchema = buildObject(
  {
    id: T.String(),
    title: T.String(),
    description: T.Union([T.Null(), T.String()]),
    type: T.Union([
      T.Literal('TOP_CLIPS'),
      T.Literal('LATEST_BROADCASTS'),
      T.Literal('ALL_VIDEOS'),
      T.Literal('LATEST_NON_BROADCASTS'),
      T.Literal('COLLECTION'),
    ]),
    collection: T.Union([T.Null(), CollectionSchema]),
    items: T.Array(T.Union([LegacyRef(ClipSchema), LegacyRef(VideoSchema)])),
    __typename: T.Literal('VideoShelf'),
  },
  { $id: `${displayName}VideoShelf` },
);

const UserSchema = buildObject({
  ...pick(schemas.User, ['id', 'displayName', 'primaryColorHex']),
  videoShelves: buildObject({
    edges: T.Array(
      buildObject({
        cursor: T.Union([T.Null(), T.String()]),
        node: LegacyRef(VideoShelfSchema),
        __typename: T.Literal('VideoShelfEdge'),
      }),
    ),
    pageInfo: buildObject(pick(schemas.PageInfo, ['hasNextPage'])),
    __typename: T.Literal('VideoShelfConnection'),
  }),
});

export const DataSchema = buildObject(
  {
    currentUser: T.Union([T.Null(), T.Unknown()]),
    user: T.Union([T.Null(), UserSchema]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
