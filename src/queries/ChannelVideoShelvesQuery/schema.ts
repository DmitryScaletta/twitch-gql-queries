import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';
import { GuestStarParticipantsSchema } from '../ClipsCards__Game/schema.ts';
import { ResourceRestrictionSchema } from '../FilterableVideoTower_Videos/schema.ts';

export const name = 'ChannelVideoShelvesQuery';
export const displayName = name;
export const tags = ['Videos'];

export const VariablesSchema = strictObject(
  {
    includePreviewBlur: T.Optional(T.Boolean()),
    channelLogin: T.String(),
    first: T.Integer({ minimum: 1 }),
  },
  { $id: `${displayName}Variables` },
);

export const ClipSchema = strictObject(
  {
    ...pick(schemas.Clip, [
      'id',
      'slug',
      'thumbnailURL',
      'createdAt',
      'durationSeconds',
      'isFeatured',
      'isAutoCurated',
    ]),
    clipTitle: T.String(),
    clipViewCount: T.Integer({ minimum: 0 }),
    curator: T.Union([
      T.Null(),
      strictObject(pick(schemas.User, ['id', 'login', 'displayName'])),
    ]),
    clipGame: T.Union([
      T.Null(),
      strictObject(pick(schemas.Game, ['id', 'slug', 'name', 'boxArtURL'])),
    ]),
    broadcaster: strictObject({
      ...pick(schemas.User, [
        'id',
        'login',
        'displayName',
        'profileImageURL',
        'primaryColorHex',
      ]),
      roles: strictObject(pick(schemas.UserRoles, ['isPartner'])),
    }),
    broadcastIdentifier: T.Union([
      T.Null(),
      strictObject(schemas.BroadcastIdOnly),
    ]),
    guestStarParticipants: T.Union([T.Null(), GuestStarParticipantsSchema]),
  },
  { $id: `${displayName}Clip` },
);

export const VideoSchema = strictObject(
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
      strictObject(
        pick(schemas.Game, ['boxArtURL', 'id', 'slug', 'displayName', 'name']),
      ),
    ]),
    broadcastIdentifier: T.Union([
      T.Null(),
      strictObject(schemas.BroadcastIdOnly),
    ]),
    owner: strictObject({
      ...pick(schemas.User, [
        'displayName',
        'id',
        'login',
        'profileImageURL',
        'primaryColorHex',
      ]),
      roles: strictObject(pick(schemas.UserRoles, ['isPartner'])),
    }),
    self: strictObject(
      pick(schemas.VideoSelfEdge, ['isRestricted', 'viewingHistory']),
    ),
    resourceRestriction: T.Union([T.Null(), ResourceRestrictionSchema]),
    contentTags: T.Array(T.Unknown(), { maxItems: 0 }),
    previewThumbnailProperties: T.Optional(
      strictObject(pick(schemas.PreviewThumbnailProperties, ['blurReason'])),
    ),
  },
  { $id: `${displayName}Video` },
);

const CollectionSchema = strictObject({
  id: T.String({ minLength: 1 }),
  description: T.String(),
  owner: strictObject(pick(schemas.User, ['id', 'login'])),
  thumbnailURL: T.Union([T.Null(), T.String({ format: 'uri' })]),
  title: T.String(),
  type: T.Union([T.Literal('DEFAULT')]),
  updatedAt: T.String({ format: 'date-time' }),
  lengthSeconds: T.Integer({ minimum: 0 }),
  items: strictObject({
    totalCount: T.Integer({ minimum: 0 }),
    edges: T.Array(
      strictObject({
        cursor: T.Union([T.Null(), T.String()]),
        node: TRef(VideoSchema),
        __typename: T.Literal('CollectionItemEdge'),
      }),
    ),
    pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
    __typename: T.Literal('CollectionConnection'),
  }),
  __typename: T.Literal('Collection'),
});

export const VideoShelfSchema = strictObject(
  {
    id: T.String({ minLength: 1 }),
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
    items: T.Array(T.Union([TRef(ClipSchema), TRef(VideoSchema)])),
    __typename: T.Literal('VideoShelf'),
  },
  { $id: `${displayName}VideoShelf` },
);

const UserSchema = strictObject({
  ...pick(schemas.User, ['id', 'displayName', 'primaryColorHex']),
  videoShelves: strictObject({
    edges: T.Array(
      strictObject({
        cursor: T.Union([T.Null(), T.String()]),
        node: TRef(VideoShelfSchema),
        __typename: T.Literal('VideoShelfEdge'),
      }),
    ),
    pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
    __typename: T.Literal('VideoShelfConnection'),
  }),
});

export const DataSchema = strictObject(
  {
    currentUser: T.Union([T.Null()]),
    user: T.Union([T.Null(), UserSchema]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
