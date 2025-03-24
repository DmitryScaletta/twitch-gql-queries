import { FormatRegistry, type TSchema } from '@sinclair/typebox';
import { Value, type ValueError } from '@sinclair/typebox/value';
import { IsDateTime } from '../lib/typebox-formats/date-time.ts';
import { IsUrl } from '../lib/typebox-formats/url.ts';
import { IsUuid } from '../lib/typebox-formats/uuid.ts';
import { gqlRequest, MAX_QUERIES_PER_REQUEST } from './gqlRequest.ts';
import { getQueryDirectoryPageGame } from './queries/DirectoryPage_Game/query.ts';
import { getQueryClipsCardsGame } from './queries/ClipsCards__Game/query.ts';
import { getQueryBowsePageAllDirectories } from './queries/BrowsePage_AllDirectories/query.ts';
import { getQueryFilterableVideoTowerVideos } from './queries/FilterableVideoTower_Videos/query.ts';

FormatRegistry.Set('date-time', IsDateTime);
FormatRegistry.Set('uri', IsUrl);
FormatRegistry.Set('uuid', IsUuid);

const showErrors = (errors: Value.ValueErrorIterator): ValueError | null => {
  let lastError: ValueError | null = null;
  for (const error of errors) {
    if (error.errors.length === 0) {
      const obj = JSON.stringify(error.value, null, 2);
      console.log(error.message);
      console.log(error.path);
      console.log(obj.length < 1000 ? obj : 'TOO LONG', '\n');
      lastError = error;
    } else {
      for (const err of error.errors) {
        lastError = showErrors(err);
      }
    }
  }
  return lastError;
};

export const createValidate =
  (ResponseSchema: TSchema, references: TSchema[] = []) =>
  (response: unknown) => {
    const errors = Value.Errors(ResponseSchema, references, response);
    const error = showErrors(errors);
    if (error) throw `${error.message} ${error.path}`;
  };

const CATEGORIES = [
  'just-chatting',
  'counter-strike',
  'dota-2',
  'pubg-battlegrounds',
  'league-of-legends',
  'minecraft',
] as const;
type Category = (typeof CATEGORIES)[number];

type CacheCategory = { slug: string };
type CacheChannel = { id: string; login: string };
type CacheClip = { slug: string };
type CacheVideo = {
  channelLogin: string;
  archiveIds: string[];
  highlightIds: string[];
  uploadIds: string[];
};

const cache = {
  categories: null as null | CacheCategory[],
  channels: {} as Record<string, CacheChannel[]>,
  clips: {} as Record<string, CacheClip[]>,
  videos: {} as Record<string, CacheVideo>,
};

const fetchCategories = async (): Promise<CacheCategory[]> => {
  const [queryResponse] = await gqlRequest([
    getQueryBowsePageAllDirectories({
      options: { sort: 'RELEVANCE' },
      limit: MAX_QUERIES_PER_REQUEST,
    }),
  ]);
  if (!queryResponse.data.directoriesWithTags) {
    throw new Error('Cannot fetch categories');
  }
  return queryResponse.data.directoriesWithTags.edges.map((category) => ({
    slug: category.node.slug,
  }));
};

const fetchChannels = async () => {
  const responses = await gqlRequest(
    CATEGORIES.map((slug) =>
      getQueryDirectoryPageGame({
        slug,
        options: { sort: 'VIEWER_COUNT' },
        sortTypeIsRecency: false,
        limit: MAX_QUERIES_PER_REQUEST,
        includeIsDJ: false,
      }),
    ),
  );
  const result: Record<string, CacheChannel[]> = {};
  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];
    const slug = CATEGORIES[i];
    if (!response.data.game) {
      throw new Error(`Cannot fetch channels: ${slug}`);
    }
    result[slug] = response.data.game.streams.edges.map((stream) => ({
      id: stream.node.broadcaster.id,
      login: stream.node.broadcaster.login,
    }));
  }
  return result;
};

const fetchClips = async () => {
  const responses = await gqlRequest(
    CATEGORIES.map((categorySlug) =>
      getQueryClipsCardsGame({ categorySlug, limit: MAX_QUERIES_PER_REQUEST }),
    ),
  );
  const result: Record<string, CacheClip[]> = {};
  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];
    const slug = CATEGORIES[i];
    if (!response.data) {
      throw new Error(`Cannot fetch clips: ${slug}`);
    }
    result[slug] = response.data.game!.clips!.edges.map((clip) => ({
      slug: clip.node.slug,
    }));
  }
  return result;
};

const fetchVideos = async (channelOwnerLogin: string) => {
  const [archive, highlight, upload] = await gqlRequest([
    getQueryFilterableVideoTowerVideos({
      limit: MAX_QUERIES_PER_REQUEST,
      channelOwnerLogin,
      broadcastType: 'ARCHIVE',
      videoSort: 'TIME',
    }),
    getQueryFilterableVideoTowerVideos({
      limit: MAX_QUERIES_PER_REQUEST,
      channelOwnerLogin,
      broadcastType: 'HIGHLIGHT',
      videoSort: 'TIME',
    }),
    getQueryFilterableVideoTowerVideos({
      limit: MAX_QUERIES_PER_REQUEST,
      channelOwnerLogin,
      broadcastType: 'UPLOAD',
      videoSort: 'TIME',
    }),
  ]);
  if (!archive.data.user || !highlight.data.user || !upload.data.user) {
    throw new Error(`Cannot fetch videos: ${channelOwnerLogin}`);
  }
  const getIds = <T extends typeof archive.data.user>(user: T) =>
    user.videos.edges.map((edge) => edge.node.id);
  const result: CacheVideo = {
    channelLogin: channelOwnerLogin,
    archiveIds: getIds(archive.data.user),
    highlightIds: getIds(highlight.data.user),
    uploadIds: getIds(upload.data.user),
  };
  return result;
};

export const getCategories = async () =>
  cache.categories || (cache.categories = await fetchCategories());

export const getChannels = async (slug: Category = 'just-chatting') =>
  cache.channels[slug] || (cache.channels = await fetchChannels())[slug];

export const getClips = async (slug: Category = 'just-chatting') =>
  cache.clips[slug] || (cache.clips = await fetchClips())[slug];

export const getVideos = async (channelLogin: string) =>
  cache.videos[channelLogin] ||
  (cache.videos[channelLogin] = await fetchVideos(channelLogin));
