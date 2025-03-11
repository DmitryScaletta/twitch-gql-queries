import { Type as T } from '@sinclair/typebox';
import { getResponseSchema } from '../../schema.ts';

const name = 'VideoAccessToken_Clip';
const displayName = 'VideoAccessTokenClip';

export const VariablesSchema = T.Object(
  { slug: T.String() },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    clip: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          playbackAccessToken: T.Object(
            {
              signature: T.String(),
              value: T.String(),
              __typename: T.Literal('PlaybackAccessToken'),
            },
            { additionalProperties: false },
          ),
          videoQualities: T.Array(
            T.Object(
              {
                frameRate: T.Number(),
                quality: T.String(),
                sourceURL: T.String({
                  /* format: 'uri' */
                }),
                __typename: T.Literal('ClipVideoQuality'),
              },
              { additionalProperties: false },
            ),
          ),
          __typename: T.Literal('Clip'),
        },
        { additionalProperties: false },
      ),
    ]),
  },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
