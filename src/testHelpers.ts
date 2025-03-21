import assert from 'node:assert';
import { FormatRegistry, type TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { IsDateTime } from '../lib/typebox-formats/date-time.ts';
import { IsUrl } from '../lib/typebox-formats/url.ts';
import { gqlRequest, MAX_QUERIES_PER_REQUEST } from './gqlRequest.ts';
import { getQueryDirectoryPageGame } from './queries/DirectoryPage_Game/query.ts';
import { getQueryClipsCardsGame } from './queries/ClipsCards__Game/query.ts';
import { getQueryBowsePageAllDirectories } from './queries/BrowsePage_AllDirectories/query.ts';

FormatRegistry.Set('date-time', IsDateTime);
FormatRegistry.Set('uri', IsUrl);

export const createValidate =
  (ResponseSchema: TSchema, references: TSchema[] = []) =>
  (response: any) => {
    const errors = [...Value.Errors(ResponseSchema, references, response)];
    if (errors.length > 0) {
      for (const error of errors) {
        console.log(error.message, error.path);
        console.log(JSON.stringify(error.value, null, 2));
      }
    }
    assert.deepEqual(errors, []);
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

const cache = {
  categories: null as null | CacheCategory[],
  channels: {} as Record<string, CacheChannel[]>,
  clips: {} as Record<string, CacheClip[]>,
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

export const getCategories = async () =>
  cache.categories || (cache.categories = await fetchCategories());

export const getChannels = async (slug: Category = 'just-chatting') =>
  cache.channels[slug] || (cache.channels = await fetchChannels())[slug];

export const getClips = async (slug: Category = 'just-chatting') =>
  cache.clips[slug] || (cache.clips = await fetchClips())[slug];
