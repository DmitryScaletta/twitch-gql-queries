import { Type as T, type TLiteral, type TProperties } from '@sinclair/typebox';
import { buildObject } from './schema.ts';

type Properties = TProperties & { __typename: TLiteral<string> };

export const User = {
  id: T.String(),
  login: T.String(),
  displayName: T.String(),
  description: T.Union([T.Null(), T.String()]),
  primaryColorHex: T.Union([T.Null(), T.String()]),
  profileImageURL: T.String(),
  bannerImageURL: T.Union([T.Null(), T.String()]),
  chatColor: T.Union([T.Null(), T.String()]),
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
  totalCount: T.Number(),
  __typename: T.Literal('FollowerConnection'),
} satisfies Properties;

export const Channel = {
  id: T.String(),
  __typename: T.Literal('Channel'),
} satisfies Properties;

export const SocialMedia = {
  id: T.String(),
  name: T.String(),
  title: T.String(),
  url: T.String({ description: 'Can also be a `mailto:` url' }),
  __typename: T.Literal('SocialMedia'),
} satisfies Properties;

export const Broadcast = {
  id: T.String(),
  title: T.String(),
  startedAt: T.String({ format: 'date-time' }),
  __typename: T.Literal('Broadcast'),
} satisfies Properties;

export const BroadcastSettings = {
  id: T.String(),
  title: T.String(),
  __typename: T.Literal('BroadcastSettings'),
} satisfies Properties;

export const Stream = {
  id: T.String(),
  title: T.String(),
  viewersCount: T.Number(),
  previewImageURL: T.String({ format: 'uri' }),
  // TODO: are there any other types?
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
  id: T.String(),
  name: T.String(),
  displayName: T.String(),
  __typename: T.Literal('Team'),
} satisfies Properties;

export const Video = {
  id: T.String(),
  title: T.Union([T.Null(), T.String()]),
  description: T.Union([T.Null(), T.String()]),
  broadcastType: T.Union([
    T.Literal('ARCHIVE'),
    T.Literal('HIGHLIGHT'),
    T.Literal('UPLOAD'),
  ]),
  lengthSeconds: T.Number(),
  viewCount: T.Number(),
  previewThumbnailURL: T.String({ format: 'uri' }),
  animatedPreviewURL: T.String({ format: 'uri' }),
  // TODO: find all possible statuses
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
  id: T.String(),
  slug: T.String(),
  url: T.String({ format: 'uri' }),
  embedURL: T.String({ format: 'uri' }),
  title: T.String(),
  viewCount: T.Number(),
  videoOffsetSeconds: T.Union([T.Null(), T.Number()]),
  durationSeconds: T.Number(),
  thumbnailURL: T.String({ format: 'uri' }),
  language: T.String(),
  champBadge: T.Null(),
  isFeatured: T.Boolean(),
  isPublished: T.Boolean(),
  isViewerEditRestricted: T.Boolean(),
  createdAt: T.String(),
  __typename: T.Literal('Clip'),
} satisfies Properties;

export const ClipAsset = {
  id: T.String(),
  aspectRatio: T.Number(),
  type: T.Union([T.Literal('SOURCE'), T.Literal('RECOMPOSED')]),
  createdAt: T.String({ format: 'date-time' }),
  creationState: T.Union([T.Literal('CREATED'), T.Literal('CREATING')]),
  thumbnailURL: T.Union([T.Literal(''), T.String({ format: 'uri' })], {
    description: 'Can be `""` if it\'s not created yet',
  }),
  __typename: T.Literal('ClipAsset'),
} satisfies Properties;

export const ClipVideoQuality = {
  frameRate: T.Number(),
  quality: T.String(),
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
  id: T.String(),
  slug: T.String(),
  displayName: T.String(),
  name: T.String(),
  avatarURL: T.String({ format: 'uri' }),
  boxArtURL: T.String({ format: 'uri' }),
  viewersCount: T.Union([T.Null(), T.Number()]),
  originalReleaseDate: T.Union([T.Null(), T.String({ format: 'date-time' })]),
  __typename: T.Literal('Game'),
} satisfies Properties;

export const GameEdge = {
  cursor: T.String(),
  trackingID: T.Union([T.Null(), T.String()]),
  __typename: T.Literal('GameEdge'),
} satisfies Properties;

export const Tag = {
  id: T.String(),
  isLanguageTag: T.Boolean(),
  localizedName: T.String(),
  tagName: T.String(),
  __typename: T.Literal('Tag'),
} satisfies Properties;

export const FreeformTag = {
  id: T.String(),
  name: T.String(),
  __typename: T.Literal('FreeformTag'),
} satisfies Properties;

export const PreviewThumbnailProperties = {
  blurReason: T.Union([T.Literal('BLUR_NOT_REQUIRED')]),
  __typename: T.Literal('PreviewThumbnailProperties'),
} satisfies Properties;

export const PageInfo = {
  hasNextPage: T.Boolean(),
  __typename: T.Literal('PageInfo'),
} satisfies Properties;

export const Schedule = {
  id: T.String(),
  __typename: T.Literal('Schedule'),
} satisfies Properties;

export const ScheduleSegment = {
  id: T.String(),
  startAt: T.String(),
  endAt: T.Union([T.Null(), T.String({ format: 'date-time' })]),
  title: T.String(),
  hasReminder: T.Boolean(),
  __typename: T.Literal('ScheduleSegment'),
} satisfies Properties;

export const Message = {
  id: T.String(),
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
    buildObject({
      emoteID: T.String(),
      __typename: T.Literal('Emote'),
    }),
    buildObject({
      userID: T.String(),
      login: T.String(),
      __typename: T.Literal('User'),
    }),
    buildObject({
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
  id: T.String(),
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
  id: T.String(),
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
