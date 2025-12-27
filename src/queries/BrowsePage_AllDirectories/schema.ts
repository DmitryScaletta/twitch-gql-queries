import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'BrowsePage_AllDirectories';
export const displayName = 'BrowsePageAllDirectories';
export const tags = ['Games'];
const category = 'BrowsePage';

export const SortSchema = T.Union(
  [T.Literal('RELEVANCE'), T.Literal('VIEWER_COUNT')],
  { $id: `${category}Sort` },
);

export const VariablesSchema = strictObject(
  {
    limit: T.Integer({ minimum: 1 }),
    options: strictObject({
      recommendationsContext: T.Optional(
        T.Union([
          T.Null(),
          strictObject({
            platform: T.Optional(
              T.Union([T.Null(), T.Literal('web'), T.String()]),
            ),
          }),
        ]),
      ),
      sort: TRef(SortSchema),
      tags: T.Optional(T.Union([T.Null(), T.Array(T.String())])),
    }),
    cursor: T.Optional(T.Union([T.Null(), T.String()])),
  },
  { $id: `${displayName}Variables` },
);

export const GameSchema = strictObject(
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
      strictObject(
        pick(schemas.Tag, ['id', 'isLanguageTag', 'localizedName', 'tagName']),
      ),
    ),
  },
  { $id: `${category}Game` },
);

const GameConnectionSchema = strictObject({
  edges: T.Array(
    strictObject({
      ...pick(schemas.GameEdge, ['cursor', 'trackingID']),
      node: TRef(GameSchema),
    }),
  ),
  pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
  __typename: T.Literal('GameConnection'),
});

export const DataSchema = strictObject(
  { directoriesWithTags: T.Union([T.Null(), GameConnectionSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
