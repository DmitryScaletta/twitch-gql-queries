import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'ShareClipRenderStatus';
export const displayName = name;
export const tags = ['Clips'];

export const VariablesSchema = strictObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

export const BroadcasterSchema = strictObject(
  {
    ...pick(schemas.User, [
      'id',
      'login',
      'displayName',
      'primaryColorHex',
      'profileImageURL',
    ]),
    isPartner: T.Boolean(),
    followers: strictObject(pick(schemas.FollowerConnection, ['totalCount'])),
    stream: T.Union([
      T.Null(),
      strictObject(pick(schemas.Stream, ['id', 'viewersCount'])),
    ]),
    // what if never streamed and a clip was made from an upload?
    lastBroadcast: strictObject(pick(schemas.Broadcast, ['id', 'startedAt'])),
    self: T.Union([T.Null()]),
  },
  { $id: `${displayName}Broadcaster` },
);

const PortraitCropCoordinatesSchema = strictObject({
  xPercentage: T.Number({ minimum: 0, maximum: 100 }),
  yPercentage: T.Number({ minimum: 0, maximum: 100 }),
  __typename: T.Literal('PortraitCropCoordinates'),
});

const PortraitCropMetadataSchema = strictObject({
  topLeft: PortraitCropCoordinatesSchema,
  bottomRight: PortraitCropCoordinatesSchema,
  __typename: T.Literal('PortraitCropMetadata'),
});

const FullTemplateMetadataSchema = strictObject({
  mainFrame: PortraitCropMetadataSchema,
  __typename: T.Literal('FullTemplateMetadata'),
});

const StackedTemplateMetadataSchema = strictObject({
  topFrame: PortraitCropMetadataSchema,
  bottomFrame: PortraitCropMetadataSchema,
  __typename: T.Literal('StackedTemplateMetadata'),
});

export const ClipAssetSchema = strictObject(
  {
    ...pick(schemas.ClipAsset, [
      'id',
      'aspectRatio',
      'createdAt',
      'creationState',
      'thumbnailURL',
    ]),
    curator: T.Union([
      T.Null(),
      strictObject(
        pick(schemas.User, ['id', 'login', 'displayName', 'profileImageURL']),
      ),
    ]),
    videoQualities: T.Array(
      strictObject(
        pick(schemas.ClipVideoQuality, [
          'bitrate',
          'codecs',
          'duration',
          'height',
          'width',
          'videoCodec',
          'frameRate',
          'quality',
          'sourceURL',
        ]),
      ),
    ),
    portraitMetadata: T.Union([
      T.Null(),
      strictObject({
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

export const ClipSchema = strictObject(
  {
    ...pick(schemas.Clip, [
      'id',
      'slug',
      'url',
      'isAutoCurated',
      'embedURL',
      'title',
      'viewCount',
      'language',
      'isFeatured',
      'thumbnailURL',
      'createdAt',
      'isPublished',
      'duration',
      'durationSeconds',
      'champBadge',
      'videoOffsetSeconds',
      'isViewerEditRestricted',
      'rawMediaRelativeOffset',
      'rawMediaKey',
    ]),
    assets: T.Array(TRef(ClipAssetSchema)),
    curator: T.Union([
      T.Null(),
      strictObject(
        pick(schemas.User, ['id', 'login', 'displayName', 'profileImageURL']),
      ),
    ]),
    game: T.Union([
      T.Null(),
      strictObject(
        pick(schemas.Game, ['id', 'name', 'boxArtURL', 'displayName', 'slug']),
      ),
    ]),
    broadcast: strictObject({
      id: T.Union([T.Literal('1'), T.String({ pattern: '^[0-9]+$' })], {
        description: 'For clips from highlights or uploads it will be `"1"`',
      }),
      title: T.Null({ description: 'Seems to always be `null`' }),
      __typename: T.Literal('Broadcast'),
    }),
    broadcaster: T.Union([T.Null(), TRef(BroadcasterSchema)]),
    playbackAccessToken: strictObject(
      pick(schemas.PlaybackAccessToken, ['signature', 'value']),
    ),
    video: T.Union([
      T.Null(),
      strictObject(pick(schemas.Video, ['id', 'broadcastType', 'title'])),
    ]),
    videoQualities: T.Array(
      strictObject(pick(schemas.ClipVideoQuality, ['sourceURL'])),
    ),
    suggestedCropping: T.Union([T.Null()]),
  },
  { $id: `${displayName}Clip` },
);

export const DataSchema = strictObject(
  { clip: T.Union([T.Null(), TRef(ClipSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
