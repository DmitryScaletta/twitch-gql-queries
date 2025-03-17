import { Type as T } from '@sinclair/typebox';
import { getResponseSchema } from '../../schema.ts';

const name = 'WatchLivePrompt';
const displayName = name;

export const VariablesSchema = T.Object(
  { slug: T.String() },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

const GameSchema = T.Object(
  {
    id: T.String(),
    displayName: T.String(),
    __typename: T.Literal('Game'),
  },
  { additionalProperties: false },
);

const StreamSchema = T.Object(
  {
    id: T.String(),
    game: T.Union([T.Null(), GameSchema]),
    __typename: T.Literal('Stream'),
  },
  { additionalProperties: false },
);

const BroadcasterSchema = T.Object(
  {
    id: T.String(),
    login: T.String(),
    displayName: T.String(),
    stream: T.Union([T.Null(), StreamSchema]),
    __typename: T.Literal('User'),
  },
  { additionalProperties: false },
);

const ClipSchema = T.Object(
  {
    id: T.String(),
    durationSeconds: T.Number(),
    broadcaster: T.Union([T.Null(), BroadcasterSchema]),
    thumbnailURL: T.String({
      /* format: 'uri' */
    }),
    __typename: T.Literal('Clip'),
  },
  { additionalProperties: false },
);

export const DataSchema = T.Object(
  { clip: T.Union([T.Null(), ClipSchema]) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
