import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'SearchResultsPage_SearchResults';
const category = 'SearchResultsPage';
const displayName = 'SearchResultsPageSearchResults';

export const VariablesSchema = T.Object(
  {
    platform: T.Optional(T.Union([T.Null(), T.Literal('web'), T.String()])),
    query: T.String(),
    options: T.Optional(
      T.Union([
        T.Null(),
        T.Object(
          {
            targets: T.Optional(
              T.Union([
                T.Null(),
                T.Array(
                  T.Object(
                    {
                      index: T.Union([
                        T.Literal('CHANNEL'),
                        T.Literal('CHANNEL_WITH_TAG'),
                        T.Literal('GAME'),
                        T.Literal('VOD'),
                      ]),
                    },
                    { additionalProperties: false },
                  ),
                ),
              ]),
            ),
            shouldSkipDiscoveryControl: T.Optional(
              T.Union([T.Null(), T.Boolean()]),
            ),
          },
          { additionalProperties: false },
        ),
      ]),
    ),
    includeIsDJ: T.Optional(T.Union([T.Null(), T.Boolean()])),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const ChannelSchema = T.Object(
  {
    broadcastSettings: T.Object(
      {
        id: T.String(),
        title: T.String(),
        __typename: T.Literal('BroadcastSettings'),
      },
      { additionalProperties: false },
    ),
    displayName: T.String(),
    followers: T.Object(
      {
        totalCount: T.Number(),
        __typename: T.Literal('FollowerConnection'),
      },
      { additionalProperties: false },
    ),
    id: T.String(),
    lastBroadcast: T.Object(
      {
        id: T.String(),
        startedAt: T.String({
          // format: 'date-time',
        }),
        __typename: T.Literal('Broadcast'),
      },
      { additionalProperties: false },
    ),
    login: T.String(),
    profileImageURL: T.String(),
    description: T.Union([T.Null(), T.String()]),
    channel: T.Object(
      {
        id: T.String(),
        schedule: T.Union([
          T.Null(),
          T.Object(
            {
              id: T.String(),
              nextSegment: T.Union([
                T.Null(),
                T.Object(
                  {
                    id: T.String(),
                    startAt: T.String({
                      // format: 'date-time',
                    }),
                    endAt: T.Union([
                      T.Null(),
                      T.String({
                        // format: 'date-time',
                      }),
                    ]),
                    title: T.String(),
                    hasReminder: T.Boolean(),
                    // TODO: add schedule categories
                    categories: T.Array(T.Unknown()),
                    __typename: T.Literal('ScheduleSegment'),
                  },
                  { additionalProperties: false },
                ),
              ]),
              __typename: T.Literal('Schedule'),
            },
            { additionalProperties: false },
          ),
        ]),
        __typename: T.Literal('Channel'),
      },
      { additionalProperties: false },
    ),
    self: T.Null(),
    latestVideo: T.Object(
      {
        edges: T.Array(
          T.Object(
            {
              node: T.Object(
                {
                  id: T.String(),
                  lengthSeconds: T.Number(),
                  title: T.String(),
                  previewThumbnailURL: T.String({
                    /* format: 'uri' */
                  }),
                  __typename: T.Literal('Video'),
                },
                { additionalProperties: false },
              ),
              __typename: T.Literal('VideoEdge'),
            },
            { additionalProperties: false },
          ),
        ),
        __typename: T.Literal('VideoConnection'),
      },
      { additionalProperties: false },
    ),
    topClip: T.Object(
      {
        edges: T.Array(
          T.Object(
            {
              node: T.Object(
                {
                  id: T.String(),
                  title: T.String(),
                  durationSeconds: T.Number(),
                  thumbnailURL: T.String({
                    /* format: 'uri' */
                  }),
                  slug: T.String(),
                  __typename: T.Literal('Clip'),
                },
                { additionalProperties: false },
              ),
              __typename: T.Literal('ClipEdge'),
            },
            { additionalProperties: false },
          ),
        ),
        __typename: T.Literal('ClipConnection'),
      },
      { additionalProperties: false },
    ),
    roles: T.Object(
      {
        isPartner: T.Boolean(),
        __typename: T.Literal('UserRoles'),
      },
      { additionalProperties: false },
    ),
    stream: T.Union([
      T.Null(),
      T.Object(
        {
          game: T.Union([
            T.Null(),
            T.Object({
              id: T.String(),
              slug: T.String(),
              name: T.String(),
              displayName: T.String(),
              __typename: T.Literal('Game'),
            }),
          ]),
          id: T.String(),
          previewImageURL: T.String({
            /* format: 'uri' */
          }),
          freeformTags: T.Array(
            T.Object(
              {
                id: T.String(),
                name: T.String(),
                __typename: T.Literal('FreeformTag'),
              },
              { additionalProperties: false },
            ),
          ),
          type: T.Literal('live'),
          viewersCount: T.Number(),
          __typename: T.Literal('Stream'),
        },
        { additionalProperties: false },
      ),
    ]),
    // TODO: find example with watch party
    watchParty: T.Null(),
    __typename: T.Literal('User'),
  },
  {
    $id: `${category}Channel`,
    additionalProperties: false,
  },
);

export const RelatedLiveChannelSchema = T.Object(
  {
    id: T.String(),
    stream: T.Object(
      {
        id: T.String(),
        viewersCount: T.Number(),
        previewImageURL: T.String({
          /* format: 'uri' */
        }),
        game: T.Union([
          T.Null(),
          T.Object(
            {
              name: T.String(),
              id: T.String(),
              slug: T.String(),
              __typename: T.Literal('Game'),
            },
            { additionalProperties: false },
          ),
        ]),
        broadcaster: T.Object(
          {
            id: T.String(),
            primaryColorHex: T.Union([T.Null(), T.String()]),
            login: T.String(),
            displayName: T.String(),
            broadcastSettings: T.Object(
              {
                id: T.String(),
                title: T.String(),
                __typename: T.Literal('BroadcastSettings'),
              },
              { additionalProperties: false },
            ),
            roles: T.Object(
              {
                isPartner: T.Boolean(),
                __typename: T.Literal('UserRoles'),
              },
              { additionalProperties: false },
            ),
            __typename: T.Literal('User'),
          },
          { additionalProperties: false },
        ),
        __typename: T.Literal('Stream'),
      },
      { additionalProperties: false },
    ),
    // TODO: find example with watch party
    watchParty: T.Unknown(),
    __typename: T.Literal('User'),
  },
  {
    $id: `${category}RelatedLiveChannel`,
    additionalProperties: false,
  },
);

export const GameSchema = T.Object(
  {
    id: T.String(),
    slug: T.String(),
    name: T.String(),
    displayName: T.String(),
    boxArtURL: T.String({
      /* format: 'uri' */
    }),
    tags: T.Array(
      T.Object(
        {
          id: T.String(),
          isLanguageTag: T.Boolean(),
          localizedName: T.String(),
          tagName: T.String(),
          __typename: T.Literal('Tag'),
        },
        { additionalProperties: false },
      ),
    ),
    viewersCount: T.Union([T.Null(), T.Number()]),
    __typename: T.Literal('Game'),
  },
  {
    $id: `${category}Game`,
    additionalProperties: false,
  },
);

export const VideoSchema = T.Object(
  {
    createdAt: T.String({
      // format: 'date-time',
    }),
    owner: T.Object(
      {
        id: T.String(),
        displayName: T.String(),
        login: T.String(),
        roles: T.Object(
          {
            isPartner: T.Boolean(),
            __typename: T.Literal('UserRoles'),
          },
          { additionalProperties: false },
        ),
        __typename: T.Literal('User'),
      },
      { additionalProperties: false },
    ),
    id: T.String(),
    game: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          slug: T.String(),
          name: T.String(),
          displayName: T.String(),
          __typename: T.Literal('Game'),
        },
        { additionalProperties: false },
      ),
    ]),
    lengthSeconds: T.Number(),
    previewThumbnailURL: T.String({
      /* format: 'uri' */
    }),
    title: T.String(),
    viewCount: T.Number(),
    __typename: T.Literal('Video'),
  },
  {
    $id: `${category}Video`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    searchFor: T.Object(
      {
        channels: T.Object(
          {
            cursor: T.String(),
            edges: T.Array(
              T.Object(
                {
                  trackingID: T.String(),
                  item: LegacyRef(ChannelSchema),
                  __typename: T.Literal('SearchForEdge'),
                },
                { additionalProperties: false },
              ),
            ),
            score: T.Union([T.Null(), T.Number()]),
            totalMatches: T.Number(),
            __typename: T.Literal('SearchForResultUsers'),
          },
          { additionalProperties: false },
        ),
        channelsWithTag: T.Object(
          {
            cursor: T.String(),
            edges: T.Array(
              T.Object(
                {
                  trackingID: T.String(),
                  item: LegacyRef(ChannelSchema),
                  __typename: T.Literal('SearchForEdge'),
                },
                { additionalProperties: false },
              ),
            ),
            score: T.Union([T.Null(), T.Number()]),
            totalMatches: T.Number(),
            __typename: T.Literal('SearchForResultUsers'),
          },
          { additionalProperties: false },
        ),
        games: T.Object(
          {
            cursor: T.String(),
            edges: T.Array(
              T.Object(
                {
                  trackingID: T.String(),
                  item: LegacyRef(GameSchema),
                  __typename: T.Literal('SearchForEdge'),
                },
                { additionalProperties: false },
              ),
            ),
            score: T.Union([T.Null(), T.Number()]),
            totalMatches: T.Number(),
            __typename: T.Literal('SearchForResultGames'),
          },
          { additionalProperties: false },
        ),
        videos: T.Object(
          {
            cursor: T.String(),
            edges: T.Array(
              T.Object(
                {
                  trackingID: T.String(),
                  item: LegacyRef(VideoSchema),
                  __typename: T.Literal('SearchForEdge'),
                },
                { additionalProperties: false },
              ),
            ),
            score: T.Union([T.Null(), T.Number()]),
            totalMatches: T.Number(),
            __typename: T.Literal('SearchForResultVideos'),
          },
          { additionalProperties: false },
        ),
        relatedLiveChannels: T.Object(
          {
            edges: T.Array(
              T.Object(
                {
                  trackingID: T.String(),
                  item: LegacyRef(RelatedLiveChannelSchema),
                  __typename: T.Literal('SearchForEdgeRelatedLiveChannels'),
                },
                { additionalProperties: false },
              ),
            ),
            score: T.Union([T.Null(), T.Number()]),
            __typename: T.Literal('SearchForResultRelatedLiveChannels'),
          },
          { additionalProperties: false },
        ),
        __typename: T.Literal('SearchFor'),
      },
      { additionalProperties: false },
    ),
  },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
