import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';
import { ClipsCardsClip, ClipsCardsFilter } from '../ClipsCards.schema.ts';

const name = 'ClipsCards__User';
const displayName = 'ClipsCardsUser';

export const VariablesSchema = T.Object(
  {
    login: T.String(),
    limit: T.Number(),
    criteria: T.Optional(
      T.Object(
        {
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
    user: T.Object(
      {
        id: T.String(),
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
        __typename: T.Literal('User'),
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
