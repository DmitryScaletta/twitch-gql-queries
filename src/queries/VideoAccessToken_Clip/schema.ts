import { Type as T } from '@sinclair/typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'VideoAccessToken_Clip';
export const displayName = 'VideoAccessTokenClip';
export const tags = ['Clips'];

export const VariablesSchema = strictObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

export const DataSchema = strictObject(
  {
    clip: T.Union([
      T.Null(),
      strictObject({
        ...pick(schemas.Clip, ['id']),
        playbackAccessToken: strictObject(
          pick(schemas.PlaybackAccessToken, ['signature', 'value']),
        ),
        videoQualities: T.Array(
          strictObject(
            pick(schemas.ClipVideoQuality, [
              'frameRate',
              'quality',
              'sourceURL',
            ]),
          ),
        ),
      }),
    ]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
