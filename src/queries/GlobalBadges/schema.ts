import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'GlobalBadges';
const displayName = name;

export const BadgeSchema = buildObject(
  pick(schemas.Badge, [
    'id',
    'setID',
    'version',
    'title',
    'image1x',
    'image2x',
    'image4x',
    'clickAction',
    'clickURL',
  ]),
  { $id: `${displayName}Badge` },
);

export const DataSchema = buildObject(
  { badges: T.Array(LegacyRef(BadgeSchema)) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
