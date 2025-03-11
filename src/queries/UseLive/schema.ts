import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'UseLive';
const displayName = name;

export const VariablesSchema = T.Object(
  { channelLogin: T.String() },
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
          login: T.String(),
          stream: T.Union([
            T.Null(),
            T.Object(
              {
                id: T.String(),
                createdAt: T.String({
                  // format: 'date-time',
                }),
                __typename: T.Literal('Stream'),
              },
              { additionalProperties: false },
            ),
          ]),
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
