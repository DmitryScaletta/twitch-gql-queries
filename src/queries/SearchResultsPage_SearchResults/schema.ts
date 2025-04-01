import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'SearchResultsPage_SearchResults';
export const displayName = 'SearchResultsPageSearchResults';
export const tags = ['Search'];
const category = 'SearchResultsPage';

export const VariablesSchema = strictObject(
  {
    platform: T.Optional(T.Union([T.Null(), T.Literal('web'), T.String()])),
    query: T.String(),
    options: T.Optional(
      T.Union([
        T.Null(),
        strictObject({
          targets: T.Optional(
            T.Union([
              T.Null(),
              T.Array(
                strictObject({
                  index: T.Union([
                    T.Literal('CHANNEL'),
                    T.Literal('CHANNEL_WITH_TAG'),
                    T.Literal('GAME'),
                    T.Literal('VOD'),
                  ]),
                }),
              ),
            ]),
          ),
          shouldSkipDiscoveryControl: T.Optional(
            T.Union([T.Null(), T.Boolean()]),
          ),
        }),
      ]),
    ),
    includeIsDJ: T.Boolean(),
  },
  { $id: `${displayName}Variables` },
);

// TODO: find example with watch party
const WatchPartySchema = T.Union([T.Null()]);

export const ChannelSchema = strictObject(
  {
    ...pick(schemas.User, [
      'displayName',
      'id',
      'login',
      'profileImageURL',
      'description',
    ]),
    broadcastSettings: strictObject(
      pick(schemas.BroadcastSettings, ['id', 'title']),
    ),
    followers: strictObject(pick(schemas.FollowerConnection, ['totalCount'])),
    lastBroadcast: strictObject(
      {
        id: T.Union([T.Null(), T.String({ pattern: '^[0-9]+$' })]),
        startedAt: T.Union([T.Null(), T.String({ format: 'date-time' })]),
        __typename: T.Literal('Broadcast'),
      },
      { description: 'If never streamed: `{ id: null, startedAt: null }`' },
    ),
    channel: strictObject({
      ...pick(schemas.Channel, ['id']),
      schedule: T.Union([
        T.Null(),
        strictObject({
          ...pick(schemas.Schedule, ['id']),
          nextSegment: T.Union([
            T.Null(),
            strictObject({
              ...pick(schemas.ScheduleSegment, [
                'id',
                'startAt',
                'endAt',
                'title',
                'hasReminder',
              ]),
              categories: T.Array(
                strictObject(pick(schemas.Game, ['id', 'name'])),
              ),
            }),
          ]),
        }),
      ]),
    }),
    self: T.Union([T.Null()]),
    latestVideo: strictObject({
      edges: T.Array(
        strictObject({
          node: strictObject({
            ...pick(schemas.Video, [
              'id',
              'lengthSeconds',
              'title',
              'previewThumbnailURL',
              'templatePreviewThumbnailURL',
            ]),
            previewThumbnailProperties: strictObject(
              pick(schemas.PreviewThumbnailProperties, ['blurReason']),
            ),
          }),
          __typename: T.Literal('VideoEdge'),
        }),
      ),
      __typename: T.Literal('VideoConnection'),
    }),
    topClip: strictObject({
      edges: T.Array(
        strictObject({
          node: strictObject({
            ...pick(schemas.Clip, [
              'id',
              'title',
              'durationSeconds',
              'thumbnailURL',
              'slug',
            ]),
            previewThumbnailProperties: strictObject(
              pick(schemas.PreviewThumbnailProperties, ['blurReason']),
            ),
          }),
          __typename: T.Literal('ClipEdge'),
        }),
      ),
      __typename: T.Literal('ClipConnection'),
    }),
    roles: strictObject({
      ...pick(schemas.UserRoles, ['isPartner']),
      isParticipatingDJ: T.Optional(T.Boolean()),
    }),
    stream: T.Union([
      T.Null(),
      strictObject({
        ...pick(schemas.Stream, [
          'id',
          'previewImageURL',
          'templatePreviewImageURL',
          'type',
          'viewersCount',
        ]),
        game: T.Union([
          T.Null(),
          strictObject(
            pick(schemas.Game, ['id', 'slug', 'name', 'displayName']),
          ),
        ]),
        freeformTags: T.Array(
          strictObject(pick(schemas.FreeformTag, ['id', 'name'])),
        ),
        previewThumbnailProperties: strictObject(
          pick(schemas.PreviewThumbnailProperties, ['blurReason']),
        ),
      }),
    ]),
    watchParty: WatchPartySchema,
  },
  { $id: `${category}Channel` },
);

const RelatedLiveChannelStreamSchema = strictObject({
  ...pick(schemas.Stream, [
    'id',
    'viewersCount',
    'previewImageURL',
    'templatePreviewImageURL',
  ]),
  game: T.Union([
    T.Null(),
    strictObject(pick(schemas.Game, ['name', 'id', 'slug'])),
  ]),
  broadcaster: strictObject({
    ...pick(schemas.User, ['id', 'primaryColorHex', 'login', 'displayName']),
    broadcastSettings: strictObject(
      pick(schemas.BroadcastSettings, ['id', 'title']),
    ),
    roles: strictObject({
      ...pick(schemas.UserRoles, ['isPartner']),
      isParticipatingDJ: T.Optional(T.Boolean()),
    }),
  }),
  previewThumbnailProperties: strictObject(
    pick(schemas.PreviewThumbnailProperties, ['blurReason']),
  ),
});

export const RelatedLiveChannelSchema = strictObject(
  {
    ...pick(schemas.User, ['id']),
    stream: T.Union([T.Null(), RelatedLiveChannelStreamSchema]),
    watchParty: WatchPartySchema,
  },
  { $id: `${category}RelatedLiveChannel` },
);

export const GameSchema = strictObject(
  {
    ...pick(schemas.Game, [
      'id',
      'slug',
      'name',
      'displayName',
      'boxArtURL',
      'templateBoxArtURL',
      'viewersCount',
    ]),
    tags: T.Array(
      strictObject(
        pick(schemas.Tag, ['id', 'isLanguageTag', 'localizedName', 'tagName']),
      ),
    ),
  },
  { $id: `${category}Game` },
);

export const VideoSchema = strictObject(
  {
    ...pick(schemas.Video, [
      'createdAt',
      'id',
      'lengthSeconds',
      'previewThumbnailURL',
      'templatePreviewThumbnailURL',
      'title',
      'viewCount',
    ]),
    owner: strictObject({
      ...pick(schemas.User, ['id', 'displayName', 'login']),
      roles: strictObject(pick(schemas.UserRoles, ['isPartner'])),
    }),
    game: T.Union([
      T.Null(),
      strictObject(pick(schemas.Game, ['id', 'slug', 'name', 'displayName'])),
    ]),
    previewThumbnailProperties: strictObject(
      pick(schemas.PreviewThumbnailProperties, ['blurReason']),
    ),
  },
  { $id: `${category}Video` },
);

const SearchForResultUsers = strictObject({
  cursor: T.String(),
  edges: T.Array(
    strictObject({
      trackingID: T.String(),
      item: LegacyRef(ChannelSchema),
      __typename: T.Literal('SearchForEdge'),
    }),
  ),
  score: T.Union([T.Null(), T.Integer()]),
  totalMatches: T.Integer({ minimum: 0 }),
  __typename: T.Literal('SearchForResultUsers'),
});

const SearchForSchema = strictObject({
  banners: T.Union([T.Null(), T.Literal('DISCOVERY_PREFERENCE')]),
  channels: SearchForResultUsers,
  channelsWithTag: SearchForResultUsers,
  games: strictObject({
    cursor: T.String(),
    edges: T.Array(
      strictObject({
        trackingID: T.String(),
        item: LegacyRef(GameSchema),
        __typename: T.Literal('SearchForEdge'),
      }),
    ),
    score: T.Union([T.Null(), T.Integer()]),
    totalMatches: T.Integer({ minimum: 0 }),
    __typename: T.Literal('SearchForResultGames'),
  }),
  videos: strictObject({
    cursor: T.String(),
    edges: T.Array(
      strictObject({
        trackingID: T.String(),
        item: LegacyRef(VideoSchema),
        __typename: T.Literal('SearchForEdge'),
      }),
    ),
    score: T.Union([T.Null(), T.Integer()]),
    totalMatches: T.Integer({ minimum: 0 }),
    __typename: T.Literal('SearchForResultVideos'),
  }),
  relatedLiveChannels: strictObject({
    edges: T.Array(
      strictObject({
        trackingID: T.String(),
        item: LegacyRef(RelatedLiveChannelSchema),
        __typename: T.Literal('SearchForEdgeRelatedLiveChannels'),
      }),
    ),
    score: T.Union([T.Null(), T.Integer()]),
    __typename: T.Literal('SearchForResultRelatedLiveChannels'),
  }),
  __typename: T.Literal('SearchFor'),
});

export const DataSchema = strictObject(
  { searchFor: SearchForSchema },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
