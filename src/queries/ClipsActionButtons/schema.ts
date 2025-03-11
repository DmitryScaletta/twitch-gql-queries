import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'ClipsActionButtons';
const displayName = name;

export const VariablesSchema = T.Object(
  { slug: T.String() },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const ClipSchema = T.Object(
  {
    id: T.String(),
    title: T.String(),
    broadcast: T.Object(
      {
        id: T.String(),
        __typename: T.Literal('Broadcast'),
      },
      { additionalProperties: false },
    ),
    broadcaster: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          login: T.String(),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ]),
    curator: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ]),
    game: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          displayName: T.String(),
          __typename: T.Literal('Game'),
        },
        { additionalProperties: false },
      ),
    ]),
    video: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          broadcastType: T.Union([
            T.Literal('ARCHIVE'),
            T.Literal('HIGHLIGHT'),
          ]),
          title: T.String(),
          __typename: T.Literal('Video'),
        },
        { additionalProperties: false },
      ),
    ]),
    videoOffsetSeconds: T.Union([T.Null(), T.Number()]),
    durationSeconds: T.Number(),
    viewCount: T.Number(),
    language: T.String(),
    isFeatured: T.Boolean(),
    isPublished: T.Boolean(),
    createdAt: T.String(),
    __typename: T.Literal('Clip'),
  },
  {
    $id: `${displayName}Clip`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  { clip: T.Union([T.Null(), LegacyRef(ClipSchema)]) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
