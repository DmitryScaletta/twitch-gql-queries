export interface BrowsePageGame {
  id: string;
  slug: string;
  displayName: string;
  name: string;
  avatarURL: string;
  viewersCount: number;
  tags: {
    id: string;
    isLanguageTag: boolean;
    localizedName: string;
    tagName: string;
    __typename: 'Tag';
  }[];
  originalReleaseDate: string | null;
  __typename: 'Game';
}

export type BrowsePageSort = 'RELEVANCE' | 'VIEWER_COUNT';

export interface BrowsePageAllDirectoriesVariables {
  limit: number;
  options: {
    recommendationsContext?: {
      platform?: null | 'web' | string;
    } | null;
    sort: BrowsePageSort;
    tags?: string[] | null;
  };
  cursor?: string | null;
}

export interface BrowsePageAllDirectoriesData {
  directoriesWithTags: {
    edges: {
      cursor: string;
      trackingID: string;
      node: BrowsePageGame;
      __typename: 'GameEdge';
    }[];
    pageInfo: {
      hasNextPage: boolean;
      __typename: 'PageInfo';
    };
    __typename: 'GameConnection';
  };
}

export interface ChannelShellUserDoesNotExist {
  userDoesNotExist: string;
  reason: 'UNKNOWN' | 'TOS_INDEFINITE' | 'TOS_TEMPORARY' | 'DMCA';
  __typename: 'UserDoesNotExist';
}

export interface ChannelShellUser {
  id: string;
  login: string;
  displayName: string;
  primaryColorHex: null | string;
  profileImageURL: string;
  bannerImageURL: string;
  stream: {
    id: string;
    viewersCount: number;
    __typename: 'Stream';
  } | null;
  channel: {
    id: string;
    self: {
      isAuthorized: boolean;
      restrictionType: null;
      __typename: 'ChannelSelfEdge';
    };
    trailer: {
      video: {
        id: string;
        self: {
          viewingHistory: null;
          __typename: 'VideoSelfEdge';
        };
        __typename: 'Video';
      } | null;
      __typename: 'Trailer';
    };
    home: {
      preferences: {
        heroPreset: string;
        __typename: 'ChannelHomePreferences';
      };
      __typename: 'ChannelHome';
    };
    __typename: 'Channel';
  };
  __typename: 'User';
}

export interface ChannelShellVariables {
  login: string;
}

export interface ChannelShellData {
  userOrError: ChannelShellUser | ChannelShellUserDoesNotExist;
}

export interface ClipsActionButtonsClip {
  id: string;
  title: string;
  broadcast: {
    id: string;
    __typename: 'Broadcast';
  };
  broadcaster: null | {
    id: string;
    login: string;
    __typename: 'User';
  };
  curator: null | {
    id: string;
    __typename: 'User';
  };
  game: null | {
    id: string;
    displayName: string;
    __typename: 'Game';
  };
  video: null | {
    id: string;
    broadcastType: 'ARCHIVE' | 'HIGHLIGHT';
    title: string;
    __typename: 'Video';
  };
  videoOffsetSeconds: null | number;
  durationSeconds: number;
  viewCount: number;
  language: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  __typename: 'Clip';
}

export interface ClipsActionButtonsVariables {
  slug: string;
}

export interface ClipsActionButtonsData {
  clip: null | ClipsActionButtonsClip;
}

export interface ClipsCardsClip {
  id: string;
  slug: string;
  url: string;
  embedURL: string;
  title: string;
  viewCount: number;
  language: string;
  curator: null | {
    id: string;
    login: string;
    displayName: string;
    __typename: 'User';
  };
  game: null | {
    id: string;
    name: string;
    boxArtURL: string;
    __typename: 'Game';
  };
  broadcaster: null | {
    id: string;
    login: string;
    displayName: string;
    profileImageURL: string;
    primaryColorHex?: null | string;
    __typename: 'User';
  };
  thumbnailURL: string;
  createdAt: string;
  isFeatured: boolean;
  durationSeconds: number;
  champBadge: null;
  __typename: 'Clip';
}

export type ClipsCardsFilter = 'LAST_DAY' | 'LAST_WEEK' | 'LAST_MONTH' | 'ALL_TIME';

export interface ClipsCardsGameVariables {
  categorySlug: string;
  limit: number;
  criteria?: {
    languages?: string[] | null;
    filter?: ClipsCardsFilter | null;
    isFeatured?: boolean | null;
  };
  cursor?: string | null;
}

export interface ClipsCardsGameData {
  game: {
    id: string;
    displayName: string;
    clips: null | {
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      edges: {
        cursor: null | string;
        node: ClipsCardsClip;
        __typename: 'ClipEdge';
      }[];
      __typename: 'ClipConnection';
    };
    __typename: 'Game';
  };
}

export interface ClipsCardsUserVariables {
  login: string;
  limit: number;
  criteria?: {
    filter?: ClipsCardsFilter | null;
    isFeatured?: boolean | null;
  };
  cursor?: string | null;
}

export interface ClipsCardsUserData {
  user: {
    id: string;
    clips: null | {
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      edges: {
        cursor: null | string;
        node: ClipsCardsClip;
        __typename: 'ClipEdge';
      }[];
      __typename: 'ClipConnection';
    };
    __typename: 'User';
  };
}

export interface ClipsDownloadButtonClip {
  id: string;
  createdAt: string;
  durationSeconds: number;
  viewCount: number;
  broadcaster: null | {
    id: string;
    __typename: 'User';
  };
  curator: null | {
    id: string;
    __typename: 'User';
  };
  game: null | {
    id: string;
    name: string;
    __typename: 'Game';
  };
  playbackAccessToken: {
    signature: string;
    value: string;
    __typename: 'PlaybackAccessToken';
  };
  videoQualities: {
    sourceURL: string;
    __typename: 'ClipVideoQuality';
  }[];
  __typename: 'Clip';
}

export interface ClipsDownloadButtonVariables {
  slug: string;
}

export interface ClipsDownloadButtonData {
  clip: null | ClipsDownloadButtonClip;
}

export interface FfzBroadcastIdUser {
  id: string;
  stream: null | {
    id: string;
    archiveVideo: null | {
      id: string;
      __typename: 'Video';
    };
    __typename: 'Stream';
  };
  __typename: 'User';
}

export interface FfzBroadcastIdVariables {
  id: string;
}

export interface FfzBroadcastIdData {
  user: null | FfzBroadcastIdUser;
}

export interface SearchResultsPageChannel {
  broadcastSettings: {
    id: string;
    title: string;
    __typename: 'BroadcastSettings';
  };
  displayName: string;
  followers: {
    totalCount: number;
    __typename: 'FollowerConnection';
  };
  id: string;
  lastBroadcast: {
    id: string;
    startedAt: string;
    __typename: 'Broadcast';
  };
  login: string;
  profileImageURL: string;
  description: null | string;
  channel: {
    id: string;
    schedule: null | {
      id: string;
      nextSegment: null | {
        id: string;
        startAt: string;
        endAt: null | string;
        title: string;
        hasReminder: boolean;
        categories: unknown[];
        __typename: 'ScheduleSegment';
      };
      __typename: 'Schedule';
    };
    __typename: 'Channel';
  };
  self: null;
  latestVideo: {
    edges: {
      node: {
        id: string;
        lengthSeconds: number;
        title: string;
        previewThumbnailURL: string;
        __typename: 'Video';
      };
      __typename: 'VideoEdge';
    }[];
    __typename: 'VideoConnection';
  };
  topClip: {
    edges: {
      node: {
        id: string;
        title: string;
        durationSeconds: number;
        thumbnailURL: string;
        slug: string;
        __typename: 'Clip';
      };
      __typename: 'ClipEdge';
    }[];
    __typename: 'ClipConnection';
  };
  roles: {
    isPartner: boolean;
    __typename: 'UserRoles';
  };
  stream: null | {
    game: null | {
      id: string;
      slug: string;
      name: string;
      displayName: string;
      __typename: 'Game';
    };
    id: string;
    previewImageURL: string;
    freeformTags: {
      id: string;
      name: string;
      __typename: 'FreeformTag';
    }[];
    type: 'live';
    viewersCount: number;
    __typename: 'Stream';
  };
  watchParty: null;
  __typename: 'User';
}

export interface SearchResultsPageGame {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  boxArtURL: string;
  tags: {
    id: string;
    isLanguageTag: boolean;
    localizedName: string;
    tagName: string;
    __typename: 'Tag';
  }[];
  viewersCount: null | number;
  __typename: 'Game';
}

export interface SearchResultsPageRelatedLiveChannel {
  id: string;
  stream: {
    id: string;
    viewersCount: number;
    previewImageURL: string;
    game: null | {
      name: string;
      id: string;
      slug: string;
      __typename: 'Game';
    };
    broadcaster: {
      id: string;
      primaryColorHex: null | string;
      login: string;
      displayName: string;
      broadcastSettings: {
        id: string;
        title: string;
        __typename: 'BroadcastSettings';
      };
      roles: {
        isPartner: boolean;
        __typename: 'UserRoles';
      };
      __typename: 'User';
    };
    __typename: 'Stream';
  };
  watchParty: unknown;
  __typename: 'User';
}

export interface SearchResultsPageVideo {
  createdAt: string;
  owner: {
    id: string;
    displayName: string;
    login: string;
    roles: {
      isPartner: boolean;
      __typename: 'UserRoles';
    };
    __typename: 'User';
  };
  id: string;
  game: null | {
    id: string;
    slug: string;
    name: string;
    displayName: string;
    __typename: 'Game';
  };
  lengthSeconds: number;
  previewThumbnailURL: string;
  title: string;
  viewCount: number;
  __typename: 'Video';
}

export interface SearchResultsPageSearchResultsVariables {
  platform?: null | 'web' | string;
  query: string;
  options?: null | {
    targets?:
      | null
      | {
          index: 'CHANNEL' | 'CHANNEL_WITH_TAG' | 'GAME' | 'VOD';
        }[];
    shouldSkipDiscoveryControl?: null | boolean;
  };
  includeIsDJ?: null | boolean;
}

export interface SearchResultsPageSearchResultsData {
  searchFor: {
    channels: {
      cursor: string;
      edges: {
        trackingID: string;
        item: SearchResultsPageChannel;
        __typename: 'SearchForEdge';
      }[];
      score: null | number;
      totalMatches: number;
      __typename: 'SearchForResultUsers';
    };
    channelsWithTag: {
      cursor: string;
      edges: {
        trackingID: string;
        item: SearchResultsPageChannel;
        __typename: 'SearchForEdge';
      }[];
      score: null | number;
      totalMatches: number;
      __typename: 'SearchForResultUsers';
    };
    games: {
      cursor: string;
      edges: {
        trackingID: string;
        item: SearchResultsPageGame;
        __typename: 'SearchForEdge';
      }[];
      score: null | number;
      totalMatches: number;
      __typename: 'SearchForResultGames';
    };
    videos: {
      cursor: string;
      edges: {
        trackingID: string;
        item: SearchResultsPageVideo;
        __typename: 'SearchForEdge';
      }[];
      score: null | number;
      totalMatches: number;
      __typename: 'SearchForResultVideos';
    };
    relatedLiveChannels: {
      edges: {
        trackingID: string;
        item: SearchResultsPageRelatedLiveChannel;
        __typename: 'SearchForEdgeRelatedLiveChannels';
      }[];
      score: null | number;
      __typename: 'SearchForResultRelatedLiveChannels';
    };
    __typename: 'SearchFor';
  };
}

export interface SearchTraySuggestionCategory {
  id: string;
  boxArtURL: string;
  game: {
    id: string;
    slug: string;
    __typename: 'Game';
  };
  __typename: 'SearchSuggestionCategory';
}

export interface SearchTraySuggestionChannel {
  id: string;
  login: string;
  profileImageURL: string;
  isLive: boolean;
  isVerified: boolean;
  user: {
    id: string;
    stream: null | {
      id: string;
      game: null | {
        id: string;
        __typename: 'Game';
      };
      __typename: 'Stream';
    };
    __typename: 'User';
  };
  __typename: 'SearchSuggestionChannel';
}

export interface SearchTraySuggestion {
  id: string;
  text: string;
  content: null | SearchTraySuggestionChannel | SearchTraySuggestionCategory;
  matchingCharacters: {
    start: number;
    end: number;
    __typename: 'SearchSuggestionHighlight';
  };
  __typename: 'SearchSuggestion';
}

export interface SearchTraySuggestions {
  edges: {
    node: SearchTraySuggestion;
    __typename: 'SearchSuggestionEdge';
  }[];
  tracking: {
    modelTrackingID: string;
    responseID: string;
    __typename: 'SearchSuggestionTracking';
  };
  __typename: 'SearchSuggestionConnection';
}

export interface SearchTraySearchSuggestionsVariables {
  queryFragment: string;
  withOfflineChannelContent?: null | boolean;
}

export interface SearchTraySearchSuggestionsData {
  searchSuggestions: SearchTraySuggestions;
}

export interface StreamMetadataUser {
  id: string;
  primaryColorHex: null | string;
  isPartner: boolean;
  profileImageURL: string;
  primaryTeam: null | {
    id: string;
    name: string;
    displayName: string;
    __typename: 'Team';
  };
  squadStream: unknown;
  channel: {
    id: string;
    chanlets: null;
    __typename: 'Channel';
  };
  lastBroadcast: {
    id: null | string;
    title: null | string;
    __typename: 'Broadcast';
  };
  stream: null | {
    id: string;
    type: 'live';
    createdAt: string;
    game: null | {
      id: string;
      slug: string;
      name: string;
      __typename: 'Game';
    };
    __typename: 'Stream';
  };
  __typename: 'User';
}

export interface StreamMetadataVariables {
  channelLogin: string;
}

export interface StreamMetadataData {
  user: StreamMetadataUser;
}

export interface UseLiveVariables {
  channelLogin: string;
}

export interface UseLiveData {
  user: null | {
    id: string;
    login: string;
    stream: null | {
      id: string;
      createdAt: string;
      __typename: 'Stream';
    };
    __typename: 'User';
  };
}

export interface UseViewCountVariables {
  channelLogin: string;
}

export interface UseViewCountData {
  user: null | {
    id: string;
    stream: null | {
      id: string;
      viewersCount: number;
      __typename: 'Stream';
    };
    __typename: 'User';
  };
}

export interface VideoAccessTokenClipVariables {
  slug: string;
}

export interface VideoAccessTokenClipData {
  clip: null | {
    id: string;
    playbackAccessToken: {
      signature: string;
      value: string;
      __typename: 'PlaybackAccessToken';
    };
    videoQualities: {
      frameRate: number;
      quality: string;
      sourceURL: string;
      __typename: 'ClipVideoQuality';
    }[];
    __typename: 'Clip';
  };
}
