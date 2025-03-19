import type { QueryResponse } from '../types.ts';

export interface BrowsePageGame {
  id: string;
  slug: string;
  displayName: string;
  name: string;
  avatarURL: string;
  viewersCount: null | number;
  originalReleaseDate: null | string;
  tags: {
    id: string;
    isLanguageTag: boolean;
    localizedName: string;
    tagName: string;
    __typename: 'Tag';
  }[];
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
  directoriesWithTags: null | {
    edges: {
      cursor: string;
      trackingID: null | string;
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

export interface ChannelRootUser {
  id: string;
  description: null | string;
  displayName: string;
  primaryColorHex: null | string;
  profileImageURL: string;
  followers: {
    totalCount: number;
    __typename: 'FollowerConnection';
  };
  roles: {
    isPartner: boolean;
    isAffiliate: boolean;
    isStaff: null | boolean;
    isParticipatingDJ?: boolean;
    __typename: 'UserRoles';
  };
  channel: {
    id: string;
    socialMedias:
      | null
      | {
          id: string;
          name: string;
          title: string;
          url: string;
          __typename: 'SocialMedia';
        }[];
    schedule?: null | {
      id: string;
      nextSegment: null | {
        id: string;
        startAt: string;
        hasReminder: boolean;
        __typename: 'ScheduleSegment';
      };
      __typename: 'Schedule';
    };
    __typename: 'Channel';
  };
  lastBroadcast: {
    id: null | string;
    game: null | {
      id: string;
      displayName: string;
      __typename: 'Game';
    };
    __typename: 'Broadcast';
  };
  primaryTeam: null | {
    id: string;
    name: string;
    displayName: string;
    __typename: 'Team';
  };
  videos: {
    edges: {
      node: {
        id: string;
        status: 'RECORDED' | string;
        game: null | {
          id: string;
          displayName: string;
          __typename: 'Game';
        };
        __typename: 'Video';
      };
      __typename: 'VideoEdge';
    }[];
    __typename: 'VideoConnection';
  };
  __typename: 'User';
}

export interface ChannelRootAboutPanelVariables {
  channelLogin: string;
  skipSchedule: boolean;
  includeIsDJ: boolean;
}

export interface ChannelRootAboutPanelData {
  currentUser: unknown;
  user: null | ChannelRootUser;
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
  bannerImageURL: null | string;
  stream: null | {
    id: string;
    viewersCount: number;
    __typename: 'Stream';
  };
  channel: {
    id: string;
    self: {
      isAuthorized: boolean;
      restrictionType: null;
      __typename: 'ChannelSelfEdge';
    };
    trailer: {
      video: null | {
        id: string;
        self: {
          viewingHistory: null;
          __typename: 'VideoSelfEdge';
        };
        __typename: 'Video';
      };
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
  videoOffsetSeconds: null | number;
  durationSeconds: number;
  viewCount: number;
  language: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
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
  __typename: 'Clip';
}

export interface ClipsActionButtonsVariables {
  slug: string;
}

export interface ClipsActionButtonsData {
  clip: null | ClipsActionButtonsClip;
}

export interface ClipsCardsGameClip {
  id: string;
  slug: string;
  title: string;
  viewCount: number;
  thumbnailURL: string;
  createdAt: string;
  durationSeconds: number;
  isFeatured: boolean;
  curator: null | {
    id: string;
    login: string;
    displayName: string;
    __typename: 'User';
  };
  game: null | {
    id: string;
    slug: string;
    name: string;
    boxArtURL: string;
    __typename: 'Game';
  };
  broadcaster: null | {
    id: string;
    login: string;
    displayName: string;
    profileImageURL: string;
    primaryColorHex: null | string;
    roles: {
      isPartner: boolean;
      __typename: 'UserRoles';
    };
    __typename: 'User';
  };
  guestStarParticipants: null | {
    guests: {
      id: string;
      login: string;
      displayName: string;
      profileImageURL: string;
      primaryColorHex: null | string;
      description: null | string;
      __typename: 'User';
    }[];
    sessionIdentifier: string;
    __typename: 'GuestStarParticipants';
  };
  previewThumbnailProperties: {
    blurReason: 'BLUR_NOT_REQUIRED' | string;
    __typename: 'PreviewThumbnailProperties';
  };
  __typename: 'Clip';
}

export type ClipsCardsFilter = 'LAST_DAY' | 'LAST_WEEK' | 'LAST_MONTH' | 'ALL_TIME';

export interface ClipsCardsGameVariables {
  categorySlug: string;
  limit: number;
  criteria?: {
    languages?: string[] | null;
    filter?: ClipsCardsFilter | null;
    shouldFilterByDiscoverySetting?: boolean | null;
  };
  cursor?: string | null;
}

export interface ClipsCardsGameData {
  game: null | {
    id: string;
    name: string;
    displayName: string;
    clips: null | {
      banners: null | ('MAY_CONTAIN_MATURE_CONTENT' | string)[];
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      edges: {
        cursor: null | string;
        node: ClipsCardsGameClip;
        __typename: 'ClipEdge';
      }[];
      __typename: 'ClipConnection';
    };
    __typename: 'Game';
  };
}

export interface ClipsCardsUserClip {
  id: string;
  slug: string;
  url: string;
  embedURL: string;
  title: string;
  viewCount: number;
  language: string;
  thumbnailURL: string;
  createdAt: string;
  durationSeconds: number;
  champBadge: unknown;
  isFeatured: boolean;
  curator: null | {
    id: string;
    login: string;
    displayName: string;
    __typename: 'User';
  };
  game: null | {
    id: string;
    slug: string;
    name: string;
    boxArtURL: string;
    __typename: 'Game';
  };
  broadcaster: null | {
    id: string;
    login: string;
    displayName: string;
    profileImageURL: string;
    primaryColorHex: null | string;
    roles: {
      isPartner: boolean;
      __typename: 'UserRoles';
    };
    __typename: 'User';
  };
  guestStarParticipants: null | {
    guests: {
      id: string;
      login: string;
      displayName: string;
      profileImageURL: string;
      primaryColorHex: null | string;
      description: null | string;
      __typename: 'User';
    }[];
    sessionIdentifier: string;
    __typename: 'GuestStarParticipants';
  };
  __typename: 'Clip';
}

export interface ClipsCardsUserVariables {
  login: string;
  limit: number;
  criteria?: {
    filter?: ClipsCardsFilter | null;
    shouldFilterByDiscoverySetting?: boolean | null;
  };
  cursor?: string | null;
}

export interface ClipsCardsUserData {
  user: null | {
    id: string;
    clips: null | {
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      edges: {
        cursor: null | string;
        node: ClipsCardsUserClip;
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

export interface DirectoryPageGameGame {
  id: string;
  name: string;
  displayName: string;
  streams: {
    banners: null | ('MAY_CONTAIN_MATURE_CONTENT' | string)[];
    edges: {
      cursor: null | string;
      trackingID: null | string;
      node: DirectoryPageGameStream;
      __typename: 'StreamEdge';
    }[];
    pageInfo: {
      hasNextPage: boolean;
      __typename: 'PageInfo';
    };
    __typename: 'StreamConnection';
  };
  __typename: 'Game';
}

export type DirectoryPageGameSort = 'RELEVANCE' | 'VIEWER_COUNT' | 'VIEWER_COUNT_ASC' | 'RECENT';

export interface DirectoryPageGameStream {
  id: string;
  title: string;
  viewersCount: number;
  previewImageURL: string;
  type: 'live';
  broadcaster: {
    id: string;
    login: string;
    displayName: string;
    profileImageURL: string;
    primaryColorHex: null | string;
    roles: {
      isPartner: boolean;
      isParticipatingDJ: boolean;
      __typename: 'UserRoles';
    };
    __typename: 'User';
  };
  freeformTags: {
    id: string;
    name: string;
    __typename: 'FreeformTag';
  }[];
  game: {
    id: string;
    boxArtURL: string;
    name: string;
    displayName: string;
    slug: string;
    __typename: 'Game';
  };
  previewThumbnailProperties: {
    blurReason: 'BLUR_NOT_REQUIRED' | string;
    __typename: 'PreviewThumbnailProperties';
  };
  __typename: 'Stream';
}

export interface DirectoryPageGameVariables {
  imageWidth?: number;
  slug: string;
  options: {
    sort: DirectoryPageGameSort;
    recommendationsContext?: null | {
      platform?: null | 'web' | string;
    };
    freeformTags?: null | string[];
    tags?: null | string[];
    broadcasterLanguages?: null | string[];
    systemFilters?: null | string[];
  };
  sortTypeIsRecency: boolean;
  limit: number;
  includeIsDJ: boolean;
}

export interface DirectoryPageGameData {
  game: null | DirectoryPageGameGame;
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

export interface GetPinnedChatMessage {
  id: string;
  sentAt: string;
  content: {
    text: string;
    fragments: {
      content: unknown;
      text: string;
      __typename: 'MessageFragment';
    }[];
    __typename: 'MessageContent';
  };
  parentMessage: unknown;
  threadParentMessage: unknown;
  sender: {
    id: string;
    chatColor: null | string;
    displayName: string;
    displayBadges: {
      id: string;
      setID: string;
      version: string;
      __typename: 'Badge';
    }[];
    __typename: 'User';
  };
  __typename: 'Message';
}

export interface GetPinnedChatPinnedChatMessage {
  id: string;
  type: 'MOD' | string;
  startsAt: string;
  updatedAt: string;
  endsAt: null | string;
  pinnedMessage: GetPinnedChatMessage;
  pinnedBy: {
    id: string;
    displayName: string;
    __typename: 'User';
  };
  __typename: 'PinnedChatMessage';
}

export interface GetPinnedChatVariables {
  channelID: string;
  count: number;
}

export interface GetPinnedChatData {
  channel: null | {
    id: string;
    pinnedChatMessages: null | {
      edges: {
        node: GetPinnedChatPinnedChatMessage;
        cursor: null | string;
        __typename: 'PinnedChatMessageEdge';
      }[];
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      __typename: 'PinnedChatMessageConnection';
    };
    __typename: 'Channel';
  };
}

export interface GetUserIdVariables {
  login: string;
  /**
   * ACTIVE – only active users
   * ALL – all users, including suspended
   */
  lookupType: 'ACTIVE' | 'ALL';
}

export interface GetUserIdData {
  user: null | {
    id: string;
    __typename: 'User';
  };
}

export interface GlobalBadgesBadge {
  id: string;
  setID: string;
  version: string;
  title: string;
  image1x: string;
  image2x: string;
  image4x: string;
  clickAction: null | 'VISIT_URL' | 'SUBSCRIBE' | 'GET_TURBO';
  clickURL: null | string;
  __typename: 'Badge';
}

export interface GlobalBadgesData {
  badges: GlobalBadgesBadge[];
}

export interface SearchResultsPageChannel {
  displayName: string;
  id: string;
  login: string;
  profileImageURL: string;
  description: null | string;
  broadcastSettings: {
    id: string;
    title: string;
    __typename: 'BroadcastSettings';
  };
  followers: {
    totalCount: number;
    __typename: 'FollowerConnection';
  };
  lastBroadcast: {
    id: null | string;
    startedAt: null | string;
    __typename: 'Broadcast';
  };
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
  self: unknown;
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
    id: string;
    previewImageURL: string;
    type: 'live';
    viewersCount: number;
    game: null | {
      id: string;
      slug: string;
      name: string;
      displayName: string;
      __typename: 'Game';
    };
    freeformTags: {
      id: string;
      name: string;
      __typename: 'FreeformTag';
    }[];
    __typename: 'Stream';
  };
  watchParty: unknown;
  __typename: 'User';
}

export interface SearchResultsPageGame {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  boxArtURL: string;
  viewersCount: null | number;
  tags: {
    id: string;
    isLanguageTag: boolean;
    localizedName: string;
    tagName: string;
    __typename: 'Tag';
  }[];
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
  id: string;
  lengthSeconds: number;
  previewThumbnailURL: string;
  title: string;
  viewCount: number;
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
  game: null | {
    id: string;
    slug: string;
    name: string;
    displayName: string;
    __typename: 'Game';
  };
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

export interface ShareClipRenderStatusBroadcaster {
  id: string;
  login: string;
  displayName: string;
  primaryColorHex: null | string;
  isPartner: boolean;
  profileImageURL: string;
  followers: {
    totalCount: number;
    __typename: 'FollowerConnection';
  };
  stream: null | {
    id: string;
    viewersCount: number;
    __typename: 'Stream';
  };
  lastBroadcast: {
    id: string;
    startedAt: string;
    __typename: 'Broadcast';
  };
  self: unknown;
  __typename: 'User';
}

export interface ShareClipRenderStatusClipAsset {
  id: string;
  aspectRatio: number;
  type: 'SOURCE' | 'RECOMPOSED';
  createdAt: string;
  creationState: 'CREATED' | string;
  thumbnailURL: string;
  curator: null | {
    id: string;
    login: string;
    displayName: string;
    profileImageURL: string;
    __typename: 'User';
  };
  videoQualities: {
    frameRate: number;
    quality: string;
    sourceURL: string;
    __typename: 'ClipVideoQuality';
  }[];
  portraitMetadata: null | {
    portraitClipLayout: 'FULL' | 'STACKED';
    fullTemplateMetadata: null | {
      mainFrame: {
        topLeft: {
          xPercentage: number;
          yPercentage: number;
          __typename: 'PortraitCropCoordinates';
        };
        bottomRight: {
          xPercentage: number;
          yPercentage: number;
          __typename: 'PortraitCropCoordinates';
        };
        __typename: 'PortraitCropMetadata';
      };
      __typename: 'FullTemplateMetadata';
    };
    stackedTemplateMetadata: null | {
      topFrame: {
        topLeft: {
          xPercentage: number;
          yPercentage: number;
          __typename: 'PortraitCropCoordinates';
        };
        bottomRight: {
          xPercentage: number;
          yPercentage: number;
          __typename: 'PortraitCropCoordinates';
        };
        __typename: 'PortraitCropMetadata';
      };
      bottomFrame: {
        topLeft: {
          xPercentage: number;
          yPercentage: number;
          __typename: 'PortraitCropCoordinates';
        };
        bottomRight: {
          xPercentage: number;
          yPercentage: number;
          __typename: 'PortraitCropCoordinates';
        };
        __typename: 'PortraitCropMetadata';
      };
      __typename: 'StackedTemplateMetadata';
    };
    __typename: 'PortraitClipCropping';
  };
  __typename: 'ClipAsset';
}

export interface ShareClipRenderStatusClip {
  id: string;
  slug: string;
  url: string;
  embedURL: string;
  title: string;
  viewCount: number;
  language: string;
  isFeatured: boolean;
  thumbnailURL: string;
  createdAt: string;
  isPublished: boolean;
  durationSeconds: number;
  champBadge: unknown;
  videoOffsetSeconds: null | number;
  isViewerEditRestricted: boolean;
  assets: ShareClipRenderStatusClipAsset[];
  curator: null | {
    id: string;
    login: string;
    displayName: string;
    profileImageURL: string;
    __typename: 'User';
  };
  game: null | {
    id: string;
    name: string;
    boxArtURL: string;
    displayName: string;
    slug: string;
    __typename: 'Game';
  };
  broadcast: {
    id: string;
    title: null | string;
    __typename: 'Broadcast';
  };
  broadcaster: null | ShareClipRenderStatusBroadcaster;
  playbackAccessToken: {
    signature: string;
    value: string;
    __typename: 'PlaybackAccessToken';
  };
  video: null | {
    id: string;
    broadcastType: 'ARCHIVE' | 'HIGHLIGHT';
    title: string;
    __typename: 'Video';
  };
  videoQualities: {
    sourceURL: string;
    __typename: 'ClipVideoQuality';
  }[];
  suggestedCropping: unknown;
  __typename: 'Clip';
}

export interface ShareClipRenderStatusVariables {
  slug: string;
}

export interface ShareClipRenderStatusData {
  clip: null | ShareClipRenderStatusClip;
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
    chanlets: unknown;
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

export interface VideoPreviewOverlayVariables {
  login: string;
}

export interface VideoPreviewOverlayData {
  user: null | {
    id: string;
    stream: null | {
      id: string;
      previewImageURL: string;
      restrictionType: unknown;
      __typename: 'Stream';
    };
    __typename: 'User';
  };
}

export interface WatchLivePromptVariables {
  slug: string;
}

export interface WatchLivePromptData {
  clip: null | {
    id: string;
    durationSeconds: number;
    thumbnailURL: string;
    broadcaster: null | {
      id: string;
      login: string;
      displayName: string;
      stream: null | {
        id: string;
        game: null | {
          id: string;
          displayName: string;
          __typename: 'Game';
        };
        __typename: 'Stream';
      };
      __typename: 'User';
    };
    __typename: 'Clip';
  };
}

export type BrowsePageAllDirectoriesResponse = QueryResponse<'BrowsePage_AllDirectories', BrowsePageAllDirectoriesData>;
export type ChannelRootAboutPanelResponse = QueryResponse<'ChannelRoot_AboutPanel', ChannelRootAboutPanelData>;
export type ChannelShellResponse = QueryResponse<'ChannelShell', ChannelShellData>;
export type ClipsActionButtonsResponse = QueryResponse<'ClipsActionButtons', ClipsActionButtonsData>;
export type ClipsCardsGameResponse = QueryResponse<'ClipsCards__Game', ClipsCardsGameData>;
export type ClipsCardsUserResponse = QueryResponse<'ClipsCards__User', ClipsCardsUserData>;
export type ClipsDownloadButtonResponse = QueryResponse<'ClipsDownloadButton', ClipsDownloadButtonData>;
export type DirectoryPageGameResponse = QueryResponse<'DirectoryPage_Game', DirectoryPageGameData>;
export type FfzBroadcastIdResponse = QueryResponse<'FFZ_BroadcastID', FfzBroadcastIdData>;
export type GetPinnedChatResponse = QueryResponse<'GetPinnedChat', GetPinnedChatData>;
export type GetUserIdResponse = QueryResponse<'GetUserID', GetUserIdData>;
export type GlobalBadgesResponse = QueryResponse<'GlobalBadges', GlobalBadgesData>;
export type SearchResultsPageSearchResultsResponse = QueryResponse<'SearchResultsPage_SearchResults', SearchResultsPageSearchResultsData>;
export type SearchTraySearchSuggestionsResponse = QueryResponse<'SearchTray_SearchSuggestions', SearchTraySearchSuggestionsData>;
export type ShareClipRenderStatusResponse = QueryResponse<'ShareClipRenderStatus', ShareClipRenderStatusData>;
export type StreamMetadataResponse = QueryResponse<'StreamMetadata', StreamMetadataData>;
export type UseLiveResponse = QueryResponse<'UseLive', UseLiveData>;
export type UseViewCountResponse = QueryResponse<'UseViewCount', UseViewCountData>;
export type VideoAccessTokenClipResponse = QueryResponse<'VideoAccessToken_Clip', VideoAccessTokenClipData>;
export type VideoPreviewOverlayResponse = QueryResponse<'VideoPreviewOverlay', VideoPreviewOverlayData>;
export type WatchLivePromptResponse = QueryResponse<'WatchLivePrompt', WatchLivePromptData>;

export type QueryResponseMap = {
  BrowsePage_AllDirectories: BrowsePageAllDirectoriesResponse;
  ChannelRoot_AboutPanel: ChannelRootAboutPanelResponse;
  ChannelShell: ChannelShellResponse;
  ClipsActionButtons: ClipsActionButtonsResponse;
  ClipsCards__Game: ClipsCardsGameResponse;
  ClipsCards__User: ClipsCardsUserResponse;
  ClipsDownloadButton: ClipsDownloadButtonResponse;
  DirectoryPage_Game: DirectoryPageGameResponse;
  FFZ_BroadcastID: FfzBroadcastIdResponse;
  GetPinnedChat: GetPinnedChatResponse;
  GetUserID: GetUserIdResponse;
  GlobalBadges: GlobalBadgesResponse;
  SearchResultsPage_SearchResults: SearchResultsPageSearchResultsResponse;
  SearchTray_SearchSuggestions: SearchTraySearchSuggestionsResponse;
  ShareClipRenderStatus: ShareClipRenderStatusResponse;
  StreamMetadata: StreamMetadataResponse;
  UseLive: UseLiveResponse;
  UseViewCount: UseViewCountResponse;
  VideoAccessToken_Clip: VideoAccessTokenClipResponse;
  VideoPreviewOverlay: VideoPreviewOverlayResponse;
  WatchLivePrompt: WatchLivePromptResponse;
};
