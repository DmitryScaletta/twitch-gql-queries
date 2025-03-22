import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'StreamMetadata';
const displayName = name;

export const VariablesSchema = buildObject(
  { channelLogin: T.String() },
  { $id: `${displayName}Variables` },
);

export const UserSchema = buildObject(
  {
    ...pick(schemas.User, [
      'id',
      'primaryColorHex',
      'isPartner',
      'profileImageURL',
    ]),
    primaryTeam: T.Union([
      T.Null(),
      buildObject(pick(schemas.Team, ['id', 'name', 'displayName'])),
    ]),
    squadStream: T.Union([T.Null()]),
    channel: buildObject({
      ...pick(schemas.Channel, ['id']),
      chanlets: T.Union([T.Null()]),
    }),
    lastBroadcast: buildObject(
      {
        id: T.Union([T.Null(), T.String()]),
        title: T.Union([T.Null(), T.String()]),
        __typename: T.Literal('Broadcast'),
      },
      { description: 'If never streamed: `{ id: null, title: null }`' },
    ),
    stream: T.Union([
      T.Null(),
      buildObject({
        ...pick(schemas.Stream, ['id', 'type', 'createdAt']),
        game: T.Union([
          T.Null(),
          buildObject(pick(schemas.Game, ['id', 'slug', 'name'])),
        ]),
      }),
    ]),
    __typename: T.Literal('User'),
  },
  { $id: `${displayName}User` },
);

export const DataSchema = buildObject(
  { user: LegacyRef(UserSchema) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
