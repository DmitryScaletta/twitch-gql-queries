import assert from 'node:assert';
import type { TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { gqlRequest, MAX_QUERIES_PER_REQUEST } from './gqlRequest.ts';
import { getQueryDirectoryPageGame } from './queries/DirectoryPage_Game/query.ts';
import { getQueryClipsCardsGame } from './queries/ClipsCards__Game/query.ts';
import { getQueryBowsePageAllDirectories } from './queries/BrowsePage_AllDirectories/query.ts';

export const createValidate =
  (ResponseSchema: TSchema, references: TSchema[] = []) =>
  (response: any) => {
    const errors = [...Value.Errors(ResponseSchema, references, response)];
    if (errors.length > 0) {
      for (const error of errors) {
        console.log(error.message, error.path, error.value);
      }
    }
    assert.deepEqual(errors, []);
  };

type CacheCategory = { slug: string };
type CacheChannel = { id: string; login: string };
type CacheClip = { slug: string };

const cache = {
  categories: null as null | CacheCategory[],
  channels: new Map<string, CacheChannel[]>(),
  clips: new Map<string, CacheClip[]>(),
};

const fetchCategories = async (): Promise<CacheCategory[]> => {
  const [queryResponse] = await gqlRequest([
    getQueryBowsePageAllDirectories({
      options: { sort: 'RELEVANCE' },
      limit: MAX_QUERIES_PER_REQUEST,
    }),
  ]);
  return queryResponse.data.directoriesWithTags!.edges.map((category) => ({
    slug: category.node.slug,
  }));
};

const fetchChannelsByCategory = async (
  slug: string,
): Promise<CacheChannel[]> => {
  const [queryResponse] = await gqlRequest([
    getQueryDirectoryPageGame({
      slug,
      options: { sort: 'VIEWER_COUNT' },
      sortTypeIsRecency: false,
      limit: MAX_QUERIES_PER_REQUEST,
      includeIsDJ: false,
    }),
  ]);
  return queryResponse.data.game!.streams.edges.map((stream) => ({
    id: stream.node.broadcaster.id,
    login: stream.node.broadcaster.login,
  }));
};

const fetchClipsByCategory = async (
  categorySlug: string,
): Promise<CacheClip[]> => {
  const [queryResponse] = await gqlRequest([
    getQueryClipsCardsGame({ categorySlug, limit: MAX_QUERIES_PER_REQUEST }),
  ]);
  return queryResponse.data.game!.clips!.edges.map((clip) => ({
    slug: clip.node.slug,
  }));
};

export const getCategories = async () =>
  cache.categories || (cache.categories = await fetchCategories());

export const getChannels = async (slug = 'just-chatting') =>
  cache.channels.get(slug)! ||
  cache.channels.set(slug, await fetchChannelsByCategory(slug)).get(slug);

export const getClips = async (slug = 'just-chatting') =>
  cache.clips.get(slug)! ||
  cache.clips.set(slug, await fetchClipsByCategory(slug)).get(slug);
