import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'FilterableVideoTower_Videos';
const displayName = 'FilterableVideoTowerVideos';

export const VariablesSchema = buildObject(
  {
    includePreviewBlur: T.Optional(T.Boolean()),
    limit: T.Number(),
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

export const ResourceRestrictionSchema = buildObject({
  id: T.String(),
  type: T.Union([T.Literal('SUB_ONLY_LIVE')]),
  exemptions: T.Array(
    buildObject({
      type: T.Union([
        T.Literal('STAFF'),
        T.Literal('SITE_ADMIN'),
        T.Literal('PRODUCT'),
        T.Literal('PREVIEW'),
      ]),
      actions: T.Array(
        buildObject({
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

const UserSchema = buildObject({
  ...pick(schemas.User, ['id']),
  videos: buildObject({
    edges: T.Array(
      buildObject({
        ...pick(schemas.VideoEdge, ['cursor']),
        node: LegacyRef(VideoSchema),
      }),
    ),
    pageInfo: buildObject(pick(schemas.PageInfo, ['hasNextPage'])),
    __typename: T.Literal('VideoConnection'),
  }),
});

export const DataSchema = buildObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
