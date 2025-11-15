import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';
import {
  BroadcastTypeSchema,
  VideoSortSchema,
} from '../FilterableVideoTower_Videos/schema.ts';

export const name = 'FFZ_RecentBroadcasts';
export const displayName = 'FfzRecentBroadcasts';
export const tags = ['Streams'];

export const VariablesSchema = strictObject(
  {
    id: T.String(),
    type: T.Optional(BroadcastTypeSchema),
    sort: VideoSortSchema,
    limit: T.Integer({ minimum: 1 }),
  },
  { $id: `${displayName}Variables` },
);

export const VideoSchema = strictObject(
  pick(schemas.Video, ['id', 'title', 'createdAt', 'publishedAt']),
  { $id: `${displayName}Video` },
);

export const UserSchema = strictObject(
  {
    ...pick(schemas.User, ['id']),
    videos: strictObject({
      edges: T.Array(
        strictObject({
          ...pick(schemas.VideoEdge, ['cursor']),
          node: LegacyRef(VideoSchema),
        }),
      ),
      pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
      __typename: T.Literal('VideoConnection'),
    }),
  },
  { $id: `${displayName}User` },
);

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), LegacyRef(UserSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
