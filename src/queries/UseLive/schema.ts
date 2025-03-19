import { Type as T } from '@sinclair/typebox';
import { buildObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'UseLive';
const displayName = name;

export const VariablesSchema = buildObject(
  { channelLogin: T.String() },
  { $id: `${displayName}Variables` },
);

export const DataSchema = buildObject(
  {
    user: T.Union([
      T.Null(),
      buildObject({
        ...pick(schemas.User, ['id', 'login']),
        stream: T.Union([
          T.Null(),
          buildObject(pick(schemas.Stream, ['id', 'createdAt'])),
        ]),
      }),
    ]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
