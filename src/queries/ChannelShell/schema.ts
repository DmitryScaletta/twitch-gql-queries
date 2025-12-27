import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'ChannelShell';
export const displayName = name;
export const tags = ['Channels'];

export const VariablesSchema = strictObject(
  { login: T.String() },
  { $id: `${displayName}Variables` },
);

export const UserSchema = strictObject(
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
      strictObject(pick(schemas.Stream, ['id', 'viewersCount'])),
    ]),
    channel: strictObject({
      ...pick(schemas.Channel, ['id']),
      self: strictObject({
        isAuthorized: T.Boolean(),
        restrictionType: T.Null(),
        __typename: T.Literal('ChannelSelfEdge'),
      }),
      trailer: strictObject({
        video: T.Union([
          T.Null(),
          strictObject({
            ...pick(schemas.Video, ['id']),
            self: strictObject(pick(schemas.VideoSelfEdge, ['viewingHistory'])),
          }),
        ]),
        __typename: T.Literal('Trailer'),
      }),
      home: strictObject({
        preferences: strictObject({
          heroPreset: T.String(),
          __typename: T.Literal('ChannelHomePreferences'),
        }),
        __typename: T.Literal('ChannelHome'),
      }),
    }),
  },
  { $id: `${displayName}User` },
);

export const UserDoesNotExistSchema = strictObject(
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

export const DataSchema = strictObject(
  {
    userOrError: T.Union([TRef(UserSchema), TRef(UserDoesNotExistSchema)]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
