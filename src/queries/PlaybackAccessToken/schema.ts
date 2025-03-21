import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'PlaybackAccessToken';
const displayName = name;

export const VariablesSchema = buildObject(
  {
    isLive: T.Boolean(),
    login: T.Union([T.Literal(''), T.String()]),
    isVod: T.Boolean(),
    vodID: T.Union([T.Literal(''), T.String()]),
    playerType: T.Union([
      T.Literal(''),
      T.Literal('site'),
      T.Literal('channel_home_carousel'),
    ]),
    platform: T.Union([T.Literal('web'), T.String()]),
  },
  { $id: `${displayName}Variables` },
);

export const VideoPlaybackAccessTokenSchema = buildObject(
  pick(schemas.PlaybackAccessToken, ['value', 'signature']),
  { $id: `${displayName}Video` },
);

export const StreamPlaybackAccessTokenSchema = buildObject(
  {
    ...pick(schemas.PlaybackAccessToken, ['value', 'signature']),
    authorization: buildObject(
      pick(schemas.PlaybackAccessTokenAuthorization, [
        'isForbidden',
        'forbiddenReasonCode',
      ]),
    ),
  },
  { $id: `${displayName}Stream` },
);

export const DataSchema = buildObject(
  {
    streamPlaybackAccessToken: T.Optional(
      T.Union([T.Null(), LegacyRef(StreamPlaybackAccessTokenSchema)]),
    ),
    videoPlaybackAccessToken: T.Optional(
      T.Union([T.Null(), LegacyRef(VideoPlaybackAccessTokenSchema)]),
    ),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
