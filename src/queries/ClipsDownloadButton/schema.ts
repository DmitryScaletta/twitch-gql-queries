import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'ClipsDownloadButton';
export const displayName = name;
export const tags = ['Clips'];

export const VariablesSchema = strictObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

export const ClipSchema = strictObject(
  {
    ...pick(schemas.Clip, ['id', 'createdAt', 'durationSeconds', 'viewCount']),
    broadcaster: T.Union([T.Null(), strictObject(pick(schemas.User, ['id']))]),
    curator: T.Union([T.Null(), strictObject(pick(schemas.User, ['id']))]),
    game: T.Union([T.Null(), strictObject(pick(schemas.Game, ['id', 'name']))]),
    playbackAccessToken: strictObject(
      pick(schemas.PlaybackAccessToken, ['signature', 'value']),
    ),
    videoQualities: T.Array(
      strictObject(pick(schemas.ClipVideoQuality, ['sourceURL'])),
    ),
  },
  { $id: `${displayName}Clip` },
);

export const DataSchema = strictObject(
  { clip: T.Union([T.Null(), LegacyRef(ClipSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
