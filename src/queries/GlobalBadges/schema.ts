import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'GlobalBadges';
const displayName = name;

export const BadgeSchema = T.Object(
  {
    id: T.String(),
    setID: T.String(),
    version: T.String(),
    title: T.String(),
    image1x: T.String({
      /* format: 'uri' */
    }),
    image2x: T.String({
      /* format: 'uri' */
    }),
    image4x: T.String({
      /* format: 'uri' */
    }),
    clickAction: T.Union([
      T.Null(),
      T.Literal('VISIT_URL'),
      T.Literal('SUBSCRIBE'),
      T.Literal('GET_TURBO'),
    ]),
    clickURL: T.Union([
      T.Null(),
      T.String({
        /* format: 'uri' */
      }),
    ]),
    __typename: T.Literal('Badge'),
  },
  {
    $id: `${displayName}Badge`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  { badges: T.Array(LegacyRef(BadgeSchema)) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
