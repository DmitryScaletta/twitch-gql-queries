import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'StreamMetadata';
const displayName = name;

export const VariablesSchema = T.Object(
  { channelLogin: T.String() },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const UserSchema = T.Object(
  {
    id: T.String(),
    primaryColorHex: T.Union([T.Null(), T.String()]),
    isPartner: T.Boolean(),
    profileImageURL: T.String({
      /* format: 'uri' */
    }),
    primaryTeam: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          name: T.String(),
          displayName: T.String(),
          __typename: T.Literal('Team'),
        },
        { additionalProperties: false },
      ),
    ]),
    squadStream: T.Union([T.Null(), T.Unknown()]),
    channel: T.Object(
      {
        id: T.String(),
        chanlets: T.Null(),
        __typename: T.Literal('Channel'),
      },
      { additionalProperties: false },
    ),
    lastBroadcast: T.Object(
      {
        id: T.Union([T.Null(), T.String()]),
        title: T.Union([T.Null(), T.String()]),
        __typename: T.Literal('Broadcast'),
      },
      { additionalProperties: false },
    ),
    stream: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          type: T.Literal('live'),
          createdAt: T.String(),
          game: T.Union([
            T.Null(),
            T.Object(
              {
                id: T.String(),
                slug: T.String(),
                name: T.String(),
                __typename: T.Literal('Game'),
              },
              { additionalProperties: false },
            ),
          ]),
          __typename: T.Literal('Stream'),
        },
        { additionalProperties: false },
      ),
    ]),
    __typename: T.Literal('User'),
  },
  {
    $id: `${displayName}User`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  { user: LegacyRef(UserSchema) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
