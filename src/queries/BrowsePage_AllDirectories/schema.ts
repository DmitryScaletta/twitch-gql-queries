import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'BrowsePage_AllDirectories';
const category = 'BrowsePage';
const displayName = `${category}AllDirectories`;

export const SortSchema = T.Union(
  [T.Literal('RELEVANCE'), T.Literal('VIEWER_COUNT')],
  { $id: `${category}Sort` },
);

export const VariablesSchema = T.Object(
  {
    limit: T.Number(),
    options: T.Object(
      {
        recommendationsContext: T.Optional(
          T.Union([
            T.Object(
              {
                platform: T.Optional(
                  T.Union([T.Null(), T.Literal('web'), T.String()]),
                ),
              },
              { additionalProperties: false },
            ),
            T.Null(),
          ]),
        ),
        sort: LegacyRef(SortSchema),
        tags: T.Optional(T.Union([T.Array(T.String()), T.Null()])),
      },
      { additionalProperties: false },
    ),
    cursor: T.Optional(T.Union([T.String(), T.Null()])),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const GameSchema = T.Object(
  {
    id: T.String(),
    slug: T.String(),
    displayName: T.String(),
    name: T.String(),
    avatarURL: T.String({
      /* format: 'uri' */
    }),
    viewersCount: T.Number(),
    tags: T.Array(
      T.Object(
        {
          id: T.String(),
          isLanguageTag: T.Boolean(),
          localizedName: T.String(),
          tagName: T.String(),
          __typename: T.Literal('Tag'),
        },
        { additionalProperties: false },
      ),
    ),
    originalReleaseDate: T.Union([
      T.String({
        /* format: 'date-time' */
      }),
      T.Null(),
    ]),
    __typename: T.Literal('Game'),
  },
  {
    $id: `${category}Game`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    directoriesWithTags: T.Union([
      T.Null(),
      T.Object(
        {
          edges: T.Array(
            T.Object(
              {
                cursor: T.String(),
                trackingID: T.Union([T.Null(), T.String()]),
                node: LegacyRef(GameSchema),
                __typename: T.Literal('GameEdge'),
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
          __typename: T.Literal('GameConnection'),
        },
        { additionalProperties: false },
      ),
    ]),
  },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema, true);
