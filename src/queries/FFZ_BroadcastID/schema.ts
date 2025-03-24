import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'FFZ_BroadcastID';
export const displayName = 'FfzBroadcastId';
export const tags = ['Streams'];

export const VariablesSchema = strictObject(
  { id: T.String() },
  { $id: `${displayName}Variables` },
);

export const UserSchema = strictObject(
  {
    ...pick(schemas.User, ['id']),
    stream: T.Union([
      T.Null(),
      strictObject({
        ...pick(schemas.Stream, ['id']),
        archiveVideo: T.Union([
          T.Null(),
          strictObject(pick(schemas.Video, ['id'])),
        ]),
      }),
    ]),
  },
  { $id: `${displayName}User` },
);

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), LegacyRef(UserSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
