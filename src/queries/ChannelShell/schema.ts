import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'ChannelShell';
const displayName = name;

export const VariablesSchema = buildObject(
  { login: T.String() },
  { $id: `${displayName}Variables` },
);

export const UserSchema = buildObject(
  {
    ...pick(schemas.User, [
      'id',
      'login',
      'displayName',
      'primaryColorHex',
      'profileImageURL',
      'bannerImageURL',
    ]),
    stream: T.Union([
      T.Null(),
      buildObject(pick(schemas.Stream, ['id', 'viewersCount'])),
    ]),
    channel: buildObject({
      ...pick(schemas.Channel, ['id']),
      self: buildObject({
        isAuthorized: T.Boolean(),
        restrictionType: T.Null(),
        __typename: T.Literal('ChannelSelfEdge'),
      }),
      trailer: buildObject({
        video: T.Union([
          T.Null(),
          buildObject({
            ...pick(schemas.Video, ['id']),
            self: buildObject({
              viewingHistory: T.Null(),
              __typename: T.Literal('VideoSelfEdge'),
            }),
          }),
        ]),
        __typename: T.Literal('Trailer'),
      }),
      home: buildObject({
        preferences: buildObject({
          heroPreset: T.String(),
          __typename: T.Literal('ChannelHomePreferences'),
        }),
        __typename: T.Literal('ChannelHome'),
      }),
    }),
  },
  { $id: `${displayName}User` },
);

export const UserDoesNotExistSchema = buildObject(
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
  { $id: `${displayName}UserDoesNotExist` },
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
