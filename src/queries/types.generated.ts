import type { QueryResponse } from '../types.ts';

export interface BrowsePageGame {
  id: string;
  slug: string;
  displayName: string;
  name: string;
  avatarURL: string;
  viewersCount: null | number;
  /**
   * Possible weird values:
   * * `0001-01-01 00:00:00 +0000 UTC`
   * * `2003-06-27 00:00:00 +0000 UTC`
   */
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
    recommendationsContext?: null | {
      platform?: null | 'web' | string;
    };
    sort: BrowsePageSort;
    tags?: null | string[];
  };
  cursor?: null | string;
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
          /**
           * Can also be a `mailto:` url
           */
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
  /**
   * If never streamed: `{ id: null, game: null }`
   */
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
        status: 'RECORDED' | 'RECORDING';
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
  currentUser: null;
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

export interface ChannelVideoShelvesQueryClip {
  id: string;
  slug: string;
  thumbnailURL: string;
  createdAt: string;
  durationSeconds: number;
  isFeatured: boolean;
  clipTitle: string;
  clipViewCount: number;
  curator: null | {
    id: string;
    login: string;
    displayName: string;
    __typename: 'User';
  };
  clipGame: null | {
    id: string;
    slug: string;
    name: string;
    boxArtURL: string;
    __typename: 'Game';
  };
  broadcaster: {
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
    guests: (null | {
      id: string;
      login: string;
      displayName: string;
      profileImageURL: string;
      primaryColorHex: null | string;
      description: null | string;
      __typename: 'User';
    })[];
    sessionIdentifier: '' | string;
    __typename: 'GuestStarParticipants';
  };
  __typename: 'Clip';
}

export interface ChannelVideoShelvesQueryVideo {
  animatedPreviewURL: string;
  id: string;
  lengthSeconds: number;
  previewThumbnailURL: string;
  publishedAt: string;
  title: null | string;
  viewCount: number;
  game: null | {
    boxArtURL: string;
    id: string;
    slug: string;
    displayName: string;
    name: string;
    __typename: 'Game';
  };
  owner: {
    displayName: string;
    id: string;
    login: string;
    profileImageURL: string;
    primaryColorHex: null | string;
    roles: {
      isPartner: boolean;
      __typename: 'UserRoles';
    };
    __typename: 'User';
  };
  self: {
    isRestricted: boolean;
    viewingHistory: null;
    __typename: 'VideoSelfEdge';
  };
  resourceRestriction: null | {
    id: string;
    type: 'SUB_ONLY_LIVE';
    exemptions: {
      type: 'STAFF' | 'SITE_ADMIN' | 'PRODUCT' | 'PREVIEW';
      actions: {
        name: string;
        title: string;
        __typename: 'ResourceRestrictionExemptionAction';
      }[];
      __typename: 'ResourceRestrictionExemption';
    }[];
    options: 'ALLOW_ALL_TIERS'[];
    __typename: 'ResourceRestriction';
  };
  /**
   * @maxItems 0
   */
  contentTags: [];
  previewThumbnailProperties?: {
    blurReason: 'BLUR_NOT_REQUIRED';
    __typename: 'PreviewThumbnailProperties';
  };
  __typename: 'Video';
}

export interface ChannelVideoShelvesQueryVideoShelf {
  id: string;
  title: string;
  description: null | string;
  type: 'TOP_CLIPS' | 'LATEST_BROADCASTS' | 'ALL_VIDEOS' | 'LATEST_NON_BROADCASTS' | 'COLLECTION';
  collection: null | {
    id: string;
    description: string;
    owner: {
      id: string;
      login: string;
      __typename: 'User';
    };
    thumbnailURL: null | string;
    title: string;
    type: 'DEFAULT';
    updatedAt: string;
    lengthSeconds: number;
    items: {
      totalCount: number;
      edges: {
        cursor: null | string;
        node: ChannelVideoShelvesQueryVideo;
        __typename: 'CollectionItemEdge';
      }[];
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      __typename: 'CollectionConnection';
    };
    __typename: 'Collection';
  };
  items: (ChannelVideoShelvesQueryClip | ChannelVideoShelvesQueryVideo)[];
  __typename: 'VideoShelf';
}

export interface ChannelVideoShelvesQueryVariables {
  includePreviewBlur?: boolean;
  channelLogin: string;
  first: number;
}

export interface ChannelVideoShelvesQueryData {
  currentUser: null;
  user: null | {
    id: string;
    displayName: string;
    primaryColorHex: null | string;
    videoShelves: {
      edges: {
        cursor: null | string;
        node: ChannelVideoShelvesQueryVideoShelf;
        __typename: 'VideoShelfEdge';
      }[];
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      __typename: 'VideoShelfConnection';
    };
    __typename: 'User';
  };
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
    guests: (null | {
      id: string;
      login: string;
      displayName: string;
      profileImageURL: string;
      primaryColorHex: null | string;
      description: null | string;
      __typename: 'User';
    })[];
    sessionIdentifier: '' | string;
    __typename: 'GuestStarParticipants';
  };
  previewThumbnailProperties: {
    blurReason: 'BLUR_NOT_REQUIRED';
    __typename: 'PreviewThumbnailProperties';
  };
  __typename: 'Clip';
}

export type ClipsCardsFilter = 'LAST_DAY' | 'LAST_WEEK' | 'LAST_MONTH' | 'ALL_TIME';

export interface ClipsCardsGameVariables {
  categorySlug: string;
  limit: number;
  criteria?: {
    languages?: null | string[];
    filter?: null | ClipsCardsFilter;
    shouldFilterByDiscoverySetting?: null | boolean;
  };
  cursor?: null | string;
}

export interface ClipsCardsGameData {
  game: null | {
    id: string;
    name: string;
    displayName: string;
    clips: null | {
      banners: null | 'MAY_CONTAIN_MATURE_CONTENT'[];
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
  /**
   * Possible values: `EN`, `DE`, `ASL`, `ZH_HK`
   */
  language: string;
  thumbnailURL: string;
  createdAt: string;
  durationSeconds: number;
  champBadge: null;
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
    guests: (null | {
      id: string;
      login: string;
      displayName: string;
      profileImageURL: string;
      primaryColorHex: null | string;
      description: null | string;
      __typename: 'User';
    })[];
    sessionIdentifier: '' | string;
    __typename: 'GuestStarParticipants';
  };
  __typename: 'Clip';
}

export interface ClipsCardsUserVariables {
  login: string;
  limit: number;
  criteria?: {
    filter?: null | ClipsCardsFilter;
    shouldFilterByDiscoverySetting?: null | boolean;
  };
  cursor?: null | string;
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
    /**
     * Can be `""` if quality is not generated yet
     */
    sourceURL: '' | string;
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
    banners: null | 'MAY_CONTAIN_MATURE_CONTENT'[];
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
    blurReason: 'BLUR_NOT_REQUIRED';
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

export interface FilterableVideoTowerVideosVideo {
  animatedPreviewURL: string;
  id: string;
  lengthSeconds: number;
  previewThumbnailURL: string;
  publishedAt: string;
  title: null | string;
  viewCount: number;
  game: null | {
    boxArtURL: string;
    id: string;
    slug: string;
    displayName: string;
    name: string;
    __typename: 'Game';
  };
  owner: {
    displayName: string;
    id: string;
    login: string;
    profileImageURL: string;
    primaryColorHex: null | string;
    roles: {
      isPartner: boolean;
      __typename: 'UserRoles';
    };
    __typename: 'User';
  };
  self: {
    isRestricted: boolean;
    viewingHistory: null;
    __typename: 'VideoSelfEdge';
  };
  resourceRestriction: null | {
    id: string;
    type: 'SUB_ONLY_LIVE';
    exemptions: {
      type: 'STAFF' | 'SITE_ADMIN' | 'PRODUCT' | 'PREVIEW';
      actions: {
        name: string;
        title: string;
        __typename: 'ResourceRestrictionExemptionAction';
      }[];
      __typename: 'ResourceRestrictionExemption';
    }[];
    options: 'ALLOW_ALL_TIERS'[];
    __typename: 'ResourceRestriction';
  };
  /**
   * @maxItems 0
   */
  contentTags: [];
  previewThumbnailProperties?: {
    blurReason: 'BLUR_NOT_REQUIRED';
    __typename: 'PreviewThumbnailProperties';
  };
  __typename: 'Video';
}

export interface FilterableVideoTowerVideosVariables {
  includePreviewBlur?: boolean;
  limit: number;
  channelOwnerLogin: string;
  broadcastType?: null | 'ARCHIVE' | 'HIGHLIGHT' | 'UPLOAD';
  videoSort: 'TIME' | 'VIEWS';
}

export interface FilterableVideoTowerVideosData {
  user: null | {
    id: string;
    videos: null | {
      edges: {
        cursor: null | string;
        node: FilterableVideoTowerVideosVideo;
        __typename: 'VideoEdge';
      }[];
      pageInfo: {
        hasNextPage: boolean;
        __typename: 'PageInfo';
      };
      __typename: 'VideoConnection';
    };
    __typename: 'User';
  };
}

export interface GetPinnedChatMessage {
  id: string;
  sentAt: string;
  content: {
    text: string;
    fragments: {
      content:
        | null
        | {
            emoteID: string;
            __typename: 'Emote';
          }
        | {
            userID: string;
            login: string;
            __typename: 'User';
          }
        | {
            bitsAmount: number;
            prefix: string;
            tier: number;
            __typename: 'CheermoteToken';
          };
      text: string;
      __typename: 'MessageFragment';
    }[];
    __typename: 'MessageContent';
  };
  parentMessage: null | {
    id: string;
    sentAt: string;
    content: {
      text: string;
      __typename: 'MessageContent';
    };
    sender: {
      id: string;
      displayName: string;
      __typename: 'User';
    };
    __typename: 'Message';
  };
  threadParentMessage: null | {
    id: string;
    content: {
      text: string;
      __typename: 'MessageContent';
    };
    sender: {
      id: string;
      displayName: string;
      __typename: 'User';
    };
    __typename: 'Message';
  };
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
  /**
   * Still `MOD` even if it's a broadcaster's message or pinned by a broadcaster
   */
  type: 'MOD';
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

export interface GlobalBadgesVariables {}

export interface GlobalBadgesData {
  badges: GlobalBadgesBadge[];
}

export interface PlaybackAccessTokenStream {
  value: string;
  signature: string;
  authorization: {
    isForbidden: boolean;
    forbiddenReasonCode: 'NONE';
    __typename: 'PlaybackAccessTokenAuthorization';
  };
  __typename: 'PlaybackAccessToken';
}

export interface PlaybackAccessTokenVideo {
  value: string;
  signature: string;
  __typename: 'PlaybackAccessToken';
}

export interface PlaybackAccessTokenVariables {
  isLive: boolean;
  login: '' | string;
  isVod: boolean;
  vodID: '' | string;
  playerType: '' | 'site' | 'channel_home_carousel';
  platform: 'web' | string;
}

export interface PlaybackAccessTokenData {
  streamPlaybackAccessToken?: null | PlaybackAccessTokenStream;
  videoPlaybackAccessToken?: null | PlaybackAccessTokenVideo;
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
  /**
   * If never streamed: `{ id: null, startedAt: null }`
   */
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
        categories: {
          id: string;
          name: string;
          __typename: 'Game';
        }[];
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
        title: null | string;
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
  watchParty: null;
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
  watchParty: null;
  __typename: 'User';
}

export interface SearchResultsPageVideo {
  createdAt: string;
  id: string;
  lengthSeconds: number;
  previewThumbnailURL: string;
  title: null | string;
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
  self: null;
  __typename: 'User';
}

export interface ShareClipRenderStatusClipAsset {
  id: string;
  aspectRatio: number;
  type: 'SOURCE' | 'RECOMPOSED';
  createdAt: string;
  creationState: 'CREATED' | 'CREATING';
  /**
   * Can be `""` if it's not created yet
   */
  thumbnailURL: '' | string;
  curator: null | {
    id: string;
    login: string;
    displayName: string;
    profileImageURL: string;
    __typename: 'User';
  };
  videoQualities: {
    frameRate: number;
    quality: '360' | '480' | '720' | '1080' | '1440' | string;
    /**
     * Can be `""` if quality is not generated yet
     */
    sourceURL: '' | string;
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
  /**
   * Possible values: `EN`, `DE`, `ASL`, `ZH_HK`
   */
  language: string;
  isFeatured: boolean;
  thumbnailURL: string;
  createdAt: string;
  isPublished: boolean;
  durationSeconds: number;
  champBadge: null;
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
    /**
     * For clips from highlights or uploads it will be `"1"`
     */
    id: '1' | string;
    /**
     * Seems to always be `null`
     */
    title: null;
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
    broadcastType: 'ARCHIVE' | 'HIGHLIGHT' | 'UPLOAD';
    title: null | string;
    __typename: 'Video';
  };
  videoQualities: {
    /**
     * Can be `""` if quality is not generated yet
     */
    sourceURL: '' | string;
    __typename: 'ClipVideoQuality';
  }[];
  suggestedCropping: null;
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
  squadStream: null;
  channel: {
    id: string;
    chanlets: null;
    __typename: 'Channel';
  };
  /**
   * If never streamed: `{ id: null, title: null }`
   */
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
      quality: '360' | '480' | '720' | '1080' | '1440' | string;
      /**
       * Can be `""` if quality is not generated yet
       */
      sourceURL: '' | string;
      __typename: 'ClipVideoQuality';
    }[];
    __typename: 'Clip';
  };
}

export interface VideoMetadataUser {
  id: string;
  primaryColorHex: null | string;
  isPartner: boolean;
  profileImageURL: string;
  /**
   * If never streamed: `{ id: null, startedAt: null }`
   */
  lastBroadcast: null | {
    id: null | string;
    startedAt: null | string;
    __typename: 'Broadcast';
  };
  stream: null | {
    id: string;
    viewersCount: number;
    __typename: 'Stream';
  };
  followers: {
    totalCount: number;
    __typename: 'FollowerConnection';
  };
  __typename: 'User';
}

export interface VideoMetadataVideo {
  id: string;
  title: null | string;
  description: null | string;
  previewThumbnailURL: string;
  createdAt: string;
  viewCount: number;
  publishedAt: string;
  lengthSeconds: number;
  broadcastType: 'ARCHIVE' | 'HIGHLIGHT' | 'UPLOAD';
  owner: {
    id: string;
    login: string;
    displayName: string;
    __typename: 'User';
  };
  game: null | {
    id: string;
    slug: string;
    boxArtURL: string;
    name: string;
    displayName: string;
    __typename: 'Game';
  };
  __typename: 'Video';
}

export interface VideoMetadataVariables {
  channelLogin: '' | string;
  videoID: string;
}

export interface VideoMetadataData {
  user: null | VideoMetadataUser;
  currentUser: null;
  video: null | VideoMetadataVideo;
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
      restrictionType: null;
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

export type BrowsePageAllDirectoriesResponse = QueryResponse<BrowsePageAllDirectoriesData, 'BrowsePage_AllDirectories'>;
export type ChannelRootAboutPanelResponse = QueryResponse<ChannelRootAboutPanelData, 'ChannelRoot_AboutPanel'>;
export type ChannelShellResponse = QueryResponse<ChannelShellData, 'ChannelShell'>;
export type ChannelVideoShelvesQueryResponse = QueryResponse<ChannelVideoShelvesQueryData, 'ChannelVideoShelvesQuery'>;
export type ClipsCardsGameResponse = QueryResponse<ClipsCardsGameData, 'ClipsCards__Game'>;
export type ClipsCardsUserResponse = QueryResponse<ClipsCardsUserData, 'ClipsCards__User'>;
export type ClipsDownloadButtonResponse = QueryResponse<ClipsDownloadButtonData, 'ClipsDownloadButton'>;
export type DirectoryPageGameResponse = QueryResponse<DirectoryPageGameData, 'DirectoryPage_Game'>;
export type FfzBroadcastIdResponse = QueryResponse<FfzBroadcastIdData, 'FFZ_BroadcastID'>;
export type FilterableVideoTowerVideosResponse = QueryResponse<FilterableVideoTowerVideosData, 'FilterableVideoTower_Videos'>;
export type GetPinnedChatResponse = QueryResponse<GetPinnedChatData, 'GetPinnedChat'>;
export type GetUserIdResponse = QueryResponse<GetUserIdData, 'GetUserID'>;
export type GlobalBadgesResponse = QueryResponse<GlobalBadgesData, 'GlobalBadges'>;
export type PlaybackAccessTokenResponse = QueryResponse<PlaybackAccessTokenData, 'PlaybackAccessToken'>;
export type SearchResultsPageSearchResultsResponse = QueryResponse<SearchResultsPageSearchResultsData, 'SearchResultsPage_SearchResults'>;
export type SearchTraySearchSuggestionsResponse = QueryResponse<SearchTraySearchSuggestionsData, 'SearchTray_SearchSuggestions'>;
export type ShareClipRenderStatusResponse = QueryResponse<ShareClipRenderStatusData, 'ShareClipRenderStatus'>;
export type StreamMetadataResponse = QueryResponse<StreamMetadataData, 'StreamMetadata'>;
export type UseLiveResponse = QueryResponse<UseLiveData, 'UseLive'>;
export type UseViewCountResponse = QueryResponse<UseViewCountData, 'UseViewCount'>;
export type VideoAccessTokenClipResponse = QueryResponse<VideoAccessTokenClipData, 'VideoAccessToken_Clip'>;
export type VideoMetadataResponse = QueryResponse<VideoMetadataData, 'VideoMetadata'>;
export type VideoPreviewOverlayResponse = QueryResponse<VideoPreviewOverlayData, 'VideoPreviewOverlay'>;
export type WatchLivePromptResponse = QueryResponse<WatchLivePromptData, 'WatchLivePrompt'>;

export interface QueryResponseMap {
  BrowsePage_AllDirectories: BrowsePageAllDirectoriesResponse;
  ChannelRoot_AboutPanel: ChannelRootAboutPanelResponse;
  ChannelShell: ChannelShellResponse;
  ChannelVideoShelvesQuery: ChannelVideoShelvesQueryResponse;
  ClipsCards__Game: ClipsCardsGameResponse;
  ClipsCards__User: ClipsCardsUserResponse;
  ClipsDownloadButton: ClipsDownloadButtonResponse;
  DirectoryPage_Game: DirectoryPageGameResponse;
  FFZ_BroadcastID: FfzBroadcastIdResponse;
  FilterableVideoTower_Videos: FilterableVideoTowerVideosResponse;
  GetPinnedChat: GetPinnedChatResponse;
  GetUserID: GetUserIdResponse;
  GlobalBadges: GlobalBadgesResponse;
  PlaybackAccessToken: PlaybackAccessTokenResponse;
  SearchResultsPage_SearchResults: SearchResultsPageSearchResultsResponse;
  SearchTray_SearchSuggestions: SearchTraySearchSuggestionsResponse;
  ShareClipRenderStatus: ShareClipRenderStatusResponse;
  StreamMetadata: StreamMetadataResponse;
  UseLive: UseLiveResponse;
  UseViewCount: UseViewCountResponse;
  VideoAccessToken_Clip: VideoAccessTokenClipResponse;
  VideoMetadata: VideoMetadataResponse;
  VideoPreviewOverlay: VideoPreviewOverlayResponse;
  WatchLivePrompt: WatchLivePromptResponse;
};
