import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, pick, TRef } from '../../schema.ts';
import * as schemas from '../../schemas.ts';
import { ClipAssetSchema } from '../ShareClipRenderStatus/schema.ts';

export const name = 'VideoAccessToken_Clip';
export const displayName = 'VideoAccessTokenClip';
export const tags = ['Clips'];

export const VariablesSchema = strictObject(
  {
    platform: T.Union([T.Literal('web'), T.String()]),
    slug: T.String(),
  },
  { $id: `${displayName}Variables` },
);

const ClipSchema = strictObject({
  ...pick(schemas.Clip, ['id']),
  playbackAccessToken: strictObject(
    pick(schemas.PlaybackAccessToken, ['signature', 'value']),
  ),
  videoQualities: T.Array(
    strictObject(
      pick(schemas.ClipVideoQuality, ['frameRate', 'quality', 'sourceURL']),
    ),
  ),
  assets: T.Array(TRef(ClipAssetSchema)),
});

export const DataSchema = strictObject(
  { clip: T.Union([T.Null(), ClipSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
