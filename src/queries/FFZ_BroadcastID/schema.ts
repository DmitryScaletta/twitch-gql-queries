import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'FFZ_BroadcastID';
const displayName = 'FfzBroadcastId';

export const VariablesSchema = buildObject(
  { id: T.String() },
  { $id: `${displayName}Variables` },
);

export const UserSchema = buildObject(
  {
    ...pick(schemas.User, ['id']),
    stream: T.Union([
      T.Null(),
      buildObject({
        ...pick(schemas.Stream, ['id']),
        archiveVideo: T.Union([
          T.Null(),
          buildObject(pick(schemas.Video, ['id'])),
        ]),
      }),
    ]),
  },
  { $id: `${displayName}User` },
);

export const DataSchema = buildObject(
  { user: T.Union([T.Null(), LegacyRef(UserSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
