import { Type as T } from '@sinclair/typebox';
import { buildObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'WatchLivePrompt';
const displayName = name;

export const VariablesSchema = buildObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

const StreamSchema = buildObject({
  ...pick(schemas.Stream, ['id']),
  game: T.Union([
    T.Null(),
    buildObject(pick(schemas.Game, ['id', 'displayName'])),
  ]),
});

const BroadcasterSchema = buildObject({
  ...pick(schemas.User, ['id', 'login', 'displayName']),
  stream: T.Union([T.Null(), StreamSchema]),
});

const ClipSchema = buildObject({
  ...pick(schemas.Clip, ['id', 'durationSeconds', 'thumbnailURL']),
  broadcaster: T.Union([T.Null(), BroadcasterSchema]),
});

export const DataSchema = buildObject(
  { clip: T.Union([T.Null(), ClipSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
