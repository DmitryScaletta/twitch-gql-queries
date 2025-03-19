import { Type as T } from '@sinclair/typebox';
import { buildObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'VideoPreviewOverlay';
const displayName = name;

export const VariablesSchema = buildObject(
  { login: T.String() },
  { $id: `${displayName}Variables` },
);

const UserSchema = buildObject({
  ...pick(schemas.User, ['id']),
  stream: T.Union([
    T.Null(),
    buildObject(
      pick(schemas.Stream, ['id', 'previewImageURL', 'restrictionType']),
    ),
  ]),
});

export const DataSchema = buildObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
