import type { QueryResponse } from "../types.ts";

export type Cursor = string;

export type ID = string;

export type PrimitiveValue = string | number | boolean;

export type EnumOrInput = Record<string, unknown> | PrimitiveValue;

export type UnknownValue = null | PrimitiveValue | PrimitiveValue[];

export type Badge = {
  /** @example ["cHJlZGljdGlvbnM7Ymx1ZS0xOw==", "cHJlZGljdGlvbnM7Ymx1ZS0yOw=="] */
  id: ID;
  /** @example ["", "predictions", "bits"] */
  setID: ID;
  /** @example ["", "blue-1", "blue-2", "blue-3", "blue-4", "blue-5", "pink-2", "100"] */
  version: string;
  /** @example ["Predicted Blue (1)", "Predicted Blue (2)"] */
  title: string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/badges/v1/e33d8b46-f63b-4e67-996d-4a7dcec0ad33/1", "https://static-cdn.jtvnw.net/badges/v1/ffdda3fe-8012-4db3-981e-7a131402b057/1"]
   * @aliasFor imageURL
   * @gqlArg `size: BadgeImageURLSize`
   */
  image1x: string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/badges/v1/e33d8b46-f63b-4e67-996d-4a7dcec0ad33/1", "https://static-cdn.jtvnw.net/badges/v1/ffdda3fe-8012-4db3-981e-7a131402b057/1"]
   * @aliasFor imageURL
   * @gqlArg `size: BadgeImageURLSize`
   */
  image2x: string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/badges/v1/e33d8b46-f63b-4e67-996d-4a7dcec0ad33/1", "https://static-cdn.jtvnw.net/badges/v1/ffdda3fe-8012-4db3-981e-7a131402b057/1"]
   * @aliasFor imageURL
   * @gqlArg `size: BadgeImageURLSize`
   */
  image4x: string;
  /** @example ["VISIT_URL", "SUBSCRIBE", "GET_TURBO"] */
  clickAction: null | string;
  /** @example ["https://www.twitch.tv/directory/category/destiny-2\t", "https://help.twitch.tv/s/article/guide-to-cheering-with-bits", "https://www.twitch.tv/directory/game/1979%20Revolution/details"] */
  clickURL: null | string;
  __typename: "Badge";
};

/** ℹ️ Not real Twitch type name */
export type BadgeImageURLSize = "DOUBLE" | "NORMAL" | "QUADRUPLE";

export type BitsCheermoteCampaign = {
  id: ID;
  /**
   * ⚠️ Low confidence about: nullable
   * @format uri
   */
  brandImageURL: null | string;
  /** ⚠️ Low confidence about: nullable */
  brandName: null | string;
  thresholds:
    | null
    | BitsCheermoteCampaign_CheermoteCampaignThresholds
    | BitsCheermoteCampaign_CheermoteCampaignThresholds[];
  /**
   * ⚠️ Low confidence about: nullable
   * @format uint32
   */
  minimumBitsAmount: null | number;
  bitsTotal: UnknownValue;
  bitsUsed: UnknownValue;
  bitsPercentageRemaining: UnknownValue;
  /**
   * ⚠️ Low confidence about: nullable
   * @format uint32
   */
  userLimit: null | number;
  self:
    | null
    | BitsCheermoteCampaign_CheermoteCampaignSelf
    | BitsCheermoteCampaign_CheermoteCampaignSelf[];
  __typename: "CheermoteCampaign";
};

/** ℹ️ Not real Twitch type name */
export type BitsCheermoteCampaign_CheermoteCampaignSelf = {
  id: ID;
  bitsUsed: UnknownValue;
  canBeSponsored: UnknownValue;
  __typename: string;
};

/** ℹ️ Not real Twitch type name */
export type BitsCheermoteCampaign_CheermoteCampaignThresholds = {
  id: ID;
  /**
   * ⚠️ Low confidence about: nullable
   * @format uint32
   */
  minimumBits: null | number;
  /**
   * ⚠️ Low confidence about: nullable
   * @format float
   */
  matchedPercent: null | number;
  __typename: string;
};

export type BroadcastType = "ARCHIVE" | "HIGHLIGHT" | "PAST_PREMIERE" | "UPLOAD";

export type BrowsePageDirectoriesWithTagsEdge = {
  /** @example ["eyJvZmYiOjEsImJsayI6MCwic3ViIjp7IjEiOnsib2ZmIjoxLCJ0b3QiOjEwMH0sIjIiOnsib2ZmIjowLCJ0b3QiOjE4MH0sIjMiOnsib2ZmIjowLCJ0b3QiOjB9fX0="] */
  cursor: Cursor;
  /** @example ["d1c58c2a-8003-49f3-9952-a6252feb90af:4b9a285b-3156-4789-8c8d-e88c5ef3b4cd:MF|COLDSTART_TF2_CATEGORY_002:RF|UNK:CG|UNK:CR|UNK:BL|UNK:FC|UNK:RK|0:CRK|0", "d1c58c2a-8003-49f3-9952-a6252feb90af:18210e19-e010-4bd4-a812-3489274681a0:MF|COLDSTART_TF2_CATEGORY_002:RF|UNK:CG|UNK:CR|UNK:BL|UNK:FC|UNK:RK|1:CRK|1", "d1c58c2a-8003-49f3-9952-a6252feb90af:820be96b-f59a-437d-8426-41b2e6cf9543:MF|COLDSTART_TF2_CATEGORY_002:RF|UNK:CG|UNK:CR|UNK:BL|UNK:FC|UNK:RK|2:CRK|2"] */
  trackingID: null | ID;
  node: null | BrowsePageGame;
  __typename: "GameEdge";
};

export type BrowsePageGame = {
  /**
   * @pattern ^[0-9]+$
   * @example ["509672"]
   */
  id: ID;
  /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
  slug: string;
  /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
  displayName: string;
  /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
  name: string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509658-144x192.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg"]
   * @gqlArg `width: Int [600, 144, 30, 285, 38]`
   * @gqlArg `height: Int [800, 192, 42, 380, 51]`
   */
  avatarURL: string;
  /**
   * @format uint32
   * @example [584353, 2909, 484662, 92801, 444549]
   */
  viewersCount: null | number;
  tags: TagFragment[];
  /** @example ["0001-01-01 00:00:00 +0000 UTC", "2012-08-21T00:00:00Z", "2013-07-09T00:00:00Z", "2024-12-06T00:00:00Z", "2026-06-05T00:00:00Z", "2004-11-23T00:00:00Z", "2026-09-10T00:00:00Z", "2026-10-08T00:00:00Z"] */
  originalReleaseDate: null | string;
  __typename: "Game";
};

/** ℹ️ Not real Twitch type name */
export type ChatListBadges_UserSelf = {
  selectedBadge: null | Badge;
  displayBadges: null | Badge;
  __typename: string;
};

export type CheerDisplayConfig = {
  /** @example ["light", "dark"] */
  backgrounds: string[];
  colors: {
    /**
     * @format int32
     * @example [1, 100, 1000, 5000, 10000]
     */
    bits: number;
    /**
     * @pattern ^#[0-9a-fA-F]{6}$
     * @example ["#979797", "#9c3ee8", "#1db2a5", "#0099fe", "#f43021", "#f3a71a"]
     */
    color: string;
    __typename: "CheermoteColorConfig";
  }[];
  /** @example ["SPONSORED", "DEFAULT", "CUSTOM", "CHARITY", "FIRST_PARTY", "THIRD_PARTY", "ANONYMOUS", "DISPLAY_ONLY"] */
  order: string[];
  /** @example ["1.5", "1", "2", "3", "4"] */
  scales: string[];
  types: {
    /** @example ["static", "animated"] */
    animation: string;
    /** @example ["png", "gif"] */
    extension: string;
    __typename: "CheermoteDisplayType";
  }[];
  __typename: "CheermoteDisplayConfig";
};

export type CheermoteGroup = {
  /** @example ["https://d3aqoihi2n8ty8.cloudfront.net/actions/PREFIX/BACKGROUND/ANIMATION/TIER/SCALE.EXTENSION", "https://d3aqoihi2n8ty8.cloudfront.net/partner-actions/23161357/20acbcf5-59e0-4f3f-ab93-0ea54628b542/TIER/BACKGROUND/ANIMATION/SCALE.EXTENSION"] */
  templateURL: string;
  nodes: NeoCheermote[];
  __typename: "CheermoteGroup";
};

export type Clip = {
  /**
   * @pattern ^[0-9]+$
   * @example ["3942697259"]
   */
  id: ID;
  /** @example ["EphemeralEncouragingBulgogiPraiseIt-98gnj_-unqEO0uvs", "CredulousBlightedSquirrelOSkomodo-GdY_nETXjEzIz_gm"] */
  slug: string;
  /**
   * @format uri
   * @example ["https://www.twitch.tv/xqc/clip/DeliciousDelightfulPicklesWOOP", "https://www.twitch.tv/xqc/clip/NimbleProductiveAsparagusHeyGuys-s77ZvN10Yr-O2sfo"]
   */
  url: string;
  /**
   * @format uri
   * @example ["https://clips.twitch.tv/embed?clip=DeliciousDelightfulPicklesWOOP", "https://clips.twitch.tv/embed?clip=NimbleProductiveAsparagusHeyGuys-s77ZvN10Yr-O2sfo"]
   */
  embedURL: string;
  /** @example ["xqc makes the wrong choice", "wow"] */
  title: string;
  /**
   * @format uint32
   * @example [0, 957063, 957456, 899934, 944919, 773854]
   */
  viewCount: number;
  /** @example ["EN", "RU"] */
  language: string;
  curator: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    __typename: "User";
  };
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
     * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
     * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
     */
    boxArtURL: string;
    __typename: "Game";
  };
  broadcastIdentifier: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["40884298782"]
     */
    id: ID;
    __typename: "BroadcastIdOnly";
  };
  broadcaster: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    roles: null | {
      isPartner: boolean;
      __typename: "UserRoles";
    };
    __typename: "User";
  };
  /**
   * @example ["", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/thumb/thumb-0000000000-1920x1080.jpg", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b0181c83-be87-4dab-ad46-15dde4d81647/landscape/thumb/thumb-0000000000-1920x1080.jpg"]
   * @gqlArg `width: Int [480, 86, 147, 260]`
   * @gqlArg `height: Int [272, 45, 260, 147]`
   */
  thumbnailURL: string;
  /**
   * @format date-time
   * @example ["2020-12-09T19:18:10Z", "2021-04-04T21:34:33Z"]
   */
  createdAt: string;
  /**
   * @format uint32
   * @example [44, 26, 25, 42, 30, 59, 36, 41, 60, 29]
   */
  durationSeconds: number;
  champBadge: null | Clip_ClipChampBadge | Clip_ClipChampBadge[];
  isFeatured: boolean;
  isAutoCurated: boolean;
  guestStarParticipants: null | {
    guests: null | (null | GuestStarUser)[];
    /** @example ["", "3CEyMILAYQr4KUGLBuhHP8asnMl", "2zt9iFeTrg9NYlEqDpS08hN1ceK", "3DagLgmipaavhol4IwR6Guj2bXp", "36l4VxQ8rIvWizU3zAYBN5nSYaR", "35cwby7kRuiegmBTvrmSGvhDqrq", "34FWSU9wT8Tu0M0faXMkFglhg8J", "2xuGcZE7CjcTv4GeUJGui6j6gEj"] */
    sessionIdentifier: string;
    __typename: "GuestStarParticipants";
  };
  __typename: "Clip";
};

export type ClipAssetFragment = {
  /** @example ["ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/LANDSCAPE", "c8e52370-1429-4023-9ce8-9d016939e3c2/LANDSCAPE"] */
  id: ID;
  /**
   * @format float
   * @example [1.7777777777777777, 0.5625, 0.5627198124267292, 1.7770833333333333, 1.775]
   */
  aspectRatio: number;
  /**
   * @format date-time
   * @example ["2026-06-07T01:55:09.68177848Z", "2026-10-11T17:11:21.793692021Z"]
   */
  createdAt: string;
  /** @example ["CREATED", "FAILED"] */
  creationState: string;
  curator: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    __typename: "User";
  };
  /**
   * @example ["", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2a9a8981-8b21-4c99-8418-6713e95ff16b/landscape/thumb/thumb-0000000000-1920x1080.jpg", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/2a9a8981-8b21-4c99-8418-6713e95ff16b/portrait/thumb/thumb-0000000000-83x147.jpg"]
   * @gqlArg `height: Int [272, 480, 147]`
   */
  thumbnailURL: string;
  videoQualities: {
    /**
     * @format uint32
     * @example [0, 8042862, 2732768, 945904, 781712, 7159557]
     */
    bitrate: number;
    /** @example ["", "avc1.64002A,mp4a.40.2", "hvc1.1.6.L123.90", "hvc1.1.6.L120.90", "hvc1.1.6.L90.90", "hvc1.1.6.L63.90", "hvc1.1.6.L150.90", "avc1.4D001F"] */
    codecs: string;
    duration: null;
    /**
     * @format int32
     * @example [0, -1, 1080, 720, 480, 360, 1600]
     */
    height: number;
    /**
     * @format int32
     * @example [0, -1, 1920, 1280, 853, 640, 900, 720, 480, 360, 854, 1170]
     */
    width: number;
    /** @example ["AVC", "HEVC"] */
    videoCodec: string;
    /**
     * @format float
     * @example [0, 60, 30.03076934814453, 60.01000213623047, 30.005001068115234, 60.0133362969549]
     */
    frameRate: number;
    /** @example ["-1", "1080", "720", "480", "360", "900", "1170", "756"] */
    quality: string;
    /** @example ["", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/1080/index.mp4", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/720/index.mp4"] */
    sourceURL: string;
    __typename: "ClipVideoQuality";
  }[];
  downloadQualities: {
    /** @example ["-1", "1080", "720", "480", "360", "900", "1170", "756"] */
    quality: string;
    /** @example ["", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/1080/index.mp4", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/720/index.mp4"] */
    sourceURL: string;
    __typename: "ClipVideoQuality";
  }[];
  portraitMetadata: null | PortraitClipCropping;
  __typename: "ClipAsset";
};

export type ClipCommentsExposure = {
  isCommentsEnabled: boolean;
  /**
   * @format uint32
   * @example [0, 21, 14, 4, 2, 3, 1, 29, 6, 15, 19]
   */
  topLevelCommentCount: number;
  broadcaster: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    channel: {
      /**
       * @pattern ^[0-9]+$
       * @example ["12826"]
       */
      id: ID;
      clipsSettings: {
        isClipCommentsEnabled: boolean;
        __typename: "ChannelClipsSettings";
      };
      __typename: "Channel";
    };
    __typename: "User";
  };
  __typename: "Clip";
};

/** ℹ️ Not real Twitch type name */
export type Clip_ClipChampBadge = {
  id: ID;
  __typename: string;
};

export type ClipsPeriod = "ALL_TIME" | "LAST_MONTH" | "LAST_WEEK";

export type CollectionConnectionFields = {
  /**
   * @format uint32
   * @example [4, 3, 33, 48, 51, 23, 49, 24, 2, 1]
   */
  totalCount: number;
  edges: {
    /** @example ["MQ=="] */
    cursor: Cursor;
    node: null | PreviewCardVideo;
    __typename: "CollectionItemEdge";
  }[];
  pageInfo: null | {
    hasNextPage: boolean;
    __typename: "PageInfo";
  };
  __typename: "CollectionConnection";
};

export type CollectionFields = {
  /** @example ["KVe_rYFMGxiPsA", "JJ-N82-m4BfH4A"] */
  id: ID;
  /** @example ["", "Patch Notes is the best place for streamers to get updated on all things Twitch!", "Let's Chat is a series of interviews with broadcasters about their journey, advice from experience and hopes for the future of streaming."] */
  description: string;
  owner: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    __typename: "User";
  };
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/9c8e3d718108837db7b7_twitch_44838338187_1726852527//thumb/thumb0-320x180.jpg", "https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/a10140aab611641fda47_twitch_46477099757_1653590708//thumb/thumb0-320x180.jpg"]
   * @gqlArg `width: Int [320, 160, 80]`
   * @gqlArg `height: Int [180, 90, 45]`
   */
  thumbnailURL: null | string;
  /** @example ["TwitchCon San Diego 2024", "TwitchCon Europe 2024", "Patch Notes", "Twitch Public Access", "Let's Chat", "Subathon Highlights", "yt vids"] */
  title: string;
  /** @example ["DEFAULT"] */
  type: string;
  /**
   * @format date-time
   * @example ["2025-01-16T22:23:44.892Z", "2025-01-16T22:22:55.39Z"]
   */
  updatedAt: string;
  /**
   * @format uint32
   * @example [87731, 47380, 166134, 249444, 291563]
   */
  lengthSeconds: number;
  __typename: "Collection";
};

export type ContentClipsManagerClip = {
  /**
   * @pattern ^[0-9]+$
   * @example ["3942697259"]
   */
  id: ID;
  /** @example ["EphemeralEncouragingBulgogiPraiseIt-98gnj_-unqEO0uvs", "CredulousBlightedSquirrelOSkomodo-GdY_nETXjEzIz_gm"] */
  slug: string;
  /**
   * @format uri
   * @example ["https://www.twitch.tv/xqc/clip/DeliciousDelightfulPicklesWOOP", "https://www.twitch.tv/xqc/clip/NimbleProductiveAsparagusHeyGuys-s77ZvN10Yr-O2sfo"]
   */
  url: string;
  isAutoCurated: boolean;
  /**
   * @format uri
   * @example ["https://clips.twitch.tv/embed?clip=DeliciousDelightfulPicklesWOOP", "https://clips.twitch.tv/embed?clip=NimbleProductiveAsparagusHeyGuys-s77ZvN10Yr-O2sfo"]
   */
  embedURL: string;
  /** @example ["xqc makes the wrong choice", "wow"] */
  title: string;
  /**
   * @format uint32
   * @example [0, 957063, 957456, 899934, 944919, 773854]
   */
  viewCount: number;
  /**
   * @format uint32
   * @example [0, 21, 14, 4, 2, 3, 1, 29, 6, 15, 19]
   */
  topLevelCommentCount: number;
  isCommentsEnabled: boolean;
  /** @example ["EN", "RU"] */
  language: string;
  assets: ClipAssetFragment[];
  curator: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    __typename: "User";
  };
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
     * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
     * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
     */
    boxArtURL: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    __typename: "Game";
  };
  broadcast: {
    /**
     * @pattern ^[0-9]+$
     * @example ["317528086118"]
     */
    id: null | ID;
    /** @example ["🎮LIVE🎮CLICK🎮XBOX GAME SHOW🎮BANGER🎮DRAMA🎮NEWS🎮CLIPS🎮THINGS🎮VIDEOS🎮REACTS🎮STUFF🎮DONT MISS IT🎮", "Sub Sunday + PC Gaming Show Sunday"] */
    title: null | string;
    __typename: "Broadcast";
  };
  broadcaster: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    isPartner: boolean;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    followers: {
      /**
       * @format uint32
       * @example [0, 2430015, 2459534, 2471025, 2380069, 2380116]
       */
      totalCount: number;
      __typename: "FollowerConnection";
    };
    stream: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["316180784725"]
       */
      id: ID;
      /**
       * @format uint32
       * @example [0, 46802, 656, 1572, 1518, 1432]
       */
      viewersCount: number;
      __typename: "Stream";
    };
    lastBroadcast: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["317528086118"]
       */
      id: null | ID;
      /**
       * @format date-time
       * @example ["2026-05-31T15:40:42.92623Z", "2026-09-09T19:02:24.10084Z"]
       */
      startedAt: string;
      __typename: "Broadcast";
    };
    self: null | ContentClipsManagerClip_UserSelf | ContentClipsManagerClip_UserSelf[];
    __typename: "User";
  };
  /**
   * @example ["", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/thumb/thumb-0000000000-1920x1080.jpg", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b0181c83-be87-4dab-ad46-15dde4d81647/landscape/thumb/thumb-0000000000-1920x1080.jpg"]
   * @gqlArg `width: Int [480, 86, 147, 260]`
   * @gqlArg `height: Int [272, 45, 260, 147]`
   */
  thumbnailURL: string;
  /**
   * @format date-time
   * @example ["2020-12-09T19:18:10Z", "2021-04-04T21:34:33Z"]
   */
  createdAt: string;
  isFeatured: boolean;
  isCreatorProfile: boolean;
  hasCaptions: boolean;
  isPublished: boolean;
  /**
   * @format float
   * @example [16.21, 30.02, 43.93, 30.8, 58.38]
   */
  duration: number;
  /**
   * @format uint32
   * @example [44, 26, 25, 42, 30, 59, 36, 41, 60, 29]
   */
  durationSeconds: number;
  champBadge:
    | null
    | ContentClipsManagerClip_ClipChampBadge
    | ContentClipsManagerClip_ClipChampBadge[];
  playbackAccessToken: {
    /** @example ["deadbeefdeadbeefdeadbeefdeadbeefdeadbeef"] */
    signature: string;
    /** @example ["{\"authorization\":{\"forbidden\":false,\"reason\":\"\"},\"clip_uri\":\"https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/360/index.mp4\",\"clip_slug\":\"DeliciousDelightfulPicklesWOOP\",\"device_id\":null,\"expires\":1792252612,\"user_id\":\"\",\"version\":3}"] */
    value: string;
    __typename: "PlaybackAccessToken";
  };
  video: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["2323270866"]
     */
    id: ID;
    /** @example ["ARCHIVE", "HIGHLIGHT", "UPLOAD"] */
    broadcastType: string;
    /** @example ["Twitch Recap: 2024 according to Twitch Chat!", "Creator Camp LIVE: Streaming Basics with @Snackless & @KawaiiGuy"] */
    title: null | string;
    __typename: "Video";
  };
  /**
   * @format uint32
   * @example [7897, 11412, 12062, 2238]
   */
  videoOffsetSeconds: null | number;
  videoQualities:
    | null
    | {
        /** @example ["", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/1080/index.mp4", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/720/index.mp4"] */
        sourceURL: string;
        __typename: "ClipVideoQuality";
      }[];
  isViewerEditRestricted: boolean;
  suggestedCropping: null | PortraitClipCropping;
  /**
   * @format float
   * @example [0, 60.00499725341797, 56.01599884033203, 30.436817169189453, 79.97673034667969]
   */
  rawMediaRelativeOffset: number;
  /** @example ["", "j2_d65zIfMWahzTyTvGUvA", "Ns3-vDOR-6P0ss-aFGmgOw", "5V7n_TrusYjbKULZPgs8Og", "JKuXmAhwpagfsU2LJs367w"] */
  rawMediaKey: string;
  isCatalogDetected: null;
  catalogCheckState: null;
  __typename: "Clip";
};

/** ℹ️ Not real Twitch type name */
export type ContentClipsManagerClip_ClipChampBadge = {
  id: ID;
  __typename: string;
};

/** ℹ️ Not real Twitch type name */
export type ContentClipsManagerClip_UserSelf = {
  /** ⚠️ Low confidence about: nullable */
  isEditor: null | boolean;
  __typename: string;
};

export type CoreChannelWithHomePrefsFragment = CoreUserFragment & {
  stream: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["316180784725"]
     */
    id: ID;
    __typename: "Stream";
  };
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/657b6efd-e507-4df6-9cc5-25c3d1a67a3f-profile_banner-480.jpeg", "https://static-cdn.jtvnw.net/jtv_user_pictures/c51fdef0-593a-4cae-a308-2e8e7ce39e51-profile_banner-480.png"]
   */
  bannerImageURL: null | string;
  channel: {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    self: {
      /**
       * @pattern ^[0-9]+$
       * @example ["159498717"]
       */
      id: ID;
      isAuthorized: boolean;
      restrictionType: null;
      __typename: "ChannelSelfEdge";
    };
    trailer: {
      video: null | {
        /**
         * @pattern ^[0-9]+$
         * @example ["2323270866"]
         */
        id: ID;
        self: {
          viewingHistory:
            | null
            | CoreChannelWithHomePrefsFragment_VideoSelfEdgeViewingHistory
            | CoreChannelWithHomePrefsFragment_VideoSelfEdgeViewingHistory[];
          __typename: "VideoSelfEdge";
        };
        __typename: "Video";
      };
      __typename: "Trailer";
    };
    home: {
      preferences: {
        /** @example ["PRESET_2", "PRESET_1"] */
        heroPreset: string;
        __typename: "ChannelHomePreferences";
      };
      __typename: "ChannelHome";
    };
    __typename: "Channel";
  };
};

/** ℹ️ Not real Twitch type name */
export type CoreChannelWithHomePrefsFragment_VideoSelfEdgeViewingHistory = {
  /**
   * ⚠️ Low confidence about: nullable
   * @format date-time
   */
  updatedAt: null | string;
  __typename: string;
};

export type CoreUserFragment = {
  /**
   * @pattern ^[0-9]+$
   * @example ["12826"]
   */
  id: ID;
  /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
  login: string;
  /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
  displayName: string;
  /**
   * @pattern ^[0-9a-fA-F]{6}$
   * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
   */
  primaryColorHex: null | string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
   * @gqlArg `width: Int [50, 70, 300, 28, 150]`
   */
  profileImageURL: string;
  stream: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["316180784725"]
     */
    id: ID;
    /**
     * @format uint32
     * @example [0, 46802, 656, 1572, 1518, 1432]
     */
    viewersCount: number;
    __typename: "Stream";
  };
  __typename: "User";
};

export type CostreamingDiscoveryDetails = {
  /**
   * @format uint32
   * @example [0, 13, 14, 7, 6, 12, 1, 11]
   */
  costreamersCount: number;
  organizer: null | CostreamingUserWithViewcount;
  /** @example ["ORGANIZER", "COSTREAMER"] */
  role: string;
  topCostreamers: CostreamingUserWithViewcount[];
  /**
   * @format uint32
   * @example [53318, 665, 54790, 55713, 54158]
   */
  totalViewersCount: number;
  __typename: "CostreamDetails";
};

export type CostreamingUserWithViewcount = {
  /**
   * @pattern ^[0-9]+$
   * @example ["12826"]
   */
  id: ID;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
   * @gqlArg `width: Int [50, 70, 300, 28, 150]`
   */
  profileImageURL: string;
  /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
  login: string;
  /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
  displayName: string;
  stream: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["316180784725"]
     */
    id: ID;
    /**
     * @format uint32
     * @example [0, 46802, 656, 1572, 1518, 1432]
     */
    viewersCount: number;
    game: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["509672"]
       */
      id: ID;
      /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
      displayName: string;
      __typename: "Game";
    };
    __typename: "Stream";
  };
  broadcastSettings: {
    /**
     * @pattern ^[0-9]+$
     * @example ["71092938"]
     */
    id: ID;
    /** @example ["", "Blind playthrough of Terraria! Permadeath and Expert mode!", "YUNARA COSPLAY 🔥 HARDSTUCKING PLAT 🔥 !discord"] */
    title: string;
    __typename: "BroadcastSettings";
  };
  /**
   * @format uri
   * @example ["https://www.twitch.tv/eslcs", "https://www.twitch.tv/psp1g", "https://www.twitch.tv/mauisnake", "https://www.twitch.tv/heatoncs", "https://www.twitch.tv/coopertv", "https://www.twitch.tv/trottah", "https://www.twitch.tv/rocketleague"]
   */
  profileURL: string;
  __typename: "User";
};

export type CuratedTagFragment = {
  /** @example ["stream-o-ween-2026", "nopixel-v"] */
  id: ID;
  /** @example ["Stream-o-Ween", "Nopixel V", "EPL Katowice", "Valorant Champions 2026", "Shopping"] */
  displayName: string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/tag-icons/stream-o-ween-2026-c7725d44.png", "https://static-cdn.jtvnw.net/tag-icons/nopixel-v-a44ffc16.png"]
   */
  iconURL: string;
  /** @example ["EVENT_PAGE"] */
  routeTo: string;
  /** @example ["EVENT"] */
  type: string;
  __typename: "CuratedTag";
};

export type DirectoryPageGameStreamWithTagsEdge = {
  /** @example ["eyJvZmYiOjEsImJsayI6OCwic3ViIjp7IjEiOnsib2ZmIjoxLCJ0b3QiOjk5fSwiMiI6eyJvZmYiOjAsInRvdCI6MTgwfSwiMyI6eyJvZmYiOjAsInRvdCI6MH19fQ=="] */
  cursor: Cursor;
  node: null | DirectoryPageGameStreamWithTagsNode;
  /** @example ["abe58e00-047f-4208-9b5e-ea34ad741f4b:b38e858e-ce1b-484d-b6f5-49bfcc493531:MF|COLDSTART_TF2_006:RF|UNK:CG|UNK:CR|UNK:BL|UNK:FC|UNK:RK|0:CRK|0", "abe58e00-047f-4208-9b5e-ea34ad741f4b:49cf42ab-e007-41e6-b70c-b74be622093e:MF|COLDSTART_TF2_006:RF|UNK:CG|UNK:CR|UNK:BL|UNK:FC|UNK:RK|1:CRK|1"] */
  trackingID: null | ID;
  __typename: "StreamEdge";
};

export type DirectoryPageGameStreamWithTagsNode = {
  /**
   * @pattern ^[0-9]+$
   * @example ["316180784725"]
   */
  id: ID;
  /** @example ["🔴 G2 0:0 FUT | BO3 | IEM Cologne Major 2026 Stage 2 | @skywhywalker @m3wsu", "[ 20 тестов днк ] | !winline !tg"] */
  title: string;
  /**
   * @format uint32
   * @example [0, 46802, 656, 1572, 1518, 1432]
   */
  viewersCount: number;
  /**
   * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
   * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
   * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
   */
  previewImageURL: string;
  /**
   * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
   * @aliasFor previewImageURL
   * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
   * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
   */
  verticalPreviewImageURL: string;
  /**
   * @format uint32
   * @example [0, 1440, 1080, 720, 768, 936, 1200, 900, 1280, 864, 2160]
   */
  height: number;
  /**
   * @format uint32
   * @example [0, 2560, 1920, 1280, 1360, 1664]
   */
  width: number;
  isDualFormat: boolean;
  /**
   * @format date-time
   * @example ["2026-06-07T17:11:20Z", "2026-06-07T16:57:23Z"]
   * @directive include(if: $sortTypeIsRecency)
   */
  createdAt?: string;
  broadcaster: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    roles: null | {
      isPartner: boolean;
      isParticipatingDJ: boolean;
      __typename: "UserRoles";
    };
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    __typename: "User";
  };
  freeformTags: FreeformTagFragment[];
  curatedTags: null | CuratedTagFragment[];
  /** @example ["live"] */
  type: string;
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /**
     * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
     * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
     * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
     */
    boxArtURL: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    __typename: "Game";
  };
  previewThumbnailProperties: {
    /** @example ["BLUR_NOT_REQUIRED"] */
    blurReason: string;
    __typename: "PreviewThumbnailProperties";
  };
  contentClassificationLabels:
    | null
    | {
        /** @example ["MatureGame", "ProfanityVulgarity"] */
        id: ID;
        __typename: "ContentClassificationLabel";
      }[];
  /** @directive include(if: $includeCostreaming) */
  costreamDetails?: null | CostreamingDiscoveryDetails;
  __typename: "Stream";
};

export type FreeformTagFragment = {
  /** @example ["fft:CHANNEL:67708794:0", "fft:CHANNEL:233741947:0"] */
  id: ID;
  /** @example ["Русский", "English", "Major", "ESL", "IEM", "Major2026", "НаградыДляЗрителей"] */
  name: string;
  __typename: "FreeformTag";
};

export type GameClipsInput = {
  /** @format time */
  endAt?: null | string;
  /** @example ["LAST_WEEK"] */
  filter?: null | string;
  languages?: null | UnknownValue[];
  period?: null | ClipsPeriod;
  shouldFilterByDiscoverySetting?: null | boolean;
  /** @format time */
  startAt?: null | string;
};

export type GameOptions = {
  recommendationsContext?: null | RecommendationsContext;
  /** @example ["JIRA-VXP-2397"] */
  requestID?: null | ID;
  /** @example ["RELEVANCE", "VIEWER_COUNT"] */
  sort?: null | string;
  /** @example ["80427d95-bb46-42d3-bf4d-408e9bdca49a", "643fe658-c4fc-45f0-9aed-cbe54a7c1d10", "4d1eaa36-f750-4862-b7e9-d0a13970d535"] */
  tags?: null | string[];
};

export type GameStreamOptions = {
  /** @example ["EN", "ID", "CA", "DA", "DE", "ES", "FR", "IT", "HU", "NL", "NO", "PL", "PT", "RO", "SK", "FI", "SV", "TL", "VI", "TR", "CS", "EL", "BG", "RU", "UK", "AR", "MS", "HI", "TH", "ZH", "JA", "KO", "ASL", "OTHER"] */
  broadcasterLanguages?: null | string[];
  /** @example ["DropsEnabeled", "AskMeAnything", "GTARP"] */
  freeformTags?: null | string[];
  recommendationsContext?: null | RecommendationsContext;
  /** @example ["JIRA-VXP-2397"] */
  requestID?: null | ID;
  /** @example ["RELEVANCE", "VIEWER_COUNT"] */
  sort?: null | string;
  systemFilters?: null | UnknownValue[];
  tags?: null | UnknownValue[];
};

export type GlobalCheerInfo = {
  cheerConfig: {
    displayConfig: null | CheerDisplayConfig;
    groups: CheermoteGroup[];
    __typename: "GlobalCheerConfig";
  };
};

export type GuestStarUser = {
  /**
   * @pattern ^[0-9]+$
   * @example ["12826"]
   */
  id: ID;
  /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
  login: string;
  /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
  displayName: string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
   * @gqlArg `width: Int [50, 70, 300, 28, 150]`
   */
  profileImageURL: string;
  /**
   * @pattern ^[0-9a-fA-F]{6}$
   * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
   */
  primaryColorHex: null | string;
  /** @example ["", "Twitch is where thousands of communities come together for whatever, every day. "] */
  description: null | string;
  __typename: "User";
};

export type NeoCheermote = {
  /** @example ["Charity", "lirikCheer"] */
  id: ID;
  /** @example ["Charity", "lirikCheer", "Cheer", "cheerwhal", "Corgo", "Scoops", "uni"] */
  prefix: string;
  /** @example ["DISPLAY_ONLY", "CUSTOM", "DEFAULT", "FIRST_PARTY", "THIRD_PARTY"] */
  type: string;
  campaign: null | BitsCheermoteCampaign;
  tiers: {
    /** @example ["Charity;1", "Charity;100"] */
    id: ID;
    /**
     * @format int32
     * @example [1, 100, 1000, 5000, 10000]
     */
    bits: number;
    canShowInBitsCard: boolean;
    __typename: "CheermoteTier";
  }[];
  __typename: "Cheermote";
};

export type PortraitClipCropping = {
  /** @example ["STACKED", "FULL"] */
  portraitClipLayout: string;
  fullTemplateMetadata: null | {
    mainFrame: null | PortraitCropMetadata;
    __typename: "FullTemplateMetadata";
  };
  stackedTemplateMetadata: null | {
    topFrame: null | PortraitCropMetadata;
    bottomFrame: null | PortraitCropMetadata;
    __typename: "StackedTemplateMetadata";
  };
  __typename: "PortraitClipCropping";
};

export type PortraitCropMetadata = {
  topLeft: {
    /**
     * @format float
     * @example [0, 34.199440002441406, 21.875, 35.34000015258789, 29.809999465942383, 21.90999984741211]
     */
    xPercentage: number;
    /**
     * @format float
     * @example [0, 3.490000009536743, 100, 96.51000213623047, 5.909999847412109, 0.699999988079071]
     */
    yPercentage: number;
    __typename: "PortraitCropCoordinates";
  };
  bottomRight: {
    /**
     * @format float
     * @example [0, 34.199440002441406, 21.875, 35.34000015258789, 29.809999465942383, 21.90999984741211]
     */
    xPercentage: number;
    /**
     * @format float
     * @example [0, 3.490000009536743, 100, 96.51000213623047, 5.909999847412109, 0.699999988079071]
     */
    yPercentage: number;
    __typename: "PortraitCropCoordinates";
  };
  __typename: "PortraitCropMetadata";
};

export type PreviewCardClip = {
  /**
   * @pattern ^[0-9]+$
   * @example ["3942697259"]
   */
  id: ID;
  /** @example ["EphemeralEncouragingBulgogiPraiseIt-98gnj_-unqEO0uvs", "CredulousBlightedSquirrelOSkomodo-GdY_nETXjEzIz_gm"] */
  slug: string;
  /** @example ["xqc makes the wrong choice", "wow"] */
  title: string;
  /**
   * @format uint32
   * @example [0, 957063, 957456, 899934, 944919, 773854]
   */
  viewCount: number;
  curator: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    __typename: "User";
  };
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
     * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
     * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
     */
    boxArtURL: string;
    __typename: "Game";
  };
  broadcaster: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    roles: null | {
      isPartner: boolean;
      __typename: "UserRoles";
    };
    __typename: "User";
  };
  broadcastIdentifier: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["40884298782"]
     */
    id: ID;
    __typename: "BroadcastIdOnly";
  };
  /**
   * @example ["", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/thumb/thumb-0000000000-1920x1080.jpg", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b0181c83-be87-4dab-ad46-15dde4d81647/landscape/thumb/thumb-0000000000-1920x1080.jpg"]
   * @gqlArg `width: Int [480, 86, 147, 260]`
   * @gqlArg `height: Int [272, 45, 260, 147]`
   */
  thumbnailURL: string;
  /**
   * @format date-time
   * @example ["2020-12-09T19:18:10Z", "2021-04-04T21:34:33Z"]
   */
  createdAt: string;
  /**
   * @format uint32
   * @example [44, 26, 25, 42, 30, 59, 36, 41, 60, 29]
   */
  durationSeconds: number;
  isFeatured: boolean;
  isAutoCurated: boolean;
  guestStarParticipants: null | {
    guests: null | (null | GuestStarUser)[];
    /** @example ["", "3CEyMILAYQr4KUGLBuhHP8asnMl", "2zt9iFeTrg9NYlEqDpS08hN1ceK", "3DagLgmipaavhol4IwR6Guj2bXp", "36l4VxQ8rIvWizU3zAYBN5nSYaR", "35cwby7kRuiegmBTvrmSGvhDqrq", "34FWSU9wT8Tu0M0faXMkFglhg8J", "2xuGcZE7CjcTv4GeUJGui6j6gEj"] */
    sessionIdentifier: string;
    __typename: "GuestStarParticipants";
  };
  previewThumbnailProperties: {
    /** @example ["BLUR_NOT_REQUIRED"] */
    blurReason: string;
    __typename: "PreviewThumbnailProperties";
  };
  __typename: "Clip";
};

export type PreviewCardVideo = {
  /**
   * @format uri
   * @example ["https://d2nvs31859zcd8.cloudfront.net/e36626ab08daadc25b61_kaicenat_319540864471_1791756204/storyboards/2898319844-strip-0.jpg", "https://d3stzm2eumvgb4.cloudfront.net/5d3be5c69f98448f1ff0_auronplay_318005137636_1791903291/storyboards/2899708479-strip-0.jpg"]
   */
  animatedPreviewURL: string;
  game: null | {
    /**
     * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
     * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
     * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
     */
    boxArtURL: string;
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    __typename: "Game";
  };
  broadcastIdentifier: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["40884298782"]
     */
    id: ID;
    __typename: "BroadcastIdOnly";
  };
  /**
   * @pattern ^[0-9]+$
   * @example ["2323270866"]
   */
  id: ID;
  /**
   * @format uint32
   * @example [15389, 4621, 621, 4472, 58]
   */
  lengthSeconds: number;
  owner: null | {
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    roles: null | {
      isPartner: boolean;
      __typename: "UserRoles";
    };
    __typename: "User";
  };
  /**
   * @example ["https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/82ef4729c6011d6072e2_twitch_43295848617_1733849129//thumb/thumb0-90x60.jpg", "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/4087ab6ee325487ff1cb_twitch_317752962300_1741891679//thumb/thumb0-90x60.jpg"]
   * @gqlArg `width: Int [320, 90, 640, 240, 400, 1280, 80, 160, 214]`
   * @gqlArg `height: Int [180, 60, 360, 135, 225, 480, 720, 51, 45, 90]`
   */
  previewThumbnailURL: string;
  /**
   * @format date-time
   * @example ["2024-12-10T16:45:35Z", "2025-03-13T18:48:05Z"]
   */
  publishedAt: string;
  self: {
    isRestricted: boolean;
    viewingHistory:
      | null
      | PreviewCardVideo_VideoSelfEdgeViewingHistory
      | PreviewCardVideo_VideoSelfEdgeViewingHistory[];
    __typename: "VideoSelfEdge";
  };
  /** @example ["Twitch Recap: 2024 according to Twitch Chat!", "Creator Camp LIVE: Streaming Basics with @Snackless & @KawaiiGuy"] */
  title: null | string;
  /**
   * @format uint32
   * @example [0, 772963, 171376, 163669, 1911, 684]
   */
  viewCount: number;
  resourceRestriction: null | ResourceRestriction;
  contentTags: null | TagFragment[];
  /** @directive include(if: $includePreviewBlur) */
  previewThumbnailProperties?: {
    /** @example ["BLUR_NOT_REQUIRED"] */
    blurReason: string;
    __typename: "PreviewThumbnailProperties";
  };
  __typename: "Video";
};

/** ℹ️ Not real Twitch type name */
export type PreviewCardVideo_VideoSelfEdgeViewingHistory = {
  position: UnknownValue;
  /**
   * ⚠️ Low confidence about: nullable
   * @format date-time
   */
  updatedAt: null | string;
  __typename: string;
};

export type PreviewCollection = CollectionFields & { items: null | CollectionConnectionFields };

export type RecommendationsContext = {
  /** @example ["twilight"] */
  clientApp?: null | string;
  /** @example ["home"] */
  location?: null | string;
  /** @example ["web"] */
  platform?: null | string;
  /** @example [""] */
  referrerDomain?: null | string;
  /**
   * @format uint32
   * @example [720]
   */
  viewportHeight?: null | number;
  /**
   * @format uint32
   * @example [1280]
   */
  viewportWidth?: null | number;
};

export type RelatedLiveChannelsFragment = {
  edges: {
    /**
     * @format uuid
     * @example ["02275919-7bab-4b51-ae55-1653ac535f5c"]
     */
    trackingID: ID;
    item: SearchRelatedLiveChannelFragment;
    __typename: "SearchForEdgeRelatedLiveChannels";
  }[];
  /**
   * @format int32
   * @example [3, 2]
   */
  score: null | number;
  __typename: "SearchForResultRelatedLiveChannels";
};

export type ResourceRestriction = {
  /** @example ["vod:2397382584"] */
  id: ID;
  /** @example ["SUB_ONLY_LIVE"] */
  type: string;
  exemptions: {
    /** @example ["STAFF", "SITE_ADMIN", "PRODUCT", "PREVIEW"] */
    type: string;
    actions: {
      /** @example ["spookodey", "spookodey_2000", "spookodey_3000"] */
      name: string;
      /** @example ["Subscription (spookodey)", "Subscription (spookodey): Tier 2 Sub", "Subscription (spookodey): Tier 3 Sub"] */
      title: string;
      __typename: "ResourceRestrictionExemptionAction";
    }[];
    __typename: "ResourceRestrictionExemption";
  }[];
  /** @example ["ALLOW_ALL_TIERS"] */
  options: string[];
  __typename: "ResourceRestriction";
};

export type SearchForChannelsFragment = {
  /** @example ["", "MTA="] */
  cursor: Cursor;
  edges: {
    /**
     * @format uuid
     * @example ["1b7a69f0-721d-4467-a4f9-eb1e2f7646e7"]
     */
    trackingID: ID;
    item:
      | SearchForUserFragment
      | SearchForVideoFragment
      | SearchForGameFragment
      | SearchForCollectionFragment;
    __typename: "SearchForEdge";
  }[];
  /**
   * @format int32
   * @example [0, 1, 2, 4]
   */
  score: number;
  /**
   * @format uint32
   * @example [0, 2235, 2752, 10834, 19999, 11163]
   */
  totalMatches: number;
  __typename: "SearchForResultUsers";
};

export type SearchForChannelsWithTagFragment = {
  /** @example ["", "MTA="] */
  cursor: Cursor;
  edges: {
    /**
     * @format uuid
     * @example ["1b7a69f0-721d-4467-a4f9-eb1e2f7646e7"]
     */
    trackingID: ID;
    item:
      | SearchForUserFragment
      | SearchForVideoFragment
      | SearchForGameFragment
      | SearchForCollectionFragment;
    __typename: "SearchForEdge";
  }[];
  /**
   * @format int32
   * @example [0, 1, 2, 4]
   */
  score: number;
  /**
   * @format uint32
   * @example [0, 2235, 2752, 10834, 19999, 11163]
   */
  totalMatches: number;
  __typename: "SearchForResultUsers";
};

export type SearchForCollectionFragment = {
  /** @example ["collection-just-chatting-irl-streams"] */
  id: ID;
  /** @aliasFor name */
  collectionName: null | {
    /** @example ["Just Chatting & IRL"] */
    fallbackLocalizedTitle: string;
    __typename: "BrowsableCollectionTitle";
  };
  /** @example ["just-chatting-irl-streams"] */
  slug: string;
  __typename: "BrowsableCollection";
};

export type SearchForCollectionsFragment = {
  /** @example [""] */
  cursor: Cursor;
  edges: {
    /** ⚠️ Low confidence about: nullable */
    trackingID: null | ID;
    item:
      | null
      | SearchForCollectionFragment
      | SearchForVideoFragment
      | SearchForGameFragment
      | SearchForUserFragment;
    __typename: string;
  }[];
  /**
   * @format int32
   * @example [0]
   */
  score: number;
  /**
   * @format uint32
   * @example [0]
   */
  totalMatches: number;
  __typename: "SearchForResultCollections";
};

export type SearchForFeaturedClipFragment = {
  /**
   * @pattern ^[0-9]+$
   * @example ["3942697259"]
   */
  id: ID;
  /** @example ["xqc makes the wrong choice", "wow"] */
  title: string;
  /** @example ["EphemeralEncouragingBulgogiPraiseIt-98gnj_-unqEO0uvs", "CredulousBlightedSquirrelOSkomodo-GdY_nETXjEzIz_gm"] */
  slug: string;
  /**
   * @format uint32
   * @example [0, 957063, 957456, 899934, 944919, 773854]
   */
  viewCount: number;
  /**
   * @format uint32
   * @example [44, 26, 25, 42, 30, 59, 36, 41, 60, 29]
   */
  durationSeconds: number;
  /**
   * @example ["", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/thumb/thumb-0000000000-1920x1080.jpg", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b0181c83-be87-4dab-ad46-15dde4d81647/landscape/thumb/thumb-0000000000-1920x1080.jpg"]
   * @gqlArg `width: Int [480, 86, 147, 260]`
   * @gqlArg `height: Int [272, 45, 260, 147]`
   */
  thumbnailURL: string;
  assets: ClipAssetFragment[];
  broadcaster: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    __typename: "User";
  };
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    __typename: "Game";
  };
  previewThumbnailProperties: {
    /** @example ["BLUR_NOT_REQUIRED"] */
    blurReason: string;
    __typename: "PreviewThumbnailProperties";
  };
  __typename: "Clip";
};

export type SearchForFeaturedVideoFragment = {
  /**
   * @pattern ^[0-9]+$
   * @example ["2323270866"]
   */
  id: ID;
  /** @example ["RECORDING", "RECORDED"] */
  status: string;
  /**
   * @format uint32
   * @example [15389, 4621, 621, 4472, 58]
   */
  lengthSeconds: number;
  /** @example ["Twitch Recap: 2024 according to Twitch Chat!", "Creator Camp LIVE: Streaming Basics with @Snackless & @KawaiiGuy"] */
  title: null | string;
  /**
   * @format uint32
   * @example [0, 772963, 171376, 163669, 1911, 684]
   */
  viewCount: number;
  /**
   * @format date-time
   * @example ["2024-12-10T16:45:35Z", "2025-03-13T18:48:05Z"]
   */
  createdAt: string;
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    __typename: "Game";
  };
  /**
   * @example ["https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/82ef4729c6011d6072e2_twitch_43295848617_1733849129//thumb/thumb0-90x60.jpg", "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/4087ab6ee325487ff1cb_twitch_317752962300_1741891679//thumb/thumb0-90x60.jpg"]
   * @gqlArg `width: Int [320, 90, 640, 240, 400, 1280, 80, 160, 214]`
   * @gqlArg `height: Int [180, 60, 360, 135, 225, 480, 720, 51, 45, 90]`
   */
  previewThumbnailURL: string;
  /**
   * @example ["https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/82ef4729c6011d6072e2_twitch_43295848617_1733849129//thumb/thumb0-90x60.jpg", "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/4087ab6ee325487ff1cb_twitch_317752962300_1741891679//thumb/thumb0-90x60.jpg"]
   * @aliasFor previewThumbnailURL
   * @gqlArg `width: Int [320, 90, 640, 240, 400, 1280, 80, 160, 214]`
   * @gqlArg `height: Int [180, 60, 360, 135, 225, 480, 720, 51, 45, 90]`
   */
  templatePreviewThumbnailURL: string;
  previewThumbnailProperties: {
    /** @example ["BLUR_NOT_REQUIRED"] */
    blurReason: string;
    __typename: "PreviewThumbnailProperties";
  };
  __typename: "Video";
};

export type SearchForGameFragment = {
  /**
   * @pattern ^[0-9]+$
   * @example ["509672"]
   */
  id: ID;
  /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
  slug: string;
  /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
  name: string;
  /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
  displayName: string;
  /**
   * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
   * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
   * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
   */
  boxArtURL: string;
  /**
   * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
   * @aliasFor boxArtURL
   * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
   * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
   */
  templateBoxArtURL: string;
  tags: TagFragment[];
  /**
   * @format uint32
   * @example [584353, 2909, 484662, 92801, 444549]
   */
  viewersCount: null | number;
  __typename: "Game";
};

export type SearchForGamesFragment = {
  /** @example ["", "MTA="] */
  cursor: Cursor;
  edges: {
    /**
     * @format uuid
     * @example ["1b7a69f0-721d-4467-a4f9-eb1e2f7646e7"]
     */
    trackingID: ID;
    item:
      | SearchForGameFragment
      | SearchForVideoFragment
      | SearchForUserFragment
      | SearchForCollectionFragment;
    __typename: "SearchForEdge";
  }[];
  /**
   * @format int32
   * @example [0, 4, 3]
   */
  score: number;
  /**
   * @format uint32
   * @example [0, 6, 10000, 25, 259, 1547]
   */
  totalMatches: number;
  __typename: "SearchForResultGames";
};

export type SearchForOptions = {
  shouldSkipDiscoveryControl: boolean;
  targets: {
    /** @example ["CHANNEL", "CHANNEL_WITH_TAG", "GAME", "VOD"] */
    index: string;
  }[];
};

export type SearchForQuerySubstitutionFragment = {
  edges: {
    item: null | {
      /** @example ["collection-just-chatting-irl-streams"] */
      id: ID;
      name: null | {
        /** @example ["Just Chatting & IRL"] */
        fallbackLocalizedTitle: string;
        __typename: "BrowsableCollectionTitle";
      };
      /** @example ["just-chatting-irl-streams"] */
      slug: string;
      __typename: "BrowsableCollection";
    };
    __typename: string;
  }[];
  __typename: "SearchForResultSubstitution";
};

export type SearchForScheduleSegmentFragment = {
  /** @example ["eyJzZWdtZW50SUQiOiJiNzU0MDEzZC1iOTRlLTRlNmEtYWFmYi03YmM0NmMzNDEzODciLCJpc29ZZWFyIjoyMDI2LCJpc29XZWVrIjozOH0=", "eyJzZWdtZW50SUQiOiIxMTc3MDkxYi1hNzEzLTQ4YjMtOTdlOS1lM2RmMjFlOThlN2QiLCJpc29ZZWFyIjoyMDI2LCJpc29XZWVrIjoyNH0="] */
  id: ID;
  /**
   * @format date-time
   * @example ["2026-09-20T16:00:00Z", "2026-06-09T13:00:00Z"]
   */
  startAt: string;
  /**
   * @format date-time
   * @example ["2026-06-09T19:00:00Z", "2026-06-08T23:00:00Z"]
   */
  endAt: null | string;
  /** @example ["", "PC STREAM ", "🍕 Games and Dank Shit!"] */
  title: string;
  hasReminder: boolean;
  categories: {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    __typename: "Game";
  }[];
  __typename: "ScheduleSegment";
};

export type SearchForUserFragment = {
  broadcastSettings: {
    /**
     * @pattern ^[0-9]+$
     * @example ["71092938"]
     */
    id: ID;
    /** @example ["", "Blind playthrough of Terraria! Permadeath and Expert mode!", "YUNARA COSPLAY 🔥 HARDSTUCKING PLAT 🔥 !discord"] */
    title: string;
    __typename: "BroadcastSettings";
  };
  /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
  displayName: string;
  followers: {
    /**
     * @format uint32
     * @example [0, 2430015, 2459534, 2471025, 2380069, 2380116]
     */
    totalCount: number;
    __typename: "FollowerConnection";
  };
  /**
   * @pattern ^[0-9]+$
   * @example ["12826"]
   */
  id: ID;
  lastBroadcast: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["317528086118"]
     */
    id: null | ID;
    /**
     * @format date-time
     * @example ["2026-05-31T15:40:42.92623Z", "2026-09-09T19:02:24.10084Z"]
     */
    startedAt: string;
    __typename: "Broadcast";
  };
  /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
  login: string;
  /**
   * @pattern ^[0-9a-fA-F]{6}$
   * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
   */
  primaryColorHex: null | string;
  /**
   * @format uri
   * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
   * @gqlArg `width: Int [50, 70, 300, 28, 150]`
   */
  profileImageURL: string;
  /** @example ["", "Twitch is where thousands of communities come together for whatever, every day. "] */
  description: null | string;
  channel: {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    schedule: null | {
      /** @example ["schedule-12826", "schedule-23161357"] */
      id: ID;
      nextSegment: null | SearchForScheduleSegmentFragment;
      __typename: "Schedule";
    };
    contentClassificationLabels: {
      /** @example ["MatureGame", "ProfanityVulgarity"] */
      id: ID;
      __typename: "ContentClassificationLabel";
    }[];
    __typename: "Channel";
  };
  self: null | SearchForUserFragment_UserSelf | SearchForUserFragment_UserSelf[];
  /** @aliasFor videos */
  latestVideo: null | {
    edges: {
      node: null | SearchForFeaturedVideoFragment;
      __typename: "VideoEdge";
    }[];
    __typename: "VideoConnection";
  };
  /** @aliasFor clips */
  topClip: null | {
    edges: {
      node: null | SearchForFeaturedClipFragment;
      __typename: "ClipEdge";
    }[];
    __typename: "ClipConnection";
  };
  roles: null | {
    isPartner: boolean;
    isParticipatingDJ: boolean;
    __typename: "UserRoles";
  };
  stream: null | {
    game: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["509672"]
       */
      id: ID;
      /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
      slug: string;
      /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
      name: string;
      /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
      displayName: string;
      __typename: "Game";
    };
    /**
     * @pattern ^[0-9]+$
     * @example ["316180784725"]
     */
    id: ID;
    /**
     * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
     * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
     * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
     */
    previewImageURL: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
     * @aliasFor previewImageURL
     * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
     * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
     */
    largePreviewImageURL: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
     * @aliasFor previewImageURL
     * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
     * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
     */
    verticalPreviewImageURL: string;
    /**
     * @format uint32
     * @example [0, 1440, 1080, 720, 768, 936, 1200, 900, 1280, 864, 2160]
     */
    height: number;
    /**
     * @format uint32
     * @example [0, 2560, 1920, 1280, 1360, 1664]
     */
    width: number;
    isDualFormat: boolean;
    /**
     * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
     * @aliasFor previewImageURL
     * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
     * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
     */
    templatePreviewImageURL: string;
    freeformTags: FreeformTagFragment[];
    /** @example ["live"] */
    type: string;
    /**
     * @format uint32
     * @example [0, 46802, 656, 1572, 1518, 1432]
     */
    viewersCount: number;
    contentClassificationLabels:
      | null
      | {
          /** @example ["MatureGame", "ProfanityVulgarity"] */
          id: ID;
          __typename: "ContentClassificationLabel";
        }[];
    previewThumbnailProperties: {
      /** @example ["BLUR_NOT_REQUIRED"] */
      blurReason: string;
      __typename: "PreviewThumbnailProperties";
    };
    __typename: "Stream";
  };
  __typename: "User";
};

/** ℹ️ Not real Twitch type name */
export type SearchForUserFragment_UserSelf = {
  canFollow: UnknownValue;
  follower:
    | null
    | SearchForUserFragment_UserSelfFollower
    | SearchForUserFragment_UserSelfFollower[];
  __typename: string;
};

/** ℹ️ Not real Twitch type name */
export type SearchForUserFragment_UserSelfFollower = {
  disableNotifications: UnknownValue;
  __typename: string;
};

export type SearchForVideoFragment = {
  /**
   * @format date-time
   * @example ["2024-12-10T16:45:35Z", "2025-03-13T18:48:05Z"]
   */
  createdAt: string;
  owner: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    roles: null | {
      isPartner: boolean;
      __typename: "UserRoles";
    };
    __typename: "User";
  };
  /**
   * @pattern ^[0-9]+$
   * @example ["2323270866"]
   */
  id: ID;
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    __typename: "Game";
  };
  /**
   * @format uint32
   * @example [15389, 4621, 621, 4472, 58]
   */
  lengthSeconds: number;
  /**
   * @example ["https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/82ef4729c6011d6072e2_twitch_43295848617_1733849129//thumb/thumb0-90x60.jpg", "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/4087ab6ee325487ff1cb_twitch_317752962300_1741891679//thumb/thumb0-90x60.jpg"]
   * @gqlArg `width: Int [320, 90, 640, 240, 400, 1280, 80, 160, 214]`
   * @gqlArg `height: Int [180, 60, 360, 135, 225, 480, 720, 51, 45, 90]`
   */
  previewThumbnailURL: string;
  /**
   * @example ["https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/82ef4729c6011d6072e2_twitch_43295848617_1733849129//thumb/thumb0-90x60.jpg", "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/4087ab6ee325487ff1cb_twitch_317752962300_1741891679//thumb/thumb0-90x60.jpg"]
   * @aliasFor previewThumbnailURL
   * @gqlArg `width: Int [320, 90, 640, 240, 400, 1280, 80, 160, 214]`
   * @gqlArg `height: Int [180, 60, 360, 135, 225, 480, 720, 51, 45, 90]`
   */
  templatePreviewThumbnailURL: string;
  /** @example ["Twitch Recap: 2024 according to Twitch Chat!", "Creator Camp LIVE: Streaming Basics with @Snackless & @KawaiiGuy"] */
  title: null | string;
  /**
   * @format uint32
   * @example [0, 772963, 171376, 163669, 1911, 684]
   */
  viewCount: number;
  previewThumbnailProperties: {
    /** @example ["BLUR_NOT_REQUIRED"] */
    blurReason: string;
    __typename: "PreviewThumbnailProperties";
  };
  __typename: "Video";
};

export type SearchForVideosFragment = {
  /** @example ["", "MTA="] */
  cursor: Cursor;
  edges: {
    /**
     * @format uuid
     * @example ["1b7a69f0-721d-4467-a4f9-eb1e2f7646e7"]
     */
    trackingID: ID;
    item:
      | SearchForVideoFragment
      | SearchForUserFragment
      | SearchForGameFragment
      | SearchForCollectionFragment;
    __typename: "SearchForEdge";
  }[];
  /**
   * @format int32
   * @example [0, 5]
   */
  score: number;
  /**
   * @format uint32
   * @example [0, 495, 406, 423, 10000, 432]
   */
  totalMatches: number;
  __typename: "SearchForResultVideos";
};

export type SearchRelatedLiveChannelFragment = {
  /**
   * @pattern ^[0-9]+$
   * @example ["12826"]
   */
  id: ID;
  stream: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["316180784725"]
     */
    id: ID;
    /**
     * @format uint32
     * @example [0, 46802, 656, 1572, 1518, 1432]
     */
    viewersCount: number;
    /**
     * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
     * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
     * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
     */
    previewImageURL: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
     * @aliasFor previewImageURL
     * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
     * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
     */
    verticalPreviewImageURL: string;
    /**
     * @format uint32
     * @example [0, 1440, 1080, 720, 768, 936, 1200, 900, 1280, 864, 2160]
     */
    height: number;
    /**
     * @format uint32
     * @example [0, 2560, 1920, 1280, 1360, 1664]
     */
    width: number;
    isDualFormat: boolean;
    /**
     * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
     * @aliasFor previewImageURL
     * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
     * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
     */
    templatePreviewImageURL: string;
    game: null | {
      /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
      name: string;
      /**
       * @pattern ^[0-9]+$
       * @example ["509672"]
       */
      id: ID;
      /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
      slug: string;
      __typename: "Game";
    };
    broadcaster: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["12826"]
       */
      id: ID;
      /**
       * @pattern ^[0-9a-fA-F]{6}$
       * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
       */
      primaryColorHex: null | string;
      /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
      login: string;
      /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
      displayName: string;
      broadcastSettings: {
        /**
         * @pattern ^[0-9]+$
         * @example ["71092938"]
         */
        id: ID;
        /** @example ["", "Blind playthrough of Terraria! Permadeath and Expert mode!", "YUNARA COSPLAY 🔥 HARDSTUCKING PLAT 🔥 !discord"] */
        title: string;
        __typename: "BroadcastSettings";
      };
      roles: null | {
        isPartner: boolean;
        isParticipatingDJ: boolean;
        __typename: "UserRoles";
      };
      __typename: "User";
    };
    previewThumbnailProperties: {
      /** @example ["BLUR_NOT_REQUIRED"] */
      blurReason: string;
      __typename: "PreviewThumbnailProperties";
    };
    __typename: "Stream";
  };
  __typename: "User";
};

export type SearchSuggestionNode = {
  node: {
    content:
      | null
      | {
          /** @example ["collection-forsaken-roblox", "33214"] */
          id: ID;
          isLive: boolean;
          isVerified: boolean;
          /** @example ["f0rest", "forsen", "forsen_42", "f0rsakenwow", "prxf0rsaken", "forsa", "forseenboy"] */
          login: string;
          /**
           * @format uri
           * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/d2e480bb-5c99-48ea-b6e2-5398042afcdc-profile_image-50x50.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/forsen-profile_image-48b43e1e4f54b5c8-50x50.png"]
           * @gqlArg `width: Int [50]`
           */
          profileImageURL: string;
          user: {
            /**
             * @pattern ^[0-9]+$
             * @example ["12826"]
             */
            id: ID;
            roles: null | {
              isParticipatingDJ: boolean;
              __typename: "UserRoles";
            };
            stream: null | {
              /**
               * @pattern ^[0-9]+$
               * @example ["316180784725"]
               */
              id: ID;
              /**
               * @format uint32
               * @example [0, 46802, 656, 1572, 1518, 1432]
               */
              viewersCount: number;
              game: null | {
                /**
                 * @pattern ^[0-9]+$
                 * @example ["509672"]
                 */
                id: ID;
                /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
                displayName: string;
                __typename: "Game";
              };
              broadcaster: null | {
                /**
                 * @pattern ^[0-9]+$
                 * @example ["12826"]
                 */
                id: ID;
                broadcastSettings: {
                  /**
                   * @pattern ^[0-9]+$
                   * @example ["71092938"]
                   */
                  id: ID;
                  /** @example ["", "Blind playthrough of Terraria! Permadeath and Expert mode!", "YUNARA COSPLAY 🔥 HARDSTUCKING PLAT 🔥 !discord"] */
                  title: string;
                  __typename: "BroadcastSettings";
                };
                __typename: "User";
              };
              __typename: "Stream";
            };
            __typename: "User";
          };
          __typename: "SearchSuggestionChannel";
        }
      | {
          /** @example ["collection-forsaken-roblox", "33214"] */
          id: ID;
          /**
           * @format uri
           * @example ["https://static-cdn.jtvnw.net/ttv-boxart/33214-60x80.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/1757732267_IGDB-60x80.jpg"]
           * @gqlArg `width: Int [60]`
           * @gqlArg `height: Int [80]`
           */
          boxArtURL: string;
          game: {
            /**
             * @pattern ^[0-9]+$
             * @example ["509672"]
             */
            id: ID;
            /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
            slug: string;
            __typename: "Game";
          };
          __typename: "SearchSuggestionCategory";
        }
      | {
          /** @example ["collection-forsaken-roblox", "33214"] */
          id: ID;
          /** @example ["forsaken-roblox"] */
          slug: string;
          __typename: "SearchSuggestionCollection";
        };
    matchingCharacters: null | {
      /**
       * @format int32
       * @example [0, 6]
       */
      start: number;
      /**
       * @format int32
       * @example [0, 3, 9, 5, 6, 4]
       */
      end: number;
      __typename: "SearchSuggestionHighlight";
    };
    /**
     * @format uuid
     * @example ["0ee14685-0006-4d50-b361-ba707db6cc19"]
     */
    id: ID;
    /** @example ["Fortnite", "Forza Horizon 5", "Forza Horizon 6", "Delta Force", "For Honor", "ROBLOX", "Forsaken"] */
    text: string;
    __typename: "SearchSuggestion";
  };
  __typename: "SearchSuggestionEdge";
};

export type ShelfPreviewCardClip = {
  /**
   * @pattern ^[0-9]+$
   * @example ["3942697259"]
   */
  id: ID;
  /** @example ["EphemeralEncouragingBulgogiPraiseIt-98gnj_-unqEO0uvs", "CredulousBlightedSquirrelOSkomodo-GdY_nETXjEzIz_gm"] */
  slug: string;
  /**
   * @example ["xqc makes the wrong choice", "wow"]
   * @aliasFor title
   */
  clipTitle: string;
  /**
   * @format uint32
   * @example [0, 957063, 957456, 899934, 944919, 773854]
   * @aliasFor viewCount
   */
  clipViewCount: number;
  curator: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    __typename: "User";
  };
  /** @aliasFor game */
  clipGame: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
     * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
     * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
     */
    boxArtURL: string;
    __typename: "Game";
  };
  broadcaster: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    roles: null | {
      isPartner: boolean;
      __typename: "UserRoles";
    };
    __typename: "User";
  };
  broadcastIdentifier: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["40884298782"]
     */
    id: ID;
    __typename: "BroadcastIdOnly";
  };
  /**
   * @example ["", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/thumb/thumb-0000000000-1920x1080.jpg", "https://static-cdn.jtvnw.net/twitch-video-assets/twitch-vap-video-assets-prod-us-west-2/b0181c83-be87-4dab-ad46-15dde4d81647/landscape/thumb/thumb-0000000000-1920x1080.jpg"]
   * @gqlArg `width: Int [480, 86, 147, 260]`
   * @gqlArg `height: Int [272, 45, 260, 147]`
   */
  thumbnailURL: string;
  /**
   * @format date-time
   * @example ["2020-12-09T19:18:10Z", "2021-04-04T21:34:33Z"]
   */
  createdAt: string;
  /**
   * @format uint32
   * @example [44, 26, 25, 42, 30, 59, 36, 41, 60, 29]
   */
  durationSeconds: number;
  isFeatured: boolean;
  isAutoCurated: boolean;
  guestStarParticipants: null | {
    guests: null | (null | GuestStarUser)[];
    /** @example ["", "3CEyMILAYQr4KUGLBuhHP8asnMl", "2zt9iFeTrg9NYlEqDpS08hN1ceK", "3DagLgmipaavhol4IwR6Guj2bXp", "36l4VxQ8rIvWizU3zAYBN5nSYaR", "35cwby7kRuiegmBTvrmSGvhDqrq", "34FWSU9wT8Tu0M0faXMkFglhg8J", "2xuGcZE7CjcTv4GeUJGui6j6gEj"] */
    sessionIdentifier: string;
    __typename: "GuestStarParticipants";
  };
  __typename: "Clip";
};

export type SocialMedia = {
  /**
   * @format uuid
   * @example ["158c5f04-b28c-4fb8-882c-ef3d87e3b8ac"]
   */
  id: ID;
  /** @example ["twitter", "instagram", "tiktok", "youtube", "discord", "reddit", "YouTube"] */
  name: string;
  /** @example ["Twitter", "Instagram", "TikTok", "YouTube", "Discord", "reddit", "youtube"] */
  title: string;
  /** @example ["https://www.tiktok.com/@staryuukiii ", "https://twitter.com/twitch", "https://www.instagram.com/twitch/", "https://www.tiktok.com/@twitch", "https://www.youtube.com/twitch", "https://twitter.com/xQc", "https://discord.com/invite/xqcow", "https://www.reddit.com/r/xqcow/"] */
  url: string;
  __typename: "SocialMedia";
};

export type TagFragment = {
  /**
   * @format uuid
   * @example ["80427d95-bb46-42d3-bf4d-408e9bdca49a"]
   */
  id: ID;
  isLanguageTag: boolean;
  /** @example ["Adventure Game", "MMO", "IRL", "FPS", "Shooter", "Action", "Strategy"] */
  localizedName: string;
  /** @example ["Adventure Game", "MMO", "IRL", "FPS", "Shooter", "Action", "Strategy"] */
  tagName: string;
  __typename: "Tag";
};

export type UserBioVideo = {
  node: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["2323270866"]
     */
    id: ID;
    game: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["509672"]
       */
      id: ID;
      /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
      displayName: string;
      __typename: "Game";
    };
    /** @example ["RECORDING", "RECORDED"] */
    status: string;
    __typename: "Video";
  };
  __typename: "VideoEdge";
};

/** ℹ️ Not real Twitch type name */
export type UserClipsCriteriaSort = "VIEWS_DESC";

export type UserClipsInput = {
  /** @example ["ALL_TIME", "LAST_WEEK", "LAST_DAY"] */
  filter?: null | string;
  isFeatured?: null | boolean;
  period?: null | ClipsPeriod;
  shouldFilterByDiscoverySetting?: null | boolean;
  sort?: null | UserClipsCriteriaSort;
};

export type UserLookupType = "ACTIVE" | "ALL";

export type VideoAccessTokenClipAsset = {
  /** @example ["ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/LANDSCAPE", "c8e52370-1429-4023-9ce8-9d016939e3c2/LANDSCAPE"] */
  id: ID;
  /**
   * @format float
   * @example [1.7777777777777777, 0.5625, 0.5627198124267292, 1.7770833333333333, 1.775]
   */
  aspectRatio: number;
  /**
   * @format date-time
   * @example ["2026-06-07T01:55:09.68177848Z", "2026-10-11T17:11:21.793692021Z"]
   */
  createdAt: string;
  videoQualities: {
    /**
     * @format uint32
     * @example [0, 8042862, 2732768, 945904, 781712, 7159557]
     */
    bitrate: number;
    /** @example ["", "avc1.64002A,mp4a.40.2", "hvc1.1.6.L123.90", "hvc1.1.6.L120.90", "hvc1.1.6.L90.90", "hvc1.1.6.L63.90", "hvc1.1.6.L150.90", "avc1.4D001F"] */
    codecs: string;
    /**
     * @format float
     * @example [0, 60, 30.03076934814453, 60.01000213623047, 30.005001068115234, 60.0133362969549]
     */
    frameRate: number;
    /**
     * @format int32
     * @example [0, -1, 1080, 720, 480, 360, 1600]
     */
    height: number;
    /** @example ["-1", "1080", "720", "480", "360", "900", "1170", "756"] */
    quality: string;
    /** @example ["", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/1080/index.mp4", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/720/index.mp4"] */
    sourceURL: string;
    /** @example ["AVC", "HEVC"] */
    videoCodec: string;
    /**
     * @format int32
     * @example [0, -1, 1920, 1280, 853, 640, 900, 720, 480, 360, 854, 1170]
     */
    width: number;
    __typename: "ClipVideoQuality";
  }[];
  __typename: "ClipAsset";
};

export type VideoAccessTokenClipQuality = {
  /**
   * @format float
   * @example [0, 60, 30.03076934814453, 60.01000213623047, 30.005001068115234, 60.0133362969549]
   */
  frameRate: number;
  /** @example ["-1", "1080", "720", "480", "360", "900", "1170", "756"] */
  quality: string;
  /** @example ["", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/1080/index.mp4", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/720/index.mp4"] */
  sourceURL: string;
  __typename: "ClipVideoQuality";
};

export type VideoCodec = "AV1" | "AVC" | "HEVC";

export type VideoConnectionOptionsInput = {
  /**
   * @format uint32
   * @example [61]
   */
  maxLengthSeconds?: null | number;
  /** @format time */
  searchRangeEndAt?: null | string;
  /** @format time */
  searchRangeStartAt?: null | string;
};

export type VideoEdge = {
  /** @example ["2901708053|816756|2026-10-15T20:49:51Z|40181"] */
  cursor: null | Cursor;
  node: null | PreviewCardVideo;
  __typename: "VideoEdge";
};

export type VideoMetadataUser = {
  /**
   * @pattern ^[0-9]+$
   * @example ["12826"]
   */
  id: ID;
  __typename: "User";
};

export type VideoMetadataVideo = {
  /**
   * @pattern ^[0-9]+$
   * @example ["2323270866"]
   */
  id: ID;
  /** @example ["Twitch Recap: 2024 according to Twitch Chat!", "Creator Camp LIVE: Streaming Basics with @Snackless & @KawaiiGuy"] */
  title: null | string;
  /** @example ["The legendary TwitchCon Drag Showcase is back! Check out all the amazing performers right here!", "Now you know when our show happen! Nice."] */
  description: null | string;
  /**
   * @example ["https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/82ef4729c6011d6072e2_twitch_43295848617_1733849129//thumb/thumb0-90x60.jpg", "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/4087ab6ee325487ff1cb_twitch_317752962300_1741891679//thumb/thumb0-90x60.jpg"]
   * @gqlArg `width: Int [320, 90, 640, 240, 400, 1280, 80, 160, 214]`
   * @gqlArg `height: Int [180, 60, 360, 135, 225, 480, 720, 51, 45, 90]`
   */
  previewThumbnailURL: string;
  /**
   * @format date-time
   * @example ["2024-12-10T16:45:35Z", "2025-03-13T18:48:05Z"]
   */
  createdAt: string;
  /**
   * @format uint32
   * @example [0, 772963, 171376, 163669, 1911, 684]
   */
  viewCount: number;
  /**
   * @format date-time
   * @example ["2024-12-10T16:45:35Z", "2025-03-13T18:48:05Z"]
   */
  publishedAt: string;
  /**
   * @format uint32
   * @example [15389, 4621, 621, 4472, 58]
   */
  lengthSeconds: number;
  /** @example ["ARCHIVE", "HIGHLIGHT", "UPLOAD"] */
  broadcastType: string;
  owner: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    __typename: "User";
  };
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
    slug: string;
    /**
     * @example ["https://static-cdn.jtvnw.net/ttv-boxart/509672-{width}x{height}.jpg", "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg"]
     * @gqlArg `width: Int [52, 144, 40, 285, 250, 188, 90, 85, 200, 600]`
     * @gqlArg `height: Int [72, 192, 56, 380, 300, 250, 55, 120, 113, 53]`
     */
    boxArtURL: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    __typename: "Game";
  };
  __typename: "Video";
};

export type VideoShelfEdge = {
  /**
   * @pattern ^[0-9]+$
   * @example ["0"]
   */
  cursor: Cursor;
  node: {
    /** @example ["KVe_rYFMGxiPsA", "6e8b060e-b329-45e4-8e7a-ded5177ee78a", "5ef0dc73-e8a1-4789-96ef-0d43bff28ec8"] */
    id: ID;
    /** @example ["Featured Clips", "Recent broadcasts", "Recent highlights and uploads", "All videos", "TwitchCon San Diego 2024", "TwitchCon Europe 2024", "Patch Notes"] */
    title: string;
    /** @example [""] */
    description: null | string;
    /** @example ["TOP_CLIPS", "LATEST_BROADCASTS", "LATEST_NON_BROADCASTS", "ALL_VIDEOS", "COLLECTION"] */
    type: string;
    collection: null | (PreviewCollection & { __typename: "Collection" });
    items: (ShelfPreviewCardClip | PreviewCardVideo)[];
    __typename: "VideoShelf";
  };
  __typename: "VideoShelfEdge";
};

export type VideoSort = "TIME" | "VIEWS";

export type BitsConfigContextGlobalData = GlobalCheerInfo;

export type BitsConfigContextGlobalResponse = QueryResponse<
  BitsConfigContextGlobalData,
  "BitsConfigContext_Global"
>;

export type BrowsePageAllDirectoriesVariables = {
  /** @format int32 */
  limit: number;
  cursor?: null | Cursor;
  options?: null | GameOptions;
};

export type BrowsePageAllDirectoriesData = {
  /** @aliasFor games */
  directoriesWithTags: null | {
    edges: BrowsePageDirectoriesWithTagsEdge[];
    pageInfo: null | {
      hasNextPage: boolean;
      __typename: "PageInfo";
    };
    __typename: "GameConnection";
  };
};

export type BrowsePageAllDirectoriesResponse = QueryResponse<
  BrowsePageAllDirectoriesData,
  "BrowsePage_AllDirectories"
>;

export type ChannelRootAboutPanelVariables = {
  channelLogin: string;
  skipSchedule: boolean;
};

export type ChannelRootAboutPanelData = {
  currentUser: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    __typename: "User";
  };
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["", "Twitch is where thousands of communities come together for whatever, every day. "] */
    description: null | string;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    followers: {
      /**
       * @format uint32
       * @example [0, 2430015, 2459534, 2471025, 2380069, 2380116]
       */
      totalCount: number;
      __typename: "FollowerConnection";
    };
    roles: null | {
      isPartner: boolean;
      isAffiliate: boolean;
      isStaff: null | boolean;
      isParticipatingDJ: boolean;
      __typename: "UserRoles";
    };
    channel: {
      /**
       * @pattern ^[0-9]+$
       * @example ["12826"]
       */
      id: ID;
      socialMedias: null | SocialMedia[];
      /** @directive skip(if: $skipSchedule) */
      schedule?: null | {
        /** @example ["schedule-12826", "schedule-23161357"] */
        id: ID;
        nextSegment: null | {
          /** @example ["eyJzZWdtZW50SUQiOiJiNzU0MDEzZC1iOTRlLTRlNmEtYWFmYi03YmM0NmMzNDEzODciLCJpc29ZZWFyIjoyMDI2LCJpc29XZWVrIjozOH0=", "eyJzZWdtZW50SUQiOiIxMTc3MDkxYi1hNzEzLTQ4YjMtOTdlOS1lM2RmMjFlOThlN2QiLCJpc29ZZWFyIjoyMDI2LCJpc29XZWVrIjoyNH0="] */
          id: ID;
          /**
           * @format date-time
           * @example ["2026-09-20T16:00:00Z", "2026-06-09T13:00:00Z"]
           */
          startAt: string;
          hasReminder: boolean;
          __typename: "ScheduleSegment";
        };
        __typename: "Schedule";
      };
      __typename: "Channel";
    };
    lastBroadcast: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["317528086118"]
       */
      id: null | ID;
      game: null | {
        /**
         * @pattern ^[0-9]+$
         * @example ["509672"]
         */
        id: ID;
        /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
        displayName: string;
        __typename: "Game";
      };
      __typename: "Broadcast";
    };
    primaryTeam: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["2351"]
       */
      id: ID;
      /** @example ["twitchcon", "ggtalentgroup", "tsm", "ths", "loadedllc", "pubgpartners"] */
      name: string;
      /** @example ["TwitchCon Europe 2026", "GG Talent Group", "TSM", "The Hammer Squad", "Loaded", "PUBG Partners"] */
      displayName: string;
      __typename: "Team";
    };
    videos: null | {
      edges: UserBioVideo[];
      __typename: "VideoConnection";
    };
    __typename: "User";
  };
};

export type ChannelRootAboutPanelResponse = QueryResponse<
  ChannelRootAboutPanelData,
  "ChannelRoot_AboutPanel"
>;

export type ChannelShellVariables = { login: string };

export type ChannelShellData = {
  /** @aliasFor userResultByLogin */
  userOrError:
    | null
    | CoreChannelWithHomePrefsFragment
    | {
        /**
         * @example ["gaechkatm", "EmjayPlayss", "qmaxgaren"]
         * @aliasFor key
         */
        userDoesNotExist: string;
        /** @example ["UNKNOWN", "DMCA", "TOS_TEMPORARY", "TOS_INDEFINITE"] */
        reason: string;
        __typename: "UserDoesNotExist";
      }
    | {
        /** @aliasFor key */
        userError: UnknownValue;
        __typename: "UserError";
      };
};

export type ChannelShellResponse = QueryResponse<ChannelShellData, "ChannelShell">;

export type ChannelVideoShelvesQueryVariables = {
  channelLogin: string;
  /** @format int32 */
  first: number;
  cursor?: null | Cursor;
  options?: null | EnumOrInput;
  /** @default false */
  includePreviewBlur?: null | boolean;
};

export type ChannelVideoShelvesQueryData = {
  currentUser: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    __typename: "User";
  };
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    videoShelves: {
      edges: VideoShelfEdge[];
      pageInfo: null | {
        hasNextPage: boolean;
        __typename: "PageInfo";
      };
      __typename: "VideoShelfConnection";
    };
    __typename: "User";
  };
};

export type ChannelVideoShelvesQueryResponse = QueryResponse<
  ChannelVideoShelvesQueryData,
  "ChannelVideoShelvesQuery"
>;

export type ChatListBadgesVariables = { channelLogin: string };

export type ChatListBadgesData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    broadcastBadges: Badge[];
    self: null | ChatListBadges_UserSelf | ChatListBadges_UserSelf[];
    __typename: "User";
  };
};

export type ChatListBadgesResponse = QueryResponse<ChatListBadgesData, "ChatList_Badges">;

export type ClipsCardsGameVariables = {
  categorySlug: string;
  /** @format int32 */
  limit: number;
  cursor?: null | Cursor;
  criteria?: null | GameClipsInput;
};

export type ClipsCardsGameData = {
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    clips: null | {
      /** @example ["MAY_CONTAIN_MATURE_CONTENT"] */
      banners: null | string[];
      pageInfo: null | {
        hasNextPage: boolean;
        __typename: "PageInfo";
      };
      edges: {
        /** @example ["MjA="] */
        cursor: null | Cursor;
        node: null | PreviewCardClip;
        __typename: "ClipEdge";
      }[];
      __typename: "ClipConnection";
    };
    __typename: "Game";
  };
};

export type ClipsCardsGameResponse = QueryResponse<ClipsCardsGameData, "ClipsCards__Game">;

export type ClipsCardsUserVariables = {
  login: string;
  /** @format int32 */
  limit: number;
  cursor?: null | Cursor;
  criteria?: null | UserClipsInput;
};

export type ClipsCardsUserData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    clips: null | {
      pageInfo: null | {
        hasNextPage: boolean;
        __typename: "PageInfo";
      };
      edges: {
        /** @example ["MjA="] */
        cursor: null | Cursor;
        node: null | (Clip & ClipCommentsExposure);
        __typename: "ClipEdge";
      }[];
      __typename: "ClipConnection";
    };
    __typename: "User";
  };
};

export type ClipsCardsUserResponse = QueryResponse<ClipsCardsUserData, "ClipsCards__User">;

export type ClipsDownloadButtonVariables = { slug: ID };

export type ClipsDownloadButtonData = {
  clip: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["3942697259"]
     */
    id: ID;
    /**
     * @format date-time
     * @example ["2020-12-09T19:18:10Z", "2021-04-04T21:34:33Z"]
     */
    createdAt: string;
    /**
     * @format uint32
     * @example [44, 26, 25, 42, 30, 59, 36, 41, 60, 29]
     */
    durationSeconds: number;
    /**
     * @format uint32
     * @example [0, 957063, 957456, 899934, 944919, 773854]
     */
    viewCount: number;
    broadcaster: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["12826"]
       */
      id: ID;
      __typename: "User";
    };
    curator: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["12826"]
       */
      id: ID;
      __typename: "User";
    };
    game: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["509672"]
       */
      id: ID;
      /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
      name: string;
      __typename: "Game";
    };
    playbackAccessToken: {
      /** @example ["deadbeefdeadbeefdeadbeefdeadbeefdeadbeef"] */
      signature: string;
      /** @example ["{\"authorization\":{\"forbidden\":false,\"reason\":\"\"},\"clip_uri\":\"https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/360/index.mp4\",\"clip_slug\":\"DeliciousDelightfulPicklesWOOP\",\"device_id\":null,\"expires\":1792252612,\"user_id\":\"\",\"version\":3}"] */
      value: string;
      __typename: "PlaybackAccessToken";
    };
    assets: {
      /** @example ["ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/LANDSCAPE", "c8e52370-1429-4023-9ce8-9d016939e3c2/LANDSCAPE"] */
      id: ID;
      /** @example ["SOURCE", "RECOMPOSED"] */
      type: string;
      downloadQualities: {
        /** @example ["", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/1080/index.mp4", "https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/720/index.mp4"] */
        sourceURL: string;
        __typename: "ClipVideoQuality";
      }[];
      __typename: "ClipAsset";
    }[];
    __typename: "Clip";
  };
};

export type ClipsDownloadButtonResponse = QueryResponse<
  ClipsDownloadButtonData,
  "ClipsDownloadButton"
>;

export type DirectoryPageGameVariables = {
  slug: string;
  /** @format int32 */
  limit: number;
  cursor?: null | Cursor;
  options?: null | GameStreamOptions;
  sortTypeIsRecency: boolean;
  /**
   * @format int32
   * @default 50
   */
  imageWidth?: null | number;
  includeCostreaming: boolean;
};

export type DirectoryPageGameData = {
  game: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["509672"]
     */
    id: ID;
    /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
    name: string;
    /** @example ["IRL", "Just Chatting", "Special Events", "Talk Shows & Podcasts", "Grand Theft Auto V", "Poker", "Halloween: The Game"] */
    displayName: string;
    streams: null | {
      /** @example ["MAY_CONTAIN_MATURE_CONTENT"] */
      banners: null | string[];
      edges: DirectoryPageGameStreamWithTagsEdge[];
      pageInfo: null | {
        hasNextPage: boolean;
        __typename: "PageInfo";
      };
      __typename: "StreamConnection";
    };
    __typename: "Game";
  };
};

export type DirectoryPageGameResponse = QueryResponse<DirectoryPageGameData, "DirectoryPage_Game">;

export type FFZRecentBroadcastsVariables = {
  id: ID;
  login?: null | string;
  /** @format int32 */
  limit: number;
  cursor?: null | Cursor;
  type?: null | BroadcastType;
  sort: VideoSort;
  options?: null | VideoConnectionOptionsInput;
};

export type FFZRecentBroadcastsData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    videos: null | {
      edges: {
        /** @example ["2901708053|816756|2026-10-15T20:49:51Z|40181"] */
        cursor: null | Cursor;
        node: null | {
          /**
           * @pattern ^[0-9]+$
           * @example ["2323270866"]
           */
          id: ID;
          /** @example ["Twitch Recap: 2024 according to Twitch Chat!", "Creator Camp LIVE: Streaming Basics with @Snackless & @KawaiiGuy"] */
          title: null | string;
          /**
           * @format date-time
           * @example ["2024-12-10T16:45:35Z", "2025-03-13T18:48:05Z"]
           */
          createdAt: string;
          /**
           * @format date-time
           * @example ["2024-12-10T16:45:35Z", "2025-03-13T18:48:05Z"]
           */
          publishedAt: string;
          __typename: "Video";
        };
        __typename: "VideoEdge";
      }[];
      pageInfo: null | {
        hasNextPage: boolean;
        __typename: "PageInfo";
      };
      __typename: "VideoConnection";
    };
    __typename: "User";
  };
};

export type FFZRecentBroadcastsResponse = QueryResponse<
  FFZRecentBroadcastsData,
  "FFZ_RecentBroadcasts"
>;

export type FilterableVideoTowerVideosVariables = {
  channelOwnerLogin: string;
  /** @format int32 */
  limit: number;
  cursor?: null | Cursor;
  broadcastType?: null | BroadcastType;
  videoSort: VideoSort;
  options?: null | VideoConnectionOptionsInput;
  /** @default false */
  includePreviewBlur?: null | boolean;
};

export type FilterableVideoTowerVideosData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    videos: null | {
      edges: VideoEdge[];
      pageInfo: null | {
        hasNextPage: boolean;
        __typename: "PageInfo";
      };
      __typename: "VideoConnection";
    };
    __typename: "User";
  };
};

export type FilterableVideoTowerVideosResponse = QueryResponse<
  FilterableVideoTowerVideosData,
  "FilterableVideoTower_Videos"
>;

export type GetPinnedChatVariables = {
  channelID: ID;
  /** @format int32 */
  count: number;
  after?: null | Cursor;
};

export type GetPinnedChatData = {
  channel: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    pinnedChatMessages: {
      edges: {
        node: null | {
          /**
           * @format uuid
           * @example ["c47bf9cf-5d0f-4288-ab1a-4740d3a84525"]
           */
          id: ID;
          /** @example ["MOD"] */
          type: string;
          pinnedMessage: {
            /**
             * @format uuid
             * @example ["8828a3ba-6c79-4a8b-8f0b-e185b981ccfb"]
             */
            id: ID;
            content: null | {
              /** @example ["!activematter: I'm playing Active Matter, a hardcore tactical shooter - out now on Steam, PlayStation 5 and Xbox Series X|S. Get the game and support the stream here: https://amplay.net/lirik #ad", "DS2 Randomizer by Chainsboyo https://www.nexusmods.com/darksouls2/mods/1317"] */
              text: string;
              fragments: {
                content:
                  | null
                  | {
                      /**
                       * @pattern ^[0-9]+$
                       * @example ["12826"]
                       * @aliasFor id
                       */
                      userID: ID;
                      /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
                      login: string;
                      __typename: "User";
                    }
                  | {
                      /**
                       * @example ["emotesv2_28ba31b7d6a04a14bf5455549b115bba", "emotesv2_4a4348c11b014485a0a357345152846a"]
                       * @aliasFor id
                       */
                      emoteID: ID;
                      __typename: "Emote";
                    }
                  | {
                      /**
                       * ⚠️ Low confidence about: nullable
                       * @format uint32
                       */
                      bitsAmount: null | number;
                      prefix: UnknownValue;
                      tier: UnknownValue;
                      __typename: "CheermoteToken";
                    }
                  | { __typename: "AutoMod" }
                  | { __typename: "GifContent" };
                /** @example ["!activematter: I'm playing Active Matter, a hardcore tactical shooter - out now on Steam, PlayStation 5 and Xbox Series X|S. Get the game and support the stream here: ", "https://amplay.net/lirik"] */
                text: string;
                __typename: "MessageFragment";
              }[];
              __typename: "MessageContent";
            };
            parentMessage: null | {
              /**
               * @format uuid
               * @example ["8828a3ba-6c79-4a8b-8f0b-e185b981ccfb"]
               */
              id: ID;
              content: null | {
                /** @example ["!activematter: I'm playing Active Matter, a hardcore tactical shooter - out now on Steam, PlayStation 5 and Xbox Series X|S. Get the game and support the stream here: https://amplay.net/lirik #ad", "DS2 Randomizer by Chainsboyo https://www.nexusmods.com/darksouls2/mods/1317"] */
                text: string;
                __typename: "MessageContent";
              };
              /**
               * @format date-time
               * @example ["2025-03-21T12:52:15.832863832Z", "2026-09-19T16:05:13.704561536Z"]
               */
              sentAt: string;
              sender: {
                /**
                 * @pattern ^[0-9]+$
                 * @example ["12826"]
                 */
                id: ID;
                /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
                login: string;
                /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
                displayName: string;
                __typename: "User";
              };
              __typename: "Message";
            };
            threadParentMessage: null | {
              /**
               * @format uuid
               * @example ["8828a3ba-6c79-4a8b-8f0b-e185b981ccfb"]
               */
              id: ID;
              content: null | {
                /** @example ["!activematter: I'm playing Active Matter, a hardcore tactical shooter - out now on Steam, PlayStation 5 and Xbox Series X|S. Get the game and support the stream here: https://amplay.net/lirik #ad", "DS2 Randomizer by Chainsboyo https://www.nexusmods.com/darksouls2/mods/1317"] */
                text: string;
                __typename: "MessageContent";
              };
              sender: {
                /**
                 * @pattern ^[0-9]+$
                 * @example ["12826"]
                 */
                id: ID;
                /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
                login: string;
                /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
                displayName: string;
                __typename: "User";
              };
              __typename: "Message";
            };
            /**
             * @format date-time
             * @example ["2025-03-21T12:52:15.832863832Z", "2026-09-19T16:05:13.704561536Z"]
             */
            sentAt: string;
            sender: {
              /**
               * @pattern ^[0-9]+$
               * @example ["12826"]
               */
              id: ID;
              /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
              login: string;
              /**
               * @pattern ^#[0-9a-fA-F]{6}$
               * @example ["#0029CC", "#5B99FF", "#54BC75", "#FDC1E1"]
               */
              chatColor: null | string;
              /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
              displayName: string;
              displayBadges: {
                /** @example ["cHJlZGljdGlvbnM7Ymx1ZS0xOw==", "cHJlZGljdGlvbnM7Ymx1ZS0yOw=="] */
                id: ID;
                /** @example ["", "predictions", "bits"] */
                setID: ID;
                /** @example ["", "blue-1", "blue-2", "blue-3", "blue-4", "blue-5", "pink-2", "100"] */
                version: string;
                __typename: "Badge";
              }[];
              __typename: "User";
            };
            __typename: "Message";
          };
          /**
           * @format date-time
           * @example ["2026-09-19T16:05:13Z", "2025-03-16T14:59:25Z"]
           */
          startsAt: string;
          /**
           * @format date-time
           * @example ["2026-09-19T16:05:15Z", "2025-03-16T14:59:27Z"]
           */
          updatedAt: string;
          /**
           * @format date-time
           * @example ["2026-10-17T03:01:21Z"]
           */
          endsAt: null | string;
          pinnedBy: {
            /**
             * @pattern ^[0-9]+$
             * @example ["12826"]
             */
            id: ID;
            /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
            login: string;
            /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
            displayName: string;
            __typename: "User";
          };
          __typename: "PinnedChatMessage";
        };
        /** @example [""] */
        cursor: Cursor;
        __typename: "PinnedChatMessageEdge";
      }[];
      pageInfo: null | {
        hasNextPage: boolean;
        __typename: "PageInfo";
      };
      __typename: "PinnedChatMessageConnection";
    };
    __typename: "Channel";
  };
};

export type GetPinnedChatResponse = QueryResponse<GetPinnedChatData, "GetPinnedChat">;

export type GetUserIDVariables = {
  login: string;
  lookupType: UserLookupType;
};

export type GetUserIDData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    __typename: "User";
  };
};

export type GetUserIDResponse = QueryResponse<GetUserIDData, "GetUserID">;

export type GlobalBadgesData = { badges: Badge[] };

export type GlobalBadgesResponse = QueryResponse<GlobalBadgesData, "GlobalBadges">;

export type PlaybackAccessTokenVariables = {
  login: string;
  isLive: boolean;
  vodID: ID;
  isVod: boolean;
  playerType: string;
  platform: string;
};

export type PlaybackAccessTokenData = {
  /** @directive include(if: $isLive) */
  streamPlaybackAccessToken?: null | {
    /** @example ["{\"authorization\":{\"forbidden\":false,\"reason\":\"\"},\"clip_uri\":\"https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/360/index.mp4\",\"clip_slug\":\"DeliciousDelightfulPicklesWOOP\",\"device_id\":null,\"expires\":1792252612,\"user_id\":\"\",\"version\":3}"] */
    value: string;
    /** @example ["deadbeefdeadbeefdeadbeefdeadbeefdeadbeef"] */
    signature: string;
    authorization: {
      isForbidden: boolean;
      /** @example ["NONE"] */
      forbiddenReasonCode: string;
      __typename: "PlaybackAccessTokenAuthorization";
    };
    __typename: "PlaybackAccessToken";
  };
  /** @directive include(if: $isVod) */
  videoPlaybackAccessToken?: null | {
    /** @example ["{\"authorization\":{\"forbidden\":false,\"reason\":\"\"},\"clip_uri\":\"https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/360/index.mp4\",\"clip_slug\":\"DeliciousDelightfulPicklesWOOP\",\"device_id\":null,\"expires\":1792252612,\"user_id\":\"\",\"version\":3}"] */
    value: string;
    /** @example ["deadbeefdeadbeefdeadbeefdeadbeefdeadbeef"] */
    signature: string;
    __typename: "PlaybackAccessToken";
  };
};

export type PlaybackAccessTokenResponse = QueryResponse<
  PlaybackAccessTokenData,
  "PlaybackAccessToken"
>;

export type SearchResultsPageSearchResultsVariables = {
  query: string;
  options?: null | SearchForOptions;
  requestID: ID;
  /** @default web */
  platform?: null | string;
};

export type SearchResultsPageSearchResultsData = {
  searchFor: {
    banners: null;
    querySubstitution: SearchForQuerySubstitutionFragment;
    channels: null | SearchForChannelsFragment;
    channelsWithTag: SearchForChannelsWithTagFragment;
    games: null | SearchForGamesFragment;
    videos: SearchForVideosFragment;
    relatedLiveChannels: RelatedLiveChannelsFragment;
    collections: SearchForCollectionsFragment;
    __typename: "SearchFor";
  };
};

export type SearchResultsPageSearchResultsResponse = QueryResponse<
  SearchResultsPageSearchResultsData,
  "SearchResultsPage_SearchResults"
>;

export type SearchTraySearchSuggestionsVariables = {
  queryFragment: string;
  requestID: ID;
  withOfflineChannelContent?: null | boolean;
};

export type SearchTraySearchSuggestionsData = {
  searchSuggestions: {
    edges: SearchSuggestionNode[];
    tracking: {
      /** @example ["c5c28bd1a3a8ef7d2362b36362b27021", "f2e30a701219f934464c90fd40250b94"] */
      modelTrackingID: ID;
      /**
       * @format uuid
       * @example ["814f36cc-4b51-4abc-9cf4-621bfc70f17f"]
       */
      responseID: ID;
      __typename: "SearchSuggestionTracking";
    };
    __typename: "SearchSuggestionConnection";
  };
};

export type SearchTraySearchSuggestionsResponse = QueryResponse<
  SearchTraySearchSuggestionsData,
  "SearchTray_SearchSuggestions"
>;

export type ShareClipRenderStatusVariables = { slug: ID };

export type ShareClipRenderStatusData = { clip: null | ContentClipsManagerClip };

export type ShareClipRenderStatusResponse = QueryResponse<
  ShareClipRenderStatusData,
  "ShareClipRenderStatus"
>;

export type StreamMetadataVariables = { channelLogin: string };

export type StreamMetadataData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["Twitch", "ayuuexe", "xQc", "LIRIK", "RSDragonwilds", "S0LAF1D3", "Jinnytty"] */
    displayName: string;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    roles: null | {
      isPartner: boolean;
      isParticipatingDJ: boolean;
      __typename: "UserRoles";
    };
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    primaryTeam: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["2351"]
       */
      id: ID;
      /** @example ["twitchcon", "ggtalentgroup", "tsm", "ths", "loadedllc", "pubgpartners"] */
      name: string;
      /** @example ["TwitchCon Europe 2026", "GG Talent Group", "TSM", "The Hammer Squad", "Loaded", "PUBG Partners"] */
      displayName: string;
      __typename: "Team";
    };
    channel: {
      /**
       * @pattern ^[0-9]+$
       * @example ["12826"]
       */
      id: ID;
      __typename: "Channel";
    };
    lastBroadcast: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["317528086118"]
       */
      id: null | ID;
      /** @example ["🎮LIVE🎮CLICK🎮XBOX GAME SHOW🎮BANGER🎮DRAMA🎮NEWS🎮CLIPS🎮THINGS🎮VIDEOS🎮REACTS🎮STUFF🎮DONT MISS IT🎮", "Sub Sunday + PC Gaming Show Sunday"] */
      title: null | string;
      __typename: "Broadcast";
    };
    stream: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["316180784725"]
       */
      id: ID;
      /** @example ["live"] */
      type: string;
      /**
       * @format date-time
       * @example ["2026-06-07T17:11:20Z", "2026-06-07T16:57:23Z"]
       */
      createdAt: string;
      game: null | {
        /**
         * @pattern ^[0-9]+$
         * @example ["509672"]
         */
        id: ID;
        /** @example ["irl", "just-chatting", "special-events", "cyberpunk-2077", "grand-theft-auto-v", "overwatch-2", "counter-strike"] */
        slug: string;
        /** @example ["IRL", "Just Chatting", "Special Events", "Cyberpunk 2077", "League of Legends", "You Know The Drill", "RuneScape: Dragonwilds"] */
        name: string;
        __typename: "Game";
      };
      __typename: "Stream";
    };
    __typename: "User";
  };
};

export type StreamMetadataResponse = QueryResponse<StreamMetadataData, "StreamMetadata">;

export type UseLiveVariables = { channelLogin: string };

export type UseLiveData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /** @example ["twitch", "xqc", "lirik", "forsen", "yasongas", "shungiteeworks", "nottdarius"] */
    login: string;
    stream: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["316180784725"]
       */
      id: ID;
      /**
       * @format date-time
       * @example ["2026-06-07T17:11:20Z", "2026-06-07T16:57:23Z"]
       */
      createdAt: string;
      __typename: "Stream";
    };
    __typename: "User";
  };
};

export type UseLiveResponse = QueryResponse<UseLiveData, "UseLive">;

export type UseViewCountVariables = { channelLogin: string };

export type UseViewCountData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    stream: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["316180784725"]
       */
      id: ID;
      /**
       * @format uint32
       * @example [0, 46802, 656, 1572, 1518, 1432]
       */
      viewersCount: number;
      /**
       * @format uint32
       * @example [4617, 7717, 7714, 11, 4557]
       */
      collaborationViewersCount: null | number;
      costreamDetails: null | {
        /**
         * @format uint32
         * @example [53318, 665, 54790, 55713, 54158]
         */
        totalViewersCount: number;
        __typename: "CostreamDetails";
      };
      __typename: "Stream";
    };
    __typename: "User";
  };
};

export type UseViewCountResponse = QueryResponse<UseViewCountData, "UseViewCount">;

export type VideoAccessTokenClipVariables = {
  slug: ID;
  platform: string;
  /** @default ["AVC"] */
  supportedCodecs: VideoCodec[];
};

export type VideoAccessTokenClipData = {
  clip: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["3942697259"]
     */
    id: ID;
    playbackAccessToken: {
      /** @example ["deadbeefdeadbeefdeadbeefdeadbeefdeadbeef"] */
      signature: string;
      /** @example ["{\"authorization\":{\"forbidden\":false,\"reason\":\"\"},\"clip_uri\":\"https://d1ndex63qxojbr.cloudfront.net/nauth/ce4b4ef1-4e8d-4391-bff6-2bc4c5506a4d/landscape/avc/360/index.mp4\",\"clip_slug\":\"DeliciousDelightfulPicklesWOOP\",\"device_id\":null,\"expires\":1792252612,\"user_id\":\"\",\"version\":3}"] */
      value: string;
      __typename: "PlaybackAccessToken";
    };
    videoQualities: null | VideoAccessTokenClipQuality[];
    assets: VideoAccessTokenClipAsset[];
    __typename: "Clip";
  };
};

export type VideoAccessTokenClipResponse = QueryResponse<
  VideoAccessTokenClipData,
  "VideoAccessToken_Clip"
>;

export type VideoMetadataVariables = {
  channelLogin: string;
  videoID: ID;
};

export type VideoMetadataData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    /**
     * @pattern ^[0-9a-fA-F]{6}$
     * @example ["5C16C5", "FFBF00", "9146FF", "FF9AFC", "FA1ED2", "7959B4", "15C2ED"]
     */
    primaryColorHex: null | string;
    isPartner: boolean;
    /**
     * @format uri
     * @example ["https://static-cdn.jtvnw.net/jtv_user_pictures/7db44749-286f-4db0-9c99-574b16170d44-profile_image-70x70.png", "https://static-cdn.jtvnw.net/jtv_user_pictures/d5e6ebb4-a245-4ebf-bea6-2183e2f39600-profile_image-70x70.png"]
     * @gqlArg `width: Int [50, 70, 300, 28, 150]`
     */
    profileImageURL: string;
    lastBroadcast: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["317528086118"]
       */
      id: null | ID;
      /**
       * @format date-time
       * @example ["2026-05-31T15:40:42.92623Z", "2026-09-09T19:02:24.10084Z"]
       */
      startedAt: string;
      __typename: "Broadcast";
    };
    stream: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["316180784725"]
       */
      id: ID;
      /**
       * @format uint32
       * @example [0, 46802, 656, 1572, 1518, 1432]
       */
      viewersCount: number;
      __typename: "Stream";
    };
    followers: {
      /**
       * @format uint32
       * @example [0, 2430015, 2459534, 2471025, 2380069, 2380116]
       */
      totalCount: number;
      __typename: "FollowerConnection";
    };
    __typename: "User";
  };
  currentUser: null | VideoMetadataUser;
  video: null | VideoMetadataVideo;
};

export type VideoMetadataResponse = QueryResponse<VideoMetadataData, "VideoMetadata">;

export type VideoPreviewOverlayVariables = { login: string };

export type VideoPreviewOverlayData = {
  user: null | {
    /**
     * @pattern ^[0-9]+$
     * @example ["12826"]
     */
    id: ID;
    stream: null | {
      /**
       * @pattern ^[0-9]+$
       * @example ["316180784725"]
       */
      id: ID;
      /**
       * @example ["https://static-cdn.jtvnw.net/previews-ttv/live_user_ayuuexe-1280x720.jpg", "https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-1280x720.jpg"]
       * @gqlArg `width: Int [320, 180, 1280, 80, 640, 360, 90]`
       * @gqlArg `height: Int [180, 320, 720, 45, 360, 640, 160]`
       */
      previewImageURL: string;
      restrictionType: null;
      __typename: "Stream";
    };
    __typename: "User";
  };
};

export type VideoPreviewOverlayResponse = QueryResponse<
  VideoPreviewOverlayData,
  "VideoPreviewOverlay"
>;

export type QueryVariablesMap = {
  BitsConfigContext_Global: Record<string, never>;
  BrowsePage_AllDirectories: BrowsePageAllDirectoriesVariables;
  ChannelRoot_AboutPanel: ChannelRootAboutPanelVariables;
  ChannelShell: ChannelShellVariables;
  ChannelVideoShelvesQuery: ChannelVideoShelvesQueryVariables;
  ChatList_Badges: ChatListBadgesVariables;
  ClipsCards__Game: ClipsCardsGameVariables;
  ClipsCards__User: ClipsCardsUserVariables;
  ClipsDownloadButton: ClipsDownloadButtonVariables;
  DirectoryPage_Game: DirectoryPageGameVariables;
  FFZ_RecentBroadcasts: FFZRecentBroadcastsVariables;
  FilterableVideoTower_Videos: FilterableVideoTowerVideosVariables;
  GetPinnedChat: GetPinnedChatVariables;
  GetUserID: GetUserIDVariables;
  GlobalBadges: Record<string, never>;
  PlaybackAccessToken: PlaybackAccessTokenVariables;
  SearchResultsPage_SearchResults: SearchResultsPageSearchResultsVariables;
  SearchTray_SearchSuggestions: SearchTraySearchSuggestionsVariables;
  ShareClipRenderStatus: ShareClipRenderStatusVariables;
  StreamMetadata: StreamMetadataVariables;
  UseLive: UseLiveVariables;
  UseViewCount: UseViewCountVariables;
  VideoAccessToken_Clip: VideoAccessTokenClipVariables;
  VideoMetadata: VideoMetadataVariables;
  VideoPreviewOverlay: VideoPreviewOverlayVariables;
};

export type QueryResponseMap = {
  BitsConfigContext_Global: BitsConfigContextGlobalResponse;
  BrowsePage_AllDirectories: BrowsePageAllDirectoriesResponse;
  ChannelRoot_AboutPanel: ChannelRootAboutPanelResponse;
  ChannelShell: ChannelShellResponse;
  ChannelVideoShelvesQuery: ChannelVideoShelvesQueryResponse;
  ChatList_Badges: ChatListBadgesResponse;
  ClipsCards__Game: ClipsCardsGameResponse;
  ClipsCards__User: ClipsCardsUserResponse;
  ClipsDownloadButton: ClipsDownloadButtonResponse;
  DirectoryPage_Game: DirectoryPageGameResponse;
  FFZ_RecentBroadcasts: FFZRecentBroadcastsResponse;
  FilterableVideoTower_Videos: FilterableVideoTowerVideosResponse;
  GetPinnedChat: GetPinnedChatResponse;
  GetUserID: GetUserIDResponse;
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
};
