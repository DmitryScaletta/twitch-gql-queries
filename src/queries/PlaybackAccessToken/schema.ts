import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'PlaybackAccessToken';
export const displayName = name;
export const tags = ['Videos', 'Streams'];

export const VariablesSchema = strictObject(
  {
    isLive: T.Boolean(),
    login: T.Union([T.Literal(''), T.String()]),
    isVod: T.Boolean(),
    vodID: T.Union([T.Literal(''), T.String()]),
    playerType: T.Union([
      T.Literal(''),
      T.Literal('embed'),
      T.Literal('site'),
      T.Literal('frontpage'),
      T.Literal('channel_home_carousel'),
    ]),
    platform: T.Union([T.Literal('web'), T.String()]),
  },
  { $id: `${displayName}Variables` },
);

export const VideoPlaybackAccessTokenSchema = strictObject(
  pick(schemas.PlaybackAccessToken, ['value', 'signature']),
  { $id: `${displayName}Video` },
);

export const StreamPlaybackAccessTokenSchema = strictObject(
  {
    ...pick(schemas.PlaybackAccessToken, ['value', 'signature']),
    authorization: strictObject(
      pick(schemas.PlaybackAccessTokenAuthorization, [
        'isForbidden',
        'forbiddenReasonCode',
      ]),
    ),
  },
  { $id: `${displayName}Stream` },
);

export const DataSchema = strictObject(
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
