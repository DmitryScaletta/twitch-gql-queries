import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'ChannelRoot_AboutPanel';
export const displayName = 'ChannelRootAboutPanel';
export const tags = ['Channels'];
const category = 'ChannelRoot';

export const VariablesSchema = strictObject(
  {
    channelLogin: T.String(),
    skipSchedule: T.Boolean(),
    includeIsDJ: T.Boolean(),
  },
  { $id: `${displayName}Variables` },
);

export const UserSchema = strictObject(
  {
    ...pick(schemas.User, [
      'id',
      'description',
      'displayName',
      'primaryColorHex',
      'profileImageURL',
    ]),
    followers: strictObject(pick(schemas.FollowerConnection, ['totalCount'])),
    roles: strictObject({
      ...pick(schemas.UserRoles, ['isPartner', 'isAffiliate', 'isStaff']),
      isParticipatingDJ: T.Optional(T.Boolean()),
    }),
    channel: strictObject({
      ...pick(schemas.Channel, ['id']),
      socialMedias: T.Union([
        T.Null(),
        T.Array(
          strictObject(
            pick(schemas.SocialMedia, ['id', 'name', 'title', 'url']),
          ),
        ),
      ]),
      schedule: T.Optional(
        T.Union([
          T.Null(),
          strictObject({
            ...pick(schemas.Schedule, ['id']),
            nextSegment: T.Union([
              T.Null(),
              strictObject(
                pick(schemas.ScheduleSegment, ['id', 'startAt', 'hasReminder']),
              ),
            ]),
          }),
        ]),
      ),
    }),
    lastBroadcast: strictObject(
      {
        id: T.Union([T.Null(), T.String({ pattern: '^[0-9]+$' })]),
        game: T.Union([
          T.Null(),
          strictObject(pick(schemas.Game, ['id', 'displayName'])),
        ]),
        __typename: T.Literal('Broadcast'),
      },
      { description: 'If never streamed: `{ id: null, game: null }`' },
    ),
    primaryTeam: T.Union([
      T.Null(),
      strictObject(pick(schemas.Team, ['id', 'name', 'displayName'])),
    ]),
    videos: T.Union([
      T.Null(),
      strictObject({
        edges: T.Array(
          strictObject({
            node: strictObject({
              ...pick(schemas.Video, ['id', 'status']),
              game: T.Union([
                T.Null(),
                strictObject(pick(schemas.Game, ['id', 'displayName'])),
              ]),
            }),
            __typename: T.Literal('VideoEdge'),
          }),
        ),
        __typename: T.Literal('VideoConnection'),
      }),
    ]),
  },
  { $id: `${category}User` },
);

export const DataSchema = strictObject(
  {
    currentUser: T.Union([T.Null()]),
    user: T.Union([T.Null(), LegacyRef(UserSchema)]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
