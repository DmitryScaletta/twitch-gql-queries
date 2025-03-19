import { Type as T, type TProperties } from '@sinclair/typebox';

export const User = {
  id: T.String(),
  login: T.String(),
  displayName: T.String(),
  description: T.Union([T.Null(), T.String()]),
  primaryColorHex: T.Union([T.Null(), T.String()]),
  profileImageURL: T.String(),
  bannerImageURL: T.String(),
  chatColor: T.Union([T.Null(), T.String()]),
  isPartner: T.Boolean(),
  __typename: T.Literal('User'),
} satisfies TProperties;

export const UserRoles = {
  isPartner: T.Boolean(),
  isAffiliate: T.Boolean(),
  isStaff: T.Union([T.Null(), T.Boolean()]),
  isParticipatingDJ: T.Boolean(),
  __typename: T.Literal('UserRoles'),
} satisfies TProperties;

export const Channel = {
  id: T.String(),
  __typename: T.Literal('Channel'),
};

export const SocialMedia = {
  id: T.String(),
  name: T.String(),
  title: T.String(),
  url: T.String({
    // format: 'uri'
  }),
  __typename: T.Literal('SocialMedia'),
} satisfies TProperties;

export const Broadcast = {
  id: T.String(),
  title: T.String(),
  startedAt: T.String({
    /* format: 'date-time' */
  }),
  __typename: T.Literal('Broadcast'),
} satisfies TProperties;

export const Stream = {
  id: T.String(),
  title: T.String(),
  viewersCount: T.Number(),
  previewImageURL: T.String({
    // format: 'uri',
  }),
  // TODO: are there any other types?
  type: T.Literal('live'),
  __typename: T.Literal('Stream'),
} satisfies TProperties;

export const StreamEdge = {
  cursor: T.Union([T.Null(), T.String()]),
  trackingID: T.Union([T.Null(), T.String()]),
  __typename: T.Literal('StreamEdge'),
} satisfies TProperties;

export const Team = {
  id: T.String(),
  name: T.String(),
  displayName: T.String(),
  __typename: T.Literal('Team'),
} satisfies TProperties;

export const Video = {
  id: T.String(),
  title: T.String(),
  broadcastType: T.Union([T.Literal('ARCHIVE'), T.Literal('HIGHLIGHT')]),
  // TODO: find all possible statuses
  status: T.Union([T.Literal('RECORDED'), T.String()]),
  __typename: T.Literal('Video'),
} satisfies TProperties;

export const Clip = {
  id: T.String(),
  slug: T.String(),
  url: T.String({
    // format: 'uri',
  }),
  embedURL: T.String({
    // format: 'uri',
  }),
  title: T.String(),
  viewCount: T.Number(),
  videoOffsetSeconds: T.Union([T.Null(), T.Number()]),
  durationSeconds: T.Number(),
  thumbnailURL: T.String({
    // format: 'uri',
  }),
  language: T.String(),
  champBadge: T.Union([T.Null(), T.Unknown()]),
  isFeatured: T.Boolean(),
  isPublished: T.Boolean(),
  isViewerEditRestricted: T.Boolean(),
  createdAt: T.String(),
  __typename: T.Literal('Clip'),
} satisfies TProperties;

export const ClipAsset = {
  id: T.String(),
  aspectRatio: T.Number(),
  type: T.Union([T.Literal('SOURCE'), T.Literal('RECOMPOSED')]),
  createdAt: T.String({
    // format: 'date-time',
  }),
  // TODO: find all possible statuses
  creationState: T.Union([T.Literal('CREATED'), T.String()]),
  thumbnailURL: T.String({
    // format: 'uri',
  }),
  __typename: T.Literal('ClipAsset'),
} satisfies TProperties;

export const ClipVideoQuality = {
  frameRate: T.Number(),
  quality: T.String(),
  sourceURL: T.String({
    // format: 'uri',
  }),
  __typename: T.Literal('ClipVideoQuality'),
} satisfies TProperties;

export const PlaybackAccessToken = {
  signature: T.String(),
  value: T.String(),
  __typename: T.Literal('PlaybackAccessToken'),
} satisfies TProperties;

export const Game = {
  id: T.String(),
  slug: T.String(),
  displayName: T.String(),
  name: T.String(),
  avatarURL: T.String({
    // format: 'uri'
  }),
  boxArtURL: T.String({
    // format: 'uri',
  }),
  viewersCount: T.Number(),
  originalReleaseDate: T.Union([
    T.Null(),
    T.String({
      // format: 'date-time'
    }),
  ]),
  __typename: T.Literal('Game'),
} satisfies TProperties;

export const GameEdge = {
  cursor: T.String(),
  trackingID: T.Union([T.Null(), T.String()]),
  __typename: T.Literal('GameEdge'),
} satisfies TProperties;

export const Tag = {
  id: T.String(),
  isLanguageTag: T.Boolean(),
  localizedName: T.String(),
  tagName: T.String(),
  __typename: T.Literal('Tag'),
} satisfies TProperties;

export const FreeformTag = {
  id: T.String(),
  name: T.String(),
  __typename: T.Literal('FreeformTag'),
} satisfies TProperties;

export const PreviewThumbnailProperties = {
  blurReason: T.Union([T.Literal('BLUR_NOT_REQUIRED'), T.String()]),
  __typename: T.Literal('PreviewThumbnailProperties'),
} satisfies TProperties;

export const PageInfo = {
  hasNextPage: T.Boolean(),
  __typename: T.Literal('PageInfo'),
} satisfies TProperties;

export const Schedule = {
  id: T.String(),
  __typename: T.Literal('Schedule'),
} satisfies TProperties;

export const ScheduleSegment = {
  id: T.String(),
  startAt: T.String(),
  hasReminder: T.Boolean(),
  __typename: T.Literal('ScheduleSegment'),
} satisfies TProperties;

export const Message = {
  id: T.String(),
  sentAt: T.String({
    // format: 'date-time',
  }),
  __typename: T.Literal('Message'),
} satisfies TProperties;

export const MessageContent = {
  text: T.String(),
  __typename: T.Literal('MessageContent'),
} satisfies TProperties;

export const MessageFragment = {
  content: T.Union([T.Null(), T.Unknown()]),
  text: T.String(),
  __typename: T.Literal('MessageFragment'),
} satisfies TProperties;

export const PinnedChatMessage = {
  id: T.String(),
  // TODO: BROADCASTER?
  type: T.Union([T.Literal('MOD'), T.String()]),
  startsAt: T.String({
    // format: 'date-time',
  }),
  updatedAt: T.String({
    // format: 'date-time',
  }),
  endsAt: T.Union([
    T.Null(),
    T.String({
      // format: 'date-time',
    }),
  ]),
  __typename: T.Literal('PinnedChatMessage'),
} satisfies TProperties;

export const Badge = {
  id: T.String(),
  setID: T.String(),
  version: T.String(),
  title: T.String(),
  image1x: T.String({
    // format: 'uri',
  }),
  image2x: T.String({
    // format: 'uri',
  }),
  image4x: T.String({
    // format: 'uri',
  }),
  clickAction: T.Union([
    T.Null(),
    T.Literal('VISIT_URL'),
    T.Literal('SUBSCRIBE'),
    T.Literal('GET_TURBO'),
  ]),
  clickURL: T.Union([
    T.Null(),
    T.String({
      // format: 'uri',
    }),
  ]),
  __typename: T.Literal('Badge'),
} satisfies TProperties;
