import { setTimeout } from 'node:timers/promises';
import { type TProperties, type TSchema } from 'typebox';
import { Value } from 'typebox/value';
import type { TLocalizedValidationError } from 'typebox/error';
import { gqlRequest, MAX_QUERIES_PER_REQUEST } from './gqlRequest.ts';
import { getQueryDirectoryPageGame } from './queries/DirectoryPage_Game/query.ts';
import { getQueryClipsCardsGame } from './queries/ClipsCards__Game/query.ts';
import { getQueryBowsePageAllDirectories } from './queries/BrowsePage_AllDirectories/query.ts';
import { getQueryFilterableVideoTowerVideos } from './queries/FilterableVideoTower_Videos/query.ts';

const getValueByInstancePath = (data: unknown, instancePath: string) => {
  const paths = instancePath.split('/').slice(1);
  let value = data;
  for (const path of paths) value = (value as any)[path];
  return value;
};

const showErrors = (errors: TLocalizedValidationError[], value: unknown) => {
  let lastError: TLocalizedValidationError | null = null;
  for (const error of errors) {
    let errorValue: unknown = undefined;
    try {
      errorValue = getValueByInstancePath(value, error.instancePath);
    } catch (e) {
      console.error('getValueByInstancePath error', error.instancePath);
    }
    let obj = JSON.stringify(errorValue, null, 2);
    if (obj === undefined) obj = 'undefined';
    console.log(error);
    console.log(obj.length < 1000 ? obj : 'TOO LONG', '\n');
    lastError = error;
  }
  return lastError;
};

export const createValidate =
  (ResponseSchema: TSchema, references: TSchema[] = []) =>
  (response: unknown) => {
    const context: TProperties = {};
    for (const schema of references) context[(schema as any).$id] = schema;
    const errors = Value.Errors(context, ResponseSchema, response);
    if (errors.length > 0) {
      const lastError = showErrors(errors, response);
      throw lastError;
    }
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
  categories: null as null | CacheCategory[] | Promise<CacheCategory[]>,
  channels: {} as Record<string, CacheChannel[] | undefined>,
  clips: {} as Record<string, CacheClip[] | undefined>,
  videos: {} as Record<string, CacheVideo | Promise<CacheVideo>>,
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
    result[slug] = response.data.game.streams.edges
      .filter((stream) => stream.node.broadcaster)
      .map((stream) => ({
        id: stream.node.broadcaster!.id,
        login: stream.node.broadcaster!.login,
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
    user.videos!.edges.map((edge) => edge.node.id);
  const result: CacheVideo = {
    channelLogin: channelOwnerLogin,
    archiveIds: getIds(archive.data.user),
    highlightIds: getIds(highlight.data.user),
    uploadIds: getIds(upload.data.user),
  };
  return result;
};

const retry = async <T>(fn: () => Promise<T>, tries = 3): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (tries > 0) {
      await setTimeout(1000);
      return retry(fn, tries - 1);
    }
    throw error;
  }
};

export const getCategories = () =>
  cache.categories ||
  retry(fetchCategories).then((cats) => (cache.categories = cats));

export const getChannels = (slug: Category = 'just-chatting') =>
  cache.channels[slug] ||
  retry(fetchChannels).then((channels) => (cache.channels = channels)[slug]);

export const getClips = (slug: Category = 'just-chatting') =>
  cache.clips[slug] ||
  retry(fetchClips).then((clips) => (cache.clips = clips)[slug]);

export const getVideos = (channelLogin: string) =>
  cache.videos[channelLogin] ||
  (cache.videos[channelLogin] = retry(() => fetchVideos(channelLogin)));
