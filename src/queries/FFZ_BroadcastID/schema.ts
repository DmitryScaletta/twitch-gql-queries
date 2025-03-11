import { Type as T } from '@sinclair/typebox';
import { getResponseSchema } from '../../schema.ts';

const name = 'FFZ_BroadcastID';
const displayName = 'FfzBroadcastId';

export const VariablesSchema = T.Object(
  { id: T.String() },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const UserSchema = T.Object(
  {
    id: T.String(),
    stream: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          archiveVideo: T.Union([
            T.Null(),
            T.Object(
              {
                id: T.String(),
                __typename: T.Literal('Video'),
              },
              { additionalProperties: false },
            ),
          ]),
          __typename: T.Literal('Stream'),
        },
        { additionalProperties: false },
      ),
    ]),
    __typename: T.Literal('User'),
  },
  {
    $id: `${displayName}User`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  { user: T.Union([T.Null(), UserSchema]) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
