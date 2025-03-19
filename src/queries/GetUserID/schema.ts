import { Type as T } from '@sinclair/typebox';
import { buildObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'GetUserID';
const displayName = 'GetUserId';

export const VariablesSchema = buildObject(
  {
    login: T.String(),
    lookupType: T.Union([T.Literal('ACTIVE'), T.Literal('ALL')], {
      description:
        'ACTIVE – only active users\nALL – all users, including suspended',
    }),
  },
  { $id: `${displayName}Variables` },
);

export const DataSchema = buildObject(
  { user: T.Union([T.Null(), buildObject(pick(schemas.User, ['id']))]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
