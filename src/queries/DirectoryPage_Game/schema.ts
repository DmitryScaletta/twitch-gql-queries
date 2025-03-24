import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'DirectoryPage_Game';
export const displayName = 'DirectoryPageGame';
export const tags = ['Streams'];

export const SortSchema = T.Union(
  [
    T.Literal('RELEVANCE'),
    T.Literal('VIEWER_COUNT'),
    T.Literal('VIEWER_COUNT_ASC'),
    T.Literal('RECENT'),
  ],
  { $id: `${displayName}Sort` },
);

export const VariablesSchema = buildObject(
  {
    imageWidth: T.Optional(T.Integer({ minimum: 0 })),
    slug: T.String(),
    options: buildObject({
      sort: LegacyRef(SortSchema),
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
      freeformTags: T.Optional(T.Union([T.Null(), T.Array(T.String())])),
      // not tested. probably array of strings
      tags: T.Optional(T.Union([T.Null(), T.Array(T.String())])),
      broadcasterLanguages: T.Optional(
        T.Union([T.Null(), T.Array(T.String())]),
      ),
      // not tested. probably array of strings
      systemFilters: T.Optional(T.Union([T.Null(), T.Array(T.String())])),
    }),
    sortTypeIsRecency: T.Boolean(),
    limit: T.Integer({ minimum: 1 }),
    includeIsDJ: T.Boolean(),
  },
  { $id: `${displayName}Variables` },
);

export const StreamSchema = buildObject(
  {
    ...pick(schemas.Stream, [
      'id',
      'title',
      'viewersCount',
      'previewImageURL',
      'type',
    ]),
    broadcaster: buildObject({
      ...pick(schemas.User, [
        'id',
        'login',
        'displayName',
        'profileImageURL',
        'primaryColorHex',
      ]),
      roles: buildObject(
        pick(schemas.UserRoles, ['isPartner', 'isParticipatingDJ']),
      ),
    }),
    freeformTags: T.Array(
      buildObject(pick(schemas.FreeformTag, ['id', 'name'])),
    ),
    game: buildObject(
      pick(schemas.Game, ['id', 'boxArtURL', 'name', 'displayName', 'slug']),
    ),
    previewThumbnailProperties: buildObject(
      pick(schemas.PreviewThumbnailProperties, ['blurReason']),
    ),
  },
  { $id: `${displayName}Stream` },
);

export const GameSchema = buildObject(
  {
    ...pick(schemas.Game, ['id', 'name', 'displayName']),
    streams: buildObject({
      banners: T.Union([
        T.Null(),
        T.Array(T.Union([T.Literal('MAY_CONTAIN_MATURE_CONTENT')])),
      ]),
      edges: T.Array(
        buildObject({
          ...pick(schemas.StreamEdge, ['cursor', 'trackingID']),
          node: LegacyRef(StreamSchema),
        }),
      ),
      pageInfo: buildObject(pick(schemas.PageInfo, ['hasNextPage'])),
      __typename: T.Literal('StreamConnection'),
    }),
  },
  { $id: `${displayName}Game` },
);

export const DataSchema = buildObject(
  { game: T.Union([T.Null(), LegacyRef(GameSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
