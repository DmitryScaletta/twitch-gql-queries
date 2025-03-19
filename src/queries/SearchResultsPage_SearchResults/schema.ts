import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'SearchResultsPage_SearchResults';
const category = 'SearchResultsPage';
const displayName = 'SearchResultsPageSearchResults';

export const VariablesSchema = buildObject(
  {
    platform: T.Optional(T.Union([T.Null(), T.Literal('web'), T.String()])),
    query: T.String(),
    options: T.Optional(
      T.Union([
        T.Null(),
        buildObject({
          targets: T.Optional(
            T.Union([
              T.Null(),
              T.Array(
                buildObject({
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
    includeIsDJ: T.Optional(T.Union([T.Null(), T.Boolean()])),
  },
  { $id: `${displayName}Variables` },
);

// TODO: find example with watch party
const WatchPartySchema = T.Union([T.Null(), T.Unknown()]);

export const ChannelSchema = buildObject(
  {
    ...pick(schemas.User, [
      'displayName',
      'id',
      'login',
      'profileImageURL',
      'description',
    ]),
    broadcastSettings: buildObject(
      pick(schemas.BroadcastSettings, ['id', 'title']),
    ),
    followers: buildObject(pick(schemas.FollowerConnection, ['totalCount'])),
    // don't use Broadcast schema
    // if no last broadcast the response is: { id: null, startedAt: null }
    lastBroadcast: buildObject({
      id: T.Union([T.Null(), T.String()]),
      startedAt: T.Union([
        T.Null(),
        T.String({
          // format: 'date-time',
        }),
      ]),
      __typename: T.Literal('Broadcast'),
    }),
    channel: buildObject({
      ...pick(schemas.Channel, ['id']),
      schedule: T.Union([
        T.Null(),
        buildObject({
          ...pick(schemas.Schedule, ['id']),
          nextSegment: T.Union([
            T.Null(),
            buildObject(
              pick(schemas.ScheduleSegment, [
                'id',
                'startAt',
                'endAt',
                'title',
                'hasReminder',
                'categories',
              ]),
            ),
          ]),
        }),
      ]),
    }),
    self: T.Union([T.Null(), T.Unknown()]),
    latestVideo: buildObject({
      edges: T.Array(
        buildObject({
          node: buildObject(
            pick(schemas.Video, [
              'id',
              'lengthSeconds',
              'title',
              'previewThumbnailURL',
            ]),
          ),
          __typename: T.Literal('VideoEdge'),
        }),
      ),
      __typename: T.Literal('VideoConnection'),
    }),
    topClip: buildObject({
      edges: T.Array(
        buildObject({
          node: buildObject(
            pick(schemas.Clip, [
              'id',
              'title',
              'durationSeconds',
              'thumbnailURL',
              'slug',
            ]),
          ),
          __typename: T.Literal('ClipEdge'),
        }),
      ),
      __typename: T.Literal('ClipConnection'),
    }),
    roles: buildObject(pick(schemas.UserRoles, ['isPartner'])),
    stream: T.Union([
      T.Null(),
      buildObject({
        ...pick(schemas.Stream, [
          'id',
          'previewImageURL',
          'type',
          'viewersCount',
        ]),
        game: T.Union([
          T.Null(),
          buildObject(
            pick(schemas.Game, ['id', 'slug', 'name', 'displayName']),
          ),
        ]),
        freeformTags: T.Array(
          buildObject(pick(schemas.FreeformTag, ['id', 'name'])),
        ),
      }),
    ]),
    watchParty: WatchPartySchema,
  },
  { $id: `${category}Channel` },
);

export const RelatedLiveChannelSchema = buildObject(
  {
    ...pick(schemas.User, ['id']),
    stream: buildObject({
      ...pick(schemas.Stream, ['id', 'viewersCount', 'previewImageURL']),
      game: T.Union([
        T.Null(),
        buildObject(pick(schemas.Game, ['name', 'id', 'slug'])),
      ]),
      broadcaster: buildObject({
        ...pick(schemas.User, [
          'id',
          'primaryColorHex',
          'login',
          'displayName',
        ]),
        broadcastSettings: buildObject(
          pick(schemas.BroadcastSettings, ['id', 'title']),
        ),
        roles: buildObject(pick(schemas.UserRoles, ['isPartner'])),
      }),
    }),
    watchParty: WatchPartySchema,
  },
  { $id: `${category}RelatedLiveChannel` },
);

export const GameSchema = buildObject(
  {
    ...pick(schemas.Game, [
      'id',
      'slug',
      'name',
      'displayName',
      'boxArtURL',
      'viewersCount',
    ]),
    tags: T.Array(
      buildObject(
        pick(schemas.Tag, ['id', 'isLanguageTag', 'localizedName', 'tagName']),
      ),
    ),
  },
  { $id: `${category}Game` },
);

export const VideoSchema = buildObject(
  {
    ...pick(schemas.Video, [
      'createdAt',
      'id',
      'lengthSeconds',
      'previewThumbnailURL',
      'title',
      'viewCount',
    ]),
    owner: buildObject({
      ...pick(schemas.User, ['id', 'displayName', 'login']),
      roles: buildObject(pick(schemas.UserRoles, ['isPartner'])),
    }),
    game: T.Union([
      T.Null(),
      buildObject(pick(schemas.Game, ['id', 'slug', 'name', 'displayName'])),
    ]),
  },
  { $id: `${category}Video` },
);

const SearchForSchema = buildObject({
  channels: buildObject({
    cursor: T.String(),
    edges: T.Array(
      buildObject({
        trackingID: T.String(),
        item: LegacyRef(ChannelSchema),
        __typename: T.Literal('SearchForEdge'),
      }),
    ),
    score: T.Union([T.Null(), T.Number()]),
    totalMatches: T.Number(),
    __typename: T.Literal('SearchForResultUsers'),
  }),
  channelsWithTag: buildObject({
    cursor: T.String(),
    edges: T.Array(
      buildObject({
        trackingID: T.String(),
        item: LegacyRef(ChannelSchema),
        __typename: T.Literal('SearchForEdge'),
      }),
    ),
    score: T.Union([T.Null(), T.Number()]),
    totalMatches: T.Number(),
    __typename: T.Literal('SearchForResultUsers'),
  }),
  games: buildObject({
    cursor: T.String(),
    edges: T.Array(
      buildObject({
        trackingID: T.String(),
        item: LegacyRef(GameSchema),
        __typename: T.Literal('SearchForEdge'),
      }),
    ),
    score: T.Union([T.Null(), T.Number()]),
    totalMatches: T.Number(),
    __typename: T.Literal('SearchForResultGames'),
  }),
  videos: buildObject({
    cursor: T.String(),
    edges: T.Array(
      buildObject({
        trackingID: T.String(),
        item: LegacyRef(VideoSchema),
        __typename: T.Literal('SearchForEdge'),
      }),
    ),
    score: T.Union([T.Null(), T.Number()]),
    totalMatches: T.Number(),
    __typename: T.Literal('SearchForResultVideos'),
  }),
  relatedLiveChannels: buildObject({
    edges: T.Array(
      buildObject({
        trackingID: T.String(),
        item: LegacyRef(RelatedLiveChannelSchema),
        __typename: T.Literal('SearchForEdgeRelatedLiveChannels'),
      }),
    ),
    score: T.Union([T.Null(), T.Number()]),
    __typename: T.Literal('SearchForResultRelatedLiveChannels'),
  }),
  __typename: T.Literal('SearchFor'),
});

export const DataSchema = buildObject(
  { searchFor: SearchForSchema },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
