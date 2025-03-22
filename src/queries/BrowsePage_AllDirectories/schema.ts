import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'BrowsePage_AllDirectories';
const category = 'BrowsePage';
const displayName = `${category}AllDirectories`;

export const SortSchema = T.Union(
  [T.Literal('RELEVANCE'), T.Literal('VIEWER_COUNT')],
  { $id: `${category}Sort` },
);

export const VariablesSchema = buildObject(
  {
    limit: T.Integer({ minimum: 1 }),
    options: buildObject({
      recommendationsContext: T.Optional(
        T.Union([
          T.Null(),
          buildObject({
            platform: T.Optional(
              T.Union([T.Null(), T.Literal('web'), T.String()]),
            ),
          }),
        ]),
      ),
      sort: LegacyRef(SortSchema),
      tags: T.Optional(T.Union([T.Null(), T.Array(T.String())])),
    }),
    cursor: T.Optional(T.Union([T.Null(), T.String()])),
  },
  { $id: `${displayName}Variables` },
);

export const GameSchema = buildObject(
  {
    ...pick(schemas.Game, [
      'id',
      'slug',
      'displayName',
      'name',
      'avatarURL',
      'viewersCount',
      'originalReleaseDate',
    ]),
    tags: T.Array(
      buildObject(
        pick(schemas.Tag, ['id', 'isLanguageTag', 'localizedName', 'tagName']),
      ),
    ),
  },
  { $id: `${category}Game` },
);

export const DataSchema = buildObject(
  {
    directoriesWithTags: T.Union([
      T.Null(),
      buildObject({
        edges: T.Array(
          buildObject({
            ...pick(schemas.GameEdge, ['cursor', 'trackingID']),
            node: LegacyRef(GameSchema),
          }),
        ),
        pageInfo: buildObject(pick(schemas.PageInfo, ['hasNextPage'])),
        __typename: T.Literal('GameConnection'),
      }),
    ]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
