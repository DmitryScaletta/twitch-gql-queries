import { Type as T } from '@sinclair/typebox';
import { buildObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'VideoAccessToken_Clip';
export const displayName = 'VideoAccessTokenClip';
export const tags = ['Clips'];

export const VariablesSchema = buildObject(
  { slug: T.String() },
  { $id: `${displayName}Variables` },
);

export const DataSchema = buildObject(
  {
    clip: T.Union([
      T.Null(),
      buildObject({
        ...pick(schemas.Clip, ['id']),
        playbackAccessToken: buildObject(
          pick(schemas.PlaybackAccessToken, ['signature', 'value']),
        ),
        videoQualities: T.Array(
          buildObject(
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
