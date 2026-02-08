import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'FilterableVideoTower_Videos';
export const displayName = 'FilterableVideoTowerVideos';
export const tags = ['Videos'];

export const BroadcastTypeSchema = T.Union(
  [T.Null(), ...schemas.Video_BroadcastType],
  { $id: 'BroadcastType' },
);
export const VideoSortSchema = T.Union(
  [T.Literal('TIME'), T.Literal('VIEWS')],
  { $id: 'VideoSort' },
);

export const VariablesSchema = strictObject(
  {
    includePreviewBlur: T.Optional(T.Boolean()),
    limit: T.Integer({ minimum: 1 }),
    channelOwnerLogin: T.String(),
    broadcastType: T.Optional(BroadcastTypeSchema),
    videoSort: VideoSortSchema,
  },
  { $id: `${displayName}Variables` },
);

export const ResourceRestrictionSchema = strictObject({
  // vod:2397382584
  id: T.String({ minLength: 1 }),
  type: T.Union([T.Literal('SUB_ONLY_LIVE')]),
  exemptions: T.Array(
    strictObject({
      type: T.Union([
        T.Literal('STAFF'),
        T.Literal('SITE_ADMIN'),
        T.Literal('PRODUCT'),
        T.Literal('PREVIEW'),
      ]),
      actions: T.Array(
        strictObject({
          name: T.String(),
          title: T.String(),
          __typename: T.Literal('ResourceRestrictionExemptionAction'),
        }),
      ),
      __typename: T.Literal('ResourceRestrictionExemption'),
    }),
  ),
  options: T.Array(T.Union([T.Literal('ALLOW_ALL_TIERS')])),
  __typename: T.Literal('ResourceRestriction'),
});

const VideoOwnerSchema = strictObject({
  ...pick(schemas.User, [
    'displayName',
    'id',
    'login',
    'profileImageURL',
    'primaryColorHex',
  ]),
  roles: strictObject(pick(schemas.UserRoles, ['isPartner'])),
});

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
    owner: T.Union([T.Null(), VideoOwnerSchema]),
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

const UserSchema = strictObject({
  ...pick(schemas.User, []),
  id: T.Union([T.Literal(''), schemas.User.id]),
  videos: T.Union([
    T.Null(),
    strictObject({
      edges: T.Array(
        strictObject({
          ...pick(schemas.VideoEdge, ['cursor']),
          node: TRef(VideoSchema),
        }),
      ),
      pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
      __typename: T.Literal('VideoConnection'),
    }),
  ]),
});

export const DataSchema = strictObject(
  { user: UserSchema },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
