import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'GetUserID';
export const displayName = 'GetUserId';
export const tags = ['Channels'];

export const VariablesSchema = strictObject(
  {
    login: T.String(),
    lookupType: T.Union([T.Literal('ACTIVE'), T.Literal('ALL')], {
      description:
        'ACTIVE – only active users\nALL – all users, including suspended',
    }),
  },
  { $id: `${displayName}Variables` },
);

const UserSchema = strictObject(pick(schemas.User, ['id']));

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), UserSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
