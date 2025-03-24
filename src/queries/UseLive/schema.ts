import { Type as T } from '@sinclair/typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'UseLive';
export const displayName = name;
export const tags = ['Streams'];

export const VariablesSchema = strictObject(
  { channelLogin: T.String() },
  { $id: `${displayName}Variables` },
);

export const DataSchema = strictObject(
  {
    user: T.Union([
      T.Null(),
      strictObject({
        ...pick(schemas.User, ['id', 'login']),
        stream: T.Union([
          T.Null(),
          strictObject(pick(schemas.Stream, ['id', 'createdAt'])),
        ]),
      }),
    ]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
