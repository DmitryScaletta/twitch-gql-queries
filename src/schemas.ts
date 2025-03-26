import { Type as T, type TLiteral, type TProperties } from '@sinclair/typebox';
import { strictObject } from './schema.ts';

type Properties = TProperties & { __typename: TLiteral<string> };

export const User = {
  id: T.String({ pattern: '^[0-9]+$' }),
  login: T.String(),
  displayName: T.String(),
  description: T.Union([T.Null(), T.String()]),
  primaryColorHex: T.Union([
    T.Null(),
    T.String({ pattern: '^[0-9a-fA-F]{6}$' }),
  ]),
  profileImageURL: T.String({ format: 'uri' }),
  bannerImageURL: T.Union([T.Null(), T.String({ format: 'uri' })]),
  chatColor: T.Union([T.Null(), T.String({ pattern: '^#[0-9a-fA-F]{6}$' })]),
  isPartner: T.Boolean(),
  __typename: T.Literal('User'),
} satisfies Properties;

export const UserRoles = {
  isPartner: T.Boolean(),
  isAffiliate: T.Boolean(),
  isStaff: T.Union([T.Null(), T.Boolean()]),
  isParticipatingDJ: T.Boolean(),
  __typename: T.Literal('UserRoles'),
} satisfies Properties;

export const FollowerConnection = {
  totalCount: T.Integer({ minimum: 0 }),
  __typename: T.Literal('FollowerConnection'),
} satisfies Properties;

export const Channel = {
  id: T.String({ pattern: '^[0-9]+$' }),
  __typename: T.Literal('Channel'),
} satisfies Properties;

export const SocialMedia = {
  id: T.String({ format: 'uuid' }),
  name: T.String(),
  title: T.String(),
  url: T.String({ description: 'Can also be a `mailto:` url' }),
  __typename: T.Literal('SocialMedia'),
} satisfies Properties;

export const Broadcast = {
  id: T.String({ pattern: '^[0-9]+$' }),
  title: T.String(),
  startedAt: T.String({ format: 'date-time' }),
  __typename: T.Literal('Broadcast'),
} satisfies Properties;

export const BroadcastSettings = {
  id: T.String({ pattern: '^[0-9]+$' }),
  title: T.String(),
  __typename: T.Literal('BroadcastSettings'),
} satisfies Properties;

export const Stream = {
  id: T.String({ pattern: '^[0-9]+$' }),
  title: T.String(),
  viewersCount: T.Integer({ minimum: 0 }),
  previewImageURL: T.String({ format: 'uri' }),
  templatePreviewImageURL: T.String({ format: 'uri' }),
  type: T.Literal('live'),
  restrictionType: T.Union([T.Null()]),
  createdAt: T.String({ format: 'date-time' }),
  __typename: T.Literal('Stream'),
} satisfies Properties;

export const StreamEdge = {
  cursor: T.Union([T.Null(), T.String()]),
  trackingID: T.Union([T.Null(), T.String()]),
  __typename: T.Literal('StreamEdge'),
} satisfies Properties;

export const Team = {
  id: T.String({ pattern: '^[0-9]+$' }),
  name: T.String(),
  displayName: T.String(),
  __typename: T.Literal('Team'),
} satisfies Properties;

export const Video = {
  id: T.String({ pattern: '^[0-9]+$' }),
  title: T.Union([T.Null(), T.String()]),
  description: T.Union([T.Null(), T.String()]),
  broadcastType: T.Union([
    T.Literal('ARCHIVE'),
    T.Literal('HIGHLIGHT'),
    T.Literal('UPLOAD'),
  ]),
  lengthSeconds: T.Integer({ minimum: 0 }),
  viewCount: T.Integer({ minimum: 0 }),
  previewThumbnailURL: T.String({ format: 'uri' }),
  templatePreviewThumbnailURL: T.String({ format: 'uri' }),
  animatedPreviewURL: T.String({ format: 'uri' }),
  status: T.Union([T.Literal('RECORDED'), T.Literal('RECORDING')]),
  createdAt: T.String({ format: 'date-time' }),
  publishedAt: T.String({ format: 'date-time' }),
  __typename: T.Literal('Video'),
} satisfies Properties;

export const VideoEdge = {
  cursor: T.Union([T.Null(), T.String()]),
  __typename: T.Literal('VideoEdge'),
} satisfies Properties;

export const VideoSelfEdge = {
  isRestricted: T.Boolean(),
  viewingHistory: T.Null(),
  __typename: T.Literal('VideoSelfEdge'),
} satisfies Properties;

export const Clip = {
  id: T.String({ pattern: '^[0-9]+$' }),
  slug: T.String(),
  url: T.String({ format: 'uri' }),
  embedURL: T.String({ format: 'uri' }),
  title: T.String(),
  viewCount: T.Integer({ minimum: 0 }),
  videoOffsetSeconds: T.Union([T.Null(), T.Integer({ minimum: 0 })]),
  durationSeconds: T.Integer({ minimum: 0 }),
  thumbnailURL: T.Union([T.Literal(''), T.String({ format: 'uri' })]),
  language: T.String({
    minLength: 2,
    description: 'Possible values: `EN`, `DE`, `ASL`, `ZH_HK`',
  }),
  champBadge: T.Null(),
  isFeatured: T.Boolean(),
  isPublished: T.Boolean(),
  isViewerEditRestricted: T.Boolean(),
  createdAt: T.String({ format: 'date-time' }),
  __typename: T.Literal('Clip'),
} satisfies Properties;

export const ClipAsset = {
  id: T.String({ minLength: 1 }),
  aspectRatio: T.Number({ minimum: 0 }),
  type: T.Union([T.Literal('SOURCE'), T.Literal('RECOMPOSED')]),
  createdAt: T.String({ format: 'date-time' }),
  creationState: T.Union([T.Literal('CREATED'), T.Literal('CREATING')]),
  thumbnailURL: T.Union([T.Literal(''), T.String({ format: 'uri' })], {
    description: 'Can be `""` if it\'s not created yet',
  }),
  __typename: T.Literal('ClipAsset'),
} satisfies Properties;

export const ClipVideoQuality = {
  frameRate: T.Number({ minimum: 0 }),
  quality: T.Union([
    T.Literal('360'),
    T.Literal('480'),
    T.Literal('720'),
    T.Literal('1080'),
    T.Literal('1440'),
    T.String({ pattern: '^[0-9]+$' }),
  ]),
  sourceURL: T.Union([T.Literal(''), T.String({ format: 'uri' })], {
    description: 'Can be `""` if quality is not generated yet',
  }),
  __typename: T.Literal('ClipVideoQuality'),
} satisfies Properties;

export const PlaybackAccessToken = {
  signature: T.String(),
  value: T.String(),
  __typename: T.Literal('PlaybackAccessToken'),
} satisfies Properties;

export const PlaybackAccessTokenAuthorization = {
  isForbidden: T.Boolean(),
  forbiddenReasonCode: T.Union([T.Literal('NONE')]),
  __typename: T.Literal('PlaybackAccessTokenAuthorization'),
} satisfies Properties;

export const Game = {
  id: T.String({ pattern: '^[0-9]+$' }),
  slug: T.String(),
  displayName: T.String(),
  name: T.String(),
  avatarURL: T.String({ format: 'uri' }),
  boxArtURL: T.String({ format: 'uri' }),
  templateBoxArtURL: T.String({ format: 'uri' }),
  viewersCount: T.Union([T.Null(), T.Integer({ minimum: 0 })]),
  originalReleaseDate: T.Union([T.Null(), T.String()], {
    description:
      'Possible weird values:\n* `0001-01-01 00:00:00 +0000 UTC`\n* `2003-06-27 00:00:00 +0000 UTC`',
  }),
  __typename: T.Literal('Game'),
} satisfies Properties;

export const GameEdge = {
  cursor: T.String(),
  trackingID: T.Union([T.Null(), T.String()]),
  __typename: T.Literal('GameEdge'),
} satisfies Properties;

export const Tag = {
  id: T.String({ format: 'uuid' }),
  isLanguageTag: T.Boolean(),
  localizedName: T.String(),
  tagName: T.String(),
  __typename: T.Literal('Tag'),
} satisfies Properties;

export const FreeformTag = {
  // fft:CHANNEL:92463701:4
  id: T.String({ minLength: 1 }),
  name: T.String(),
  __typename: T.Literal('FreeformTag'),
} satisfies Properties;

export const PreviewThumbnailProperties = {
  blurReason: T.Union([
    T.Literal('BLUR_NOT_REQUIRED'),
    T.Literal('BLUR_REASON_TYPE_SEXUAL_THEMES'),
  ]),
  __typename: T.Literal('PreviewThumbnailProperties'),
} satisfies Properties;

export const PageInfo = {
  hasNextPage: T.Boolean(),
  __typename: T.Literal('PageInfo'),
} satisfies Properties;

export const Schedule = {
  // schedule-94753024
  id: T.String({ minLength: 1 }),
  __typename: T.Literal('Schedule'),
} satisfies Properties;

export const ScheduleSegment = {
  id: T.String({ minLength: 1 }),
  startAt: T.String({ format: 'date-time' }),
  endAt: T.Union([T.Null(), T.String({ format: 'date-time' })]),
  title: T.String(),
  hasReminder: T.Boolean(),
  __typename: T.Literal('ScheduleSegment'),
} satisfies Properties;

export const Message = {
  id: T.String({ format: 'uuid' }),
  sentAt: T.String({ format: 'date-time' }),
  __typename: T.Literal('Message'),
} satisfies Properties;

export const MessageContent = {
  text: T.String(),
  __typename: T.Literal('MessageContent'),
} satisfies Properties;

export const MessageFragment = {
  content: T.Union([
    T.Null(),
    strictObject({
      emoteID: T.String({ minLength: 1 }),
      __typename: T.Literal('Emote'),
    }),
    strictObject({
      userID: T.String({ pattern: '^[0-9]+$' }),
      login: T.String(),
      __typename: T.Literal('User'),
    }),
    strictObject({
      bitsAmount: T.Number(),
      prefix: T.String(),
      tier: T.Number(),
      __typename: T.Literal('CheermoteToken'),
    }),
  ]),
  text: T.String(),
  __typename: T.Literal('MessageFragment'),
} satisfies Properties;

export const PinnedChatMessage = {
  id: T.String({ format: 'uuid' }),
  type: T.Union([T.Literal('MOD')], {
    description:
      "Still `MOD` even if it's a broadcaster's message or pinned by a broadcaster",
  }),
  startsAt: T.String({ format: 'date-time' }),
  updatedAt: T.String({ format: 'date-time' }),
  endsAt: T.Union([T.Null(), T.String({ format: 'date-time' })]),
  __typename: T.Literal('PinnedChatMessage'),
} satisfies Properties;

export const Badge = {
  id: T.String({ minLength: 1 }),
  setID: T.String(),
  version: T.String(),
  title: T.String(),
  image1x: T.String({ format: 'uri' }),
  image2x: T.String({ format: 'uri' }),
  image4x: T.String({ format: 'uri' }),
  clickAction: T.Union([
    T.Null(),
    T.Literal('VISIT_URL'),
    T.Literal('SUBSCRIBE'),
    T.Literal('GET_TURBO'),
  ]),
  // Can be: "https://www.twitch.tv/directory/category/destiny-2\t"
  clickURL: T.Union([T.Null(), T.String()]),
  __typename: T.Literal('Badge'),
} satisfies Properties;
