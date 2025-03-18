import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'ChannelRoot_AboutPanel';
const category = 'ChannelRoot';
const displayName = 'ChannelRootAboutPanel';

export const VariablesSchema = buildObject(
  {
    channelLogin: T.String(),
    skipSchedule: T.Boolean(),
    includeIsDJ: T.Boolean(),
  },
  { $id: `${displayName}Variables` },
);

export const UserSchema = buildObject(
  {
    ...pick(schemas.User, [
      'id',
      'description',
      'displayName',
      'primaryColorHex',
      'profileImageURL',
    ]),
    followers: buildObject({
      totalCount: T.Number(),
      __typename: T.Literal('FollowerConnection'),
    }),
    roles: buildObject({
      ...pick(schemas.UserRoles, ['isPartner', 'isAffiliate', 'isStaff']),
      isParticipatingDJ: T.Optional(T.Boolean()),
    }),
    channel: buildObject({
      ...pick(schemas.Channel, ['id']),
      socialMedias: T.Union([
        T.Null(),
        T.Array(
          buildObject(
            pick(schemas.SocialMedia, ['id', 'name', 'title', 'url']),
          ),
        ),
      ]),
      schedule: T.Optional(
        T.Union([
          T.Null(),
          buildObject({
            ...pick(schemas.Schedule, ['id']),
            nextSegment: T.Union([
              T.Null(),
              buildObject(
                pick(schemas.ScheduleSegment, ['id', 'startAt', 'hasReminder']),
              ),
            ]),
          }),
        ]),
      ),
    }),
    // don't use Broadcast object here
    lastBroadcast: buildObject({
      id: T.Union([T.Null(), T.String()]),
      game: T.Union([
        T.Null(),
        buildObject(pick(schemas.Game, ['id', 'displayName'])),
      ]),
      __typename: T.Literal('Broadcast'),
    }),
    primaryTeam: T.Union([
      T.Null(),
      buildObject(pick(schemas.Team, ['id', 'name', 'displayName'])),
    ]),
    videos: buildObject({
      edges: T.Array(
        buildObject({
          node: buildObject({
            ...pick(schemas.Video, ['id', 'status']),
            game: T.Union([
              T.Null(),
              buildObject(pick(schemas.Game, ['id', 'displayName'])),
            ]),
          }),
          __typename: T.Literal('VideoEdge'),
        }),
      ),
      __typename: T.Literal('VideoConnection'),
    }),
  },
  { $id: `${category}User` },
);

export const DataSchema = buildObject(
  {
    currentUser: T.Union([T.Null(), T.Unknown()]),
    user: T.Union([T.Null(), LegacyRef(UserSchema)]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(name, DataSchema, true);
