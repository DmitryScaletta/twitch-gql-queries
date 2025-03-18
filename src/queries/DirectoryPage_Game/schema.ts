import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'DirectoryPage_Game';
const displayName = 'DirectoryPageGame';

export const VariablesSchema = T.Object(
  {
    imageWidth: T.Optional(T.Number()),
    slug: T.String(),
    options: T.Object(
      {
        sort: T.Union([
          T.Literal('RELEVANCE'),
          T.Literal('VIEWER_COUNT'),
          T.Literal('VIEWER_COUNT_ASC'),
          T.Literal('RECENT'),
        ]),
        recommendationsContext: T.Optional(
          T.Union([
            T.Null(),
            T.Object({
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
      },
      { additionalProperties: false },
    ),
    sortTypeIsRecency: T.Boolean(),
    limit: T.Number(),
    includeIsDJ: T.Boolean(),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const StreamSchema = T.Object(
  {
    id: T.String(),
    title: T.String(),
    viewersCount: T.Number(),
    previewImageURL: T.String({
      // format: 'uri',
    }),
    broadcaster: T.Object(
      {
        id: T.String(),
        login: T.String(),
        displayName: T.String(),
        roles: T.Object(
          {
            isPartner: T.Boolean(),
            isParticipatingDJ: T.Boolean(),
            __typename: T.Literal('UserRoles'),
          },
          { additionalProperties: false },
        ),
        profileImageURL: T.String(),
        primaryColorHex: T.Union([T.Null(), T.String()]),
        __typename: T.Literal('User'),
      },
      { additionalProperties: false },
    ),
    freeformTags: T.Array(
      T.Object(
        {
          id: T.String(),
          name: T.String(),
          __typename: T.Literal('FreeformTag'),
        },
        { additionalProperties: false },
      ),
    ),
    type: T.Literal('live'),
    game: T.Object(
      {
        id: T.String(),
        boxArtURL: T.String({
          /* format: 'uri' */
        }),
        name: T.String(),
        displayName: T.String(),
        slug: T.String(),
        __typename: T.Literal('Game'),
      },
      { additionalProperties: false },
    ),
    previewThumbnailProperties: T.Object(
      {
        blurReason: T.Union([T.Literal('BLUR_NOT_REQUIRED'), T.String()]),
        __typename: T.Literal('PreviewThumbnailProperties'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('Stream'),
  },
  {
    $id: `${displayName}Stream`,
    additionalProperties: false,
  },
);

export const GameSchema = T.Object(
  {
    id: T.String(),
    name: T.String(),
    displayName: T.String(),
    streams: T.Object(
      {
        banners: T.Union([
          T.Null(),
          T.Array(
            T.Union([T.Literal('MAY_CONTAIN_MATURE_CONTENT'), T.String()]),
          ),
        ]),
        edges: T.Array(
          T.Object(
            {
              cursor: T.Union([T.Null(), T.String()]),
              node: LegacyRef(StreamSchema),
              trackingID: T.Union([T.Null(), T.String()]),
              __typename: T.Literal('StreamEdge'),
            },
            { additionalProperties: false },
          ),
        ),
        pageInfo: T.Object(
          {
            hasNextPage: T.Boolean(),
            __typename: T.Literal('PageInfo'),
          },
          { additionalProperties: false },
        ),
        __typename: T.Literal('StreamConnection'),
      },
      {
        additionalProperties: false,
      },
    ),
    __typename: T.Literal('Game'),
  },
  {
    $id: `${displayName}Game`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  { game: T.Union([T.Null(), LegacyRef(GameSchema)]) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema, true);
