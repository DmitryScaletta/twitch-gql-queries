import { Type as T } from '@sinclair/typebox';
import { getResponseSchema } from '../../schema.ts';

const name = 'GetUserID';
const displayName = 'GetUserId';

export const VariablesSchema = T.Object(
  {
    login: T.String(),
    lookupType: T.Union([T.Literal('ACTIVE'), T.Literal('ALL')], {
      description:
        'ACTIVE – only active users\nALL – all users, including suspended',
    }),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    user: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ]),
  },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
