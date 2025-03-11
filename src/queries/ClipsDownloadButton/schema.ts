import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'ClipsDownloadButton';
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
    createdAt: T.String({
      /* format: 'date-time', */
    }),
    durationSeconds: T.Number(),
    viewCount: T.Number(),
    broadcaster: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
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
          name: T.String(),
          __typename: T.Literal('Game'),
        },
        { additionalProperties: false },
      ),
    ]),
    playbackAccessToken: T.Object(
      {
        signature: T.String(),
        value: T.String(),
        __typename: T.Literal('PlaybackAccessToken'),
      },
      { additionalProperties: false },
    ),
    videoQualities: T.Array(
      T.Object(
        {
          sourceURL: T.String({
            /* format: 'uri' */
          }),
          __typename: T.Literal('ClipVideoQuality'),
        },
        { additionalProperties: false },
      ),
    ),
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
