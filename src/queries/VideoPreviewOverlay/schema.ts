import { Type as T } from '@sinclair/typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'VideoPreviewOverlay';
export const displayName = name;
export const tags = ['Streams'];

export const VariablesSchema = strictObject(
  { login: T.String() },
  { $id: `${displayName}Variables` },
);

const UserSchema = strictObject({
  ...pick(schemas.User, ['id']),
  stream: T.Union([
    T.Null(),
    strictObject(
      pick(schemas.Stream, ['id', 'previewImageURL', 'restrictionType']),
    ),
  ]),
});

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
