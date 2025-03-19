import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'ClipsActionButtons';
const displayName = name;

export const VariablesSchema = buildObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

export const ClipSchema = buildObject(
  {
    ...pick(schemas.Clip, [
      'id',
      'title',
      'videoOffsetSeconds',
      'durationSeconds',
      'viewCount',
      'language',
      'isFeatured',
      'isPublished',
      'createdAt',
    ]),
    broadcast: T.Object(pick(schemas.Broadcast, ['id'])),
    broadcaster: T.Union([
      T.Null(),
      buildObject(pick(schemas.User, ['id', 'login'])),
    ]),
    curator: T.Union([T.Null(), buildObject(pick(schemas.User, ['id']))]),
    game: T.Union([
      T.Null(),
      buildObject(pick(schemas.Game, ['id', 'displayName'])),
    ]),
    video: T.Union([
      T.Null(),
      buildObject(pick(schemas.Video, ['id', 'broadcastType', 'title'])),
    ]),
  },
  { $id: `${displayName}Clip` },
);

export const DataSchema = buildObject(
  { clip: T.Union([T.Null(), LegacyRef(ClipSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
