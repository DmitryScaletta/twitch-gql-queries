import { Type as T } from '@sinclair/typebox';
import { buildObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'UseViewCount';
const displayName = name;

export const VariablesSchema = buildObject(
  { channelLogin: T.String() },
  { $id: `${displayName}Variables` },
);

const UserSchema = buildObject({
  ...pick(schemas.User, ['id']),
  stream: T.Union([
    T.Null(),
    buildObject(pick(schemas.Stream, ['id', 'viewersCount'])),
  ]),
});

export const DataSchema = buildObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
