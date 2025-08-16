import { Type as T } from '@sinclair/typebox';
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

export const DataSchema = strictObject(
  {
    user: strictObject({
      ...pick(schemas.User, []),
      id: T.Union([T.Literal(''), schemas.User.id]),
    }),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
