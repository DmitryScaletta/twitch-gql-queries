import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
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

export const VariablesSchema = strictObject(
  {
    imageWidth: T.Optional(T.Integer({ minimum: 0 })),
    slug: T.String(),
    options: strictObject({
      sort: LegacyRef(SortSchema),
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

export const StreamSchema = strictObject(
  {
    ...pick(schemas.Stream, [
      'id',
      'title',
      'viewersCount',
      'previewImageURL',
      'type',
    ]),
    broadcaster: T.Union([
      T.Null(),
      strictObject({
        ...pick(schemas.User, [
          'id',
          'login',
          'displayName',
          'profileImageURL',
          'primaryColorHex',
        ]),
        roles: strictObject(
          pick(schemas.UserRoles, ['isPartner', 'isParticipatingDJ']),
        ),
      }),
    ]),
    freeformTags: T.Array(
      strictObject(pick(schemas.FreeformTag, ['id', 'name'])),
    ),
    game: T.Union([
      T.Null(),
      strictObject(
        pick(schemas.Game, ['id', 'boxArtURL', 'name', 'displayName', 'slug']),
      ),
    ]),
    previewThumbnailProperties: strictObject(
      pick(schemas.PreviewThumbnailProperties, ['blurReason']),
    ),
  },
  { $id: `${displayName}Stream` },
);

export const GameSchema = strictObject(
  {
    ...pick(schemas.Game, ['id', 'name', 'displayName']),
    streams: strictObject({
      banners: T.Union([
        T.Null(),
        T.Array(T.Union([T.Literal('MAY_CONTAIN_MATURE_CONTENT')])),
      ]),
      edges: T.Array(
        strictObject({
          ...pick(schemas.StreamEdge, ['cursor', 'trackingID']),
          node: LegacyRef(StreamSchema),
        }),
      ),
      pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
      __typename: T.Literal('StreamConnection'),
    }),
  },
  { $id: `${displayName}Game` },
);

export const DataSchema = strictObject(
  { game: T.Union([T.Null(), LegacyRef(GameSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
