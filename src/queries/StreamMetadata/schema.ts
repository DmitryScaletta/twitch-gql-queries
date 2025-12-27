import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'StreamMetadata';
export const displayName = name;
export const tags = ['Streams'];

export const VariablesSchema = strictObject(
  {
    channelLogin: T.String(),
    includeIsDJ: T.Boolean(),
  },
  { $id: `${displayName}Variables` },
);

export const UserSchema = strictObject(
  {
    ...pick(schemas.User, ['id', 'primaryColorHex', 'profileImageURL']),
    roles: strictObject({
      ...pick(schemas.UserRoles, ['isPartner']),
      isParticipatingDJ: T.Optional(T.Boolean()),
    }),
    primaryTeam: T.Union([
      T.Null(),
      strictObject(pick(schemas.Team, ['id', 'name', 'displayName'])),
    ]),
    channel: strictObject(pick(schemas.Channel, ['id'])),
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
  },
  { $id: `${displayName}User` },
);

export const DataSchema = strictObject(
  { user: TRef(UserSchema) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
