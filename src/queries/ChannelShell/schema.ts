import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'ChannelShell';
const displayName = name;

export const VariablesSchema = T.Object(
  { login: T.String() },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const UserSchema = T.Object(
  {
    id: T.String(),
    login: T.String(),
    displayName: T.String(),
    primaryColorHex: T.Union([T.Null(), T.String()]),
    profileImageURL: T.String(),
    bannerImageURL: T.String(),
    stream: T.Union([
      T.Object(
        {
          id: T.String(),
          viewersCount: T.Number(),
          __typename: T.Literal('Stream'),
        },
        { additionalProperties: false },
      ),
      T.Null(),
    ]),
    channel: T.Object(
      {
        id: T.String(),
        self: T.Object(
          {
            isAuthorized: T.Boolean(),
            restrictionType: T.Null(),
            __typename: T.Literal('ChannelSelfEdge'),
          },
          { additionalProperties: false },
        ),
        trailer: T.Object(
          {
            video: T.Union([
              T.Object(
                {
                  id: T.String(),
                  self: T.Object(
                    {
                      viewingHistory: T.Null(),
                      __typename: T.Literal('VideoSelfEdge'),
                    },
                    { additionalProperties: false },
                  ),
                  __typename: T.Literal('Video'),
                },
                { additionalProperties: false },
              ),
              T.Null(),
            ]),
            __typename: T.Literal('Trailer'),
          },
          { additionalProperties: false },
        ),
        home: T.Object(
          {
            preferences: T.Object(
              {
                heroPreset: T.String(),
                __typename: T.Literal('ChannelHomePreferences'),
              },
              { additionalProperties: false },
            ),
            __typename: T.Literal('ChannelHome'),
          },
          { additionalProperties: false },
        ),
        __typename: T.Literal('Channel'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('User'),
  },
  {
    $id: `${displayName}User`,
    additionalProperties: false,
  },
);

export const UserDoesNotExistSchema = T.Object(
  {
    userDoesNotExist: T.String(),
    reason: T.Union([
      T.Literal('UNKNOWN'),
      T.Literal('TOS_INDEFINITE'),
      T.Literal('TOS_TEMPORARY'),
      T.Literal('DMCA'),
    ]),
    __typename: T.Literal('UserDoesNotExist'),
  },
  {
    $id: `${displayName}UserDoesNotExist`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    userOrError: T.Union([
      LegacyRef(UserSchema),
      LegacyRef(UserDoesNotExistSchema),
    ]),
  },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
