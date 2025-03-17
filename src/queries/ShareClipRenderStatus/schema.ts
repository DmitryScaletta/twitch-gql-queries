import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'ShareClipRenderStatus';
const displayName = name;

export const VariablesSchema = T.Object(
  { slug: T.String() },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const BroadcasterSchema = T.Object(
  {
    id: T.String(),
    login: T.String(),
    displayName: T.String(),
    primaryColorHex: T.Union([T.Null(), T.String()]),
    isPartner: T.Boolean(),
    profileImageURL: T.String({
      /* format: 'uri' */
    }),
    followers: T.Object(
      {
        totalCount: T.Number(),
        __typename: T.Literal('FollowerConnection'),
      },
      { additionalProperties: false },
    ),
    stream: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          viewersCount: T.Number(),
          __typename: T.Literal('Stream'),
        },
        { additionalProperties: false },
      ),
    ]),
    lastBroadcast: T.Object(
      {
        id: T.String(),
        startedAt: T.String({
          /* format: 'date-time' */
        }),
        __typename: T.Literal('Broadcast'),
      },
      { additionalProperties: false },
    ),
    self: T.Union([T.Null(), T.Unknown()]),
    __typename: T.Literal('User'),
  },
  {
    $id: `${displayName}Broadcaster`,
    additionalProperties: false,
  },
);

const PortraitCropCoordinatesSchema = T.Object(
  {
    xPercentage: T.Number(),
    yPercentage: T.Number(),
    __typename: T.Literal('PortraitCropCoordinates'),
  },
  { additionalProperties: false },
);

const PortraitCropMetadataSchema = T.Object(
  {
    topLeft: PortraitCropCoordinatesSchema,
    bottomRight: PortraitCropCoordinatesSchema,
    __typename: T.Literal('PortraitCropMetadata'),
  },
  { additionalProperties: false },
);

const FullTemplateMetadataSchema = T.Object(
  {
    mainFrame: PortraitCropMetadataSchema,
    __typename: T.Literal('FullTemplateMetadata'),
  },
  { additionalProperties: false },
);

const StackedTemplateMetadataSchema = T.Object(
  {
    topFrame: PortraitCropMetadataSchema,
    bottomFrame: PortraitCropMetadataSchema,
    __typename: T.Literal('StackedTemplateMetadata'),
  },
  { additionalProperties: false },
);

export const ClipAssetSchema = T.Object(
  {
    id: T.String(),
    aspectRatio: T.Number(),
    type: T.Union([T.Literal('SOURCE'), T.Literal('RECOMPOSED')]),
    createdAt: T.String({
      /* format: 'date-time' */
    }),
    // TODO: find all possible statuses
    creationState: T.Union([T.Literal('CREATED'), T.String()]),
    curator: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          login: T.String(),
          displayName: T.String(),
          profileImageURL: T.String({
            /* format: 'uri' */
          }),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ]),
    thumbnailURL: T.String({
      /* format: 'uri' */
    }),
    videoQualities: T.Array(
      T.Object(
        {
          frameRate: T.Number(),
          quality: T.String(),
          sourceURL: T.String({
            /* format: 'uri', */
          }),
          __typename: T.Literal('ClipVideoQuality'),
        },
        { additionalProperties: false },
      ),
    ),
    portraitMetadata: T.Union([
      T.Null(),
      T.Object(
        {
          portraitClipLayout: T.Union([
            T.Literal('FULL'),
            T.Literal('STACKED'),
          ]),
          fullTemplateMetadata: T.Union([T.Null(), FullTemplateMetadataSchema]),
          stackedTemplateMetadata: T.Union([
            T.Null(),
            StackedTemplateMetadataSchema,
          ]),
          __typename: T.Literal('PortraitClipCropping'),
        },
        { additionalProperties: false },
      ),
    ]),
    __typename: T.Literal('ClipAsset'),
  },
  {
    $id: `${displayName}ClipAsset`,
    additionalProperties: false,
  },
);

export const ClipSchema = T.Object(
  {
    id: T.String(),
    slug: T.String(),
    url: T.String({
      /* format: 'uri' */
    }),
    embedURL: T.String({
      /* format: 'uri' */
    }),
    title: T.String(),
    viewCount: T.Number(),
    language: T.String(),
    isFeatured: T.Boolean(),
    assets: T.Array(LegacyRef(ClipAssetSchema)),
    curator: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          login: T.String(),
          displayName: T.String(),
          profileImageURL: T.String({
            /* format: 'uri' */
          }),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ]),
    game: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          name: T.String(),
          boxArtURL: T.String({
            /* format: 'uri' */
          }),
          displayName: T.String(),
          slug: T.String(),
          __typename: T.Literal('Game'),
        },
        { additionalProperties: false },
      ),
    ]),
    broadcast: T.Object(
      {
        id: T.String(),
        title: T.Union([T.Null(), T.String()]),
        __typename: T.Literal('Broadcast'),
      },
      { additionalProperties: false },
    ),
    broadcaster: T.Union([T.Null(), LegacyRef(BroadcasterSchema)]),
    thumbnailURL: T.String({
      /* format: 'uri' */
    }),
    createdAt: T.String({
      /* format: 'date-time' */
    }),
    isPublished: T.Boolean(),
    durationSeconds: T.Number(),
    champBadge: T.Union([T.Null(), T.Unknown()]),
    playbackAccessToken: T.Object(
      {
        signature: T.String(),
        value: T.String(),
        __typename: T.Literal('PlaybackAccessToken'),
      },
      { additionalProperties: false },
    ),
    video: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          broadcastType: T.Union([
            T.Literal('ARCHIVE'),
            T.Literal('HIGHLIGHT'),
          ]),
          title: T.String(),
          __typename: T.Literal('Video'),
        },
        { additionalProperties: false },
      ),
    ]),
    videoOffsetSeconds: T.Union([T.Null(), T.Number()]),
    videoQualities: T.Array(
      T.Object(
        {
          sourceURL: T.String({
            /* format: 'uri' */
          }),
          __typename: T.Literal('ClipVideoQuality'),
        },
        { additionalProperties: false },
      ),
    ),
    isViewerEditRestricted: T.Boolean(),
    suggestedCropping: T.Union([T.Null(), T.Unknown()]),
    __typename: T.Literal('Clip'),
  },
  {
    $id: `${displayName}Clip`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  { clip: T.Union([T.Null(), LegacyRef(ClipSchema)]) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
