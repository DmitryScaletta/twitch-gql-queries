import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'StreamMetadata';
export const displayName = name;
export const tags = ['Streams'];

export const VariablesSchema = strictObject(
  { channelLogin: T.String() },
  { $id: `${displayName}Variables` },
);

export const UserSchema = strictObject(
  {
    ...pick(schemas.User, [
      'id',
      'primaryColorHex',
      'isPartner',
      'profileImageURL',
    ]),
    primaryTeam: T.Union([
      T.Null(),
      strictObject(pick(schemas.Team, ['id', 'name', 'displayName'])),
    ]),
    squadStream: T.Union([T.Null()]),
    channel: strictObject({
      ...pick(schemas.Channel, ['id']),
      chanlets: T.Union([T.Null()]),
    }),
    lastBroadcast: strictObject(
      {
        id: T.Union([T.Null(), T.String({ pattern: '^[0-9]+$' })]),
        title: T.Union([T.Null(), T.String()]),
        __typename: T.Literal('Broadcast'),
      },
      { description: 'If never streamed: `{ id: null, title: null }`' },
    ),
    stream: T.Union([
      T.Null(),
      strictObject({
        ...pick(schemas.Stream, ['id', 'type', 'createdAt']),
        game: T.Union([
          T.Null(),
          strictObject(pick(schemas.Game, ['id', 'slug', 'name'])),
        ]),
      }),
    ]),
    __typename: T.Literal('User'),
  },
  { $id: `${displayName}User` },
);

export const DataSchema = strictObject(
  { user: LegacyRef(UserSchema) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
