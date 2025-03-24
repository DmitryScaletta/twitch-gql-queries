import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'ShareClipRenderStatus';
export const displayName = name;
export const tags = ['Clips'];

export const VariablesSchema = buildObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

export const BroadcasterSchema = buildObject(
  {
    ...pick(schemas.User, [
      'id',
      'login',
      'displayName',
      'primaryColorHex',
      'isPartner',
      'profileImageURL',
    ]),
    followers: buildObject(pick(schemas.FollowerConnection, ['totalCount'])),
    stream: T.Union([
      T.Null(),
      buildObject(pick(schemas.Stream, ['id', 'viewersCount'])),
    ]),
    // what if never streamed and a clip was made from an upload?
    lastBroadcast: buildObject(pick(schemas.Broadcast, ['id', 'startedAt'])),
    self: T.Union([T.Null()]),
  },
  { $id: `${displayName}Broadcaster` },
);

const PortraitCropCoordinatesSchema = buildObject({
  xPercentage: T.Number({ minimum: 0, maximum: 100 }),
  yPercentage: T.Number({ minimum: 0, maximum: 100 }),
  __typename: T.Literal('PortraitCropCoordinates'),
});

const PortraitCropMetadataSchema = buildObject({
  topLeft: PortraitCropCoordinatesSchema,
  bottomRight: PortraitCropCoordinatesSchema,
  __typename: T.Literal('PortraitCropMetadata'),
});

const FullTemplateMetadataSchema = buildObject({
  mainFrame: PortraitCropMetadataSchema,
  __typename: T.Literal('FullTemplateMetadata'),
});

const StackedTemplateMetadataSchema = buildObject({
  topFrame: PortraitCropMetadataSchema,
  bottomFrame: PortraitCropMetadataSchema,
  __typename: T.Literal('StackedTemplateMetadata'),
});

export const ClipAssetSchema = buildObject(
  {
    ...pick(schemas.ClipAsset, [
      'id',
      'aspectRatio',
      'type',
      'createdAt',
      'creationState',
      'thumbnailURL',
    ]),
    curator: T.Union([
      T.Null(),
      buildObject(
        pick(schemas.User, ['id', 'login', 'displayName', 'profileImageURL']),
      ),
    ]),
    videoQualities: T.Array(
      buildObject(
        pick(schemas.ClipVideoQuality, ['frameRate', 'quality', 'sourceURL']),
      ),
    ),
    portraitMetadata: T.Union([
      T.Null(),
      buildObject({
        portraitClipLayout: T.Union([T.Literal('FULL'), T.Literal('STACKED')]),
        fullTemplateMetadata: T.Union([T.Null(), FullTemplateMetadataSchema]),
        stackedTemplateMetadata: T.Union([
          T.Null(),
          StackedTemplateMetadataSchema,
        ]),
        __typename: T.Literal('PortraitClipCropping'),
      }),
    ]),
  },
  { $id: `${displayName}ClipAsset` },
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
      'isFeatured',
      'thumbnailURL',
      'createdAt',
      'isPublished',
      'durationSeconds',
      'champBadge',
      'videoOffsetSeconds',
      'isViewerEditRestricted',
    ]),
    assets: T.Array(LegacyRef(ClipAssetSchema)),
    curator: T.Union([
      T.Null(),
      buildObject(
        pick(schemas.User, ['id', 'login', 'displayName', 'profileImageURL']),
      ),
    ]),
    game: T.Union([
      T.Null(),
      buildObject(
        pick(schemas.Game, ['id', 'name', 'boxArtURL', 'displayName', 'slug']),
      ),
    ]),
    broadcast: buildObject({
      id: T.Union([T.Literal('1'), T.String({ pattern: '^[0-9]+$' })], {
        description: 'For clips from highlights or uploads it will be `"1"`',
      }),
      title: T.Null({ description: 'Seems to always be `null`' }),
      __typename: T.Literal('Broadcast'),
    }),
    broadcaster: T.Union([T.Null(), LegacyRef(BroadcasterSchema)]),
    playbackAccessToken: buildObject(
      pick(schemas.PlaybackAccessToken, ['signature', 'value']),
    ),
    video: T.Union([
      T.Null(),
      buildObject(pick(schemas.Video, ['id', 'broadcastType', 'title'])),
    ]),
    videoQualities: T.Array(
      buildObject(pick(schemas.ClipVideoQuality, ['sourceURL'])),
    ),
    suggestedCropping: T.Union([T.Null()]),
  },
  { $id: `${displayName}Clip` },
);

export const DataSchema = buildObject(
  { clip: T.Union([T.Null(), LegacyRef(ClipSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
