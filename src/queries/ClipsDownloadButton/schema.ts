import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'ClipsDownloadButton';
const displayName = name;

export const VariablesSchema = buildObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

export const ClipSchema = buildObject(
  {
    ...pick(schemas.Clip, ['id', 'createdAt', 'durationSeconds', 'viewCount']),
    broadcaster: T.Union([T.Null(), buildObject(pick(schemas.User, ['id']))]),
    curator: T.Union([T.Null(), buildObject(pick(schemas.User, ['id']))]),
    game: T.Union([T.Null(), buildObject(pick(schemas.Game, ['id', 'name']))]),
    playbackAccessToken: buildObject(
      pick(schemas.PlaybackAccessToken, ['signature', 'value']),
    ),
    videoQualities: T.Array(
      buildObject(pick(schemas.ClipVideoQuality, ['sourceURL'])),
    ),
  },
  { $id: `${displayName}Clip` },
);

export const DataSchema = buildObject(
  { clip: T.Union([T.Null(), LegacyRef(ClipSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
