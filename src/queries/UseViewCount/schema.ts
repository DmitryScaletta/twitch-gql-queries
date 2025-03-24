import { Type as T } from '@sinclair/typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'UseViewCount';
export const displayName = name;
export const tags = ['Streams'];

export const VariablesSchema = strictObject(
  { channelLogin: T.String() },
  { $id: `${displayName}Variables` },
);

const UserSchema = strictObject({
  ...pick(schemas.User, ['id']),
  stream: T.Union([
    T.Null(),
    strictObject(pick(schemas.Stream, ['id', 'viewersCount'])),
  ]),
});

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
