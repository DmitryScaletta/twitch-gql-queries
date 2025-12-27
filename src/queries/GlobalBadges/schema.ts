import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, TRef, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'GlobalBadges';
export const displayName = name;
export const tags = ['Chat'];

export const VariablesSchema = strictObject(
  {},
  { $id: `${displayName}Variables` },
);

export const BadgeSchema = strictObject(
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

export const DataSchema = strictObject(
  { badges: T.Array(TRef(BadgeSchema)) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
