import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'FilterableVideoTower_Videos';
export const displayName = 'FilterableVideoTowerVideos';
export const tags = ['Videos'];

export const VariablesSchema = strictObject(
  {
    includePreviewBlur: T.Optional(T.Boolean()),
    limit: T.Integer({ minimum: 1 }),
    channelOwnerLogin: T.String(),
    broadcastType: T.Optional(
      T.Union([
        T.Null(),
        T.Literal('ARCHIVE'),
        T.Literal('HIGHLIGHT'),
        T.Literal('UPLOAD'),
      ]),
    ),
    videoSort: T.Union([T.Literal('TIME'), T.Literal('VIEWS')]),
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

const UserSchema = strictObject({
  ...pick(schemas.User, ['id']),
  videos: strictObject({
    edges: T.Array(
      strictObject({
        ...pick(schemas.VideoEdge, ['cursor']),
        node: LegacyRef(VideoSchema),
      }),
    ),
    pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
    __typename: T.Literal('VideoConnection'),
  }),
});

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
