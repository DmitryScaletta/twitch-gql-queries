import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';
import { ClipsCardsClip, ClipsCardsFilter } from '../ClipsCards.schema.ts';

const name = 'ClipsCards__Game';
const displayName = 'ClipsCardsGame';

export const VariablesSchema = T.Object(
  {
    categorySlug: T.String(),
    limit: T.Number(),
    criteria: T.Optional(
      T.Object(
        {
          languages: T.Optional(T.Union([T.Array(T.String()), T.Null()])),
          filter: T.Optional(T.Union([LegacyRef(ClipsCardsFilter), T.Null()])),
          isFeatured: T.Optional(T.Union([T.Boolean(), T.Null()])),
        },
        { additionalProperties: false },
      ),
    ),
    cursor: T.Optional(T.Union([T.String(), T.Null()])),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    game: T.Object(
      {
        id: T.String(),
        displayName: T.String(),
        clips: T.Object(
          {
            pageInfo: T.Object(
              {
                hasNextPage: T.Boolean(),
                __typename: T.Literal('PageInfo'),
              },
              { additionalProperties: false },
            ),
            edges: T.Array(
              T.Object(
                {
                  cursor: T.Union([T.Null(), T.String()]),
                  node: LegacyRef(ClipsCardsClip),
                  __typename: T.Literal('ClipEdge'),
                },
                { additionalProperties: false },
              ),
            ),
            __typename: T.Literal('ClipConnection'),
          },
          { additionalProperties: false },
        ),
        __typename: T.Literal('Game'),
      },
      { additionalProperties: false },
    ),
  },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
