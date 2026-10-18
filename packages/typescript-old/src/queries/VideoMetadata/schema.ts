import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'VideoMetadata';
export const displayName = name;
export const tags = ['Videos'];

export const VariablesSchema = strictObject(
  {
    channelLogin: T.Union([T.Literal(''), T.String()]),
    videoID: T.String(),
  },
  { $id: `${displayName}Variables` },
);

export const UserSchema = strictObject(
  {
    ...pick(schemas.User, ['id', 'primaryColorHex', 'profileImageURL']),
    isPartner: T.Boolean(),
    lastBroadcast: T.Union(
      [
        T.Null(),
        strictObject({
          id: T.Union([T.Null(), T.String({ pattern: '^[0-9]+$' })]),
          startedAt: T.Union([T.Null(), T.String({ format: 'date-time' })]),
          __typename: T.Literal('Broadcast'),
        }),
      ],
      { description: 'If never streamed: `{ id: null, startedAt: null }`' },
    ),
    stream: T.Union([
      T.Null(),
      strictObject(pick(schemas.Stream, ['id', 'viewersCount'])),
    ]),
    followers: strictObject(pick(schemas.FollowerConnection, ['totalCount'])),
  },
  { $id: `${displayName}User` },
);

export const VideoSchema = strictObject(
  {
    ...pick(schemas.Video, [
      'id',
      'title',
      'description',
      'previewThumbnailURL',
      'createdAt',
      'viewCount',
      'publishedAt',
      'lengthSeconds',
      'broadcastType',
    ]),
    owner: strictObject(pick(schemas.User, ['id', 'login', 'displayName'])),
    game: T.Union([
      T.Null(),
      strictObject(
        pick(schemas.Game, ['id', 'slug', 'boxArtURL', 'name', 'displayName']),
      ),
    ]),
  },
  { $id: `${displayName}Video` },
);

export const DataSchema = strictObject(
  {
    user: T.Union([T.Null(), UserSchema]),
    currentUser: T.Null(),
    video: T.Union([T.Null(), VideoSchema]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
