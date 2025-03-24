import { Type as T } from '@sinclair/typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'WatchLivePrompt';
export const displayName = name;
export const tags = ['Clips'];

export const VariablesSchema = strictObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

const StreamSchema = strictObject({
  ...pick(schemas.Stream, ['id']),
  game: T.Union([
    T.Null(),
    strictObject(pick(schemas.Game, ['id', 'displayName'])),
  ]),
});

const BroadcasterSchema = strictObject({
  ...pick(schemas.User, ['id', 'login', 'displayName']),
  stream: T.Union([T.Null(), StreamSchema]),
});

const ClipSchema = strictObject({
  ...pick(schemas.Clip, ['id', 'durationSeconds', 'thumbnailURL']),
  broadcaster: T.Union([T.Null(), BroadcasterSchema]),
});

export const DataSchema = strictObject(
  { clip: T.Union([T.Null(), ClipSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
