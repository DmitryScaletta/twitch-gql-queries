import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'ChannelRoot_AboutPanel';
const category = 'ChannelRoot';
const displayName = 'ChannelRootAboutPanel';

export const VariablesSchema = T.Object(
  {
    channelLogin: T.String(),
    skipSchedule: T.Boolean(),
    includeIsDJ: T.Boolean(),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const UserSchema = T.Object(
  {
    id: T.String(),
    description: T.Union([T.Null(), T.String()]),
    displayName: T.String(),
    primaryColorHex: T.Union([T.Null(), T.String()]),
    profileImageURL: T.String(),
    followers: T.Object(
      {
        totalCount: T.Number(),
        __typename: T.Literal('FollowerConnection'),
      },
      { additionalProperties: false },
    ),
    roles: T.Object(
      {
        isPartner: T.Boolean(),
        isAffiliate: T.Boolean(),
        isStaff: T.Union([T.Null(), T.Boolean()]),
        isParticipatingDJ: T.Optional(T.Boolean()),
        __typename: T.Literal('UserRoles'),
      },
      { additionalProperties: false },
    ),
    channel: T.Object(
      {
        id: T.String(),
        socialMedias: T.Array(
          T.Object(
            {
              id: T.String(),
              name: T.String(),
              title: T.String(),
              url: T.String({
                /* format: 'uri' */
              }),
              __typename: T.Literal('SocialMedia'),
            },
            { additionalProperties: false },
          ),
        ),
        schedule: T.Optional(
          T.Union([
            T.Null(),
            T.Object({
              id: T.String(),
              nextSegment: T.Union([
                T.Null(),
                T.Object(
                  {
                    id: T.String(),
                    startAt: T.String(),
                    hasReminder: T.Boolean(),
                    __typename: T.Literal('ScheduleSegment'),
                  },
                  { additionalProperties: false },
                ),
              ]),
              __typename: T.Literal('Schedule'),
            }),
          ]),
        ),
        __typename: T.Literal('Channel'),
      },
      { additionalProperties: false },
    ),
    lastBroadcast: T.Object(
      {
        id: T.Union([T.Null(), T.String()]),
        game: T.Union([
          T.Null(),
          T.Object(
            {
              id: T.String(),
              displayName: T.String(),
              __typename: T.Literal('Game'),
            },
            { additionalProperties: false },
          ),
        ]),
        __typename: T.Literal('Broadcast'),
      },
      { additionalProperties: false },
    ),
    primaryTeam: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          name: T.String(),
          displayName: T.String(),
          __typename: T.Literal('Team'),
        },
        { additionalProperties: false },
      ),
    ]),
    videos: T.Object(
      {
        edges: T.Array(
          T.Object(
            {
              node: T.Object(
                {
                  id: T.String(),
                  game: T.Union([
                    T.Null(),
                    T.Object(
                      {
                        id: T.String(),
                        displayName: T.String(),
                        __typename: T.Literal('Game'),
                      },
                      { additionalProperties: false },
                    ),
                  ]),
                  // TODO: find all possible statuses
                  status: T.Union([T.Literal('RECORDED'), T.String()]),
                  __typename: T.Literal('Video'),
                },
                { additionalProperties: false },
              ),
              __typename: T.Literal('VideoEdge'),
            },
            { additionalProperties: false },
          ),
        ),
        __typename: T.Literal('VideoConnection'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('User'),
  },
  {
    $id: `${category}User`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    currentUser: T.Union([T.Null(), T.Unknown()]),
    user: T.Union([T.Null(), LegacyRef(UserSchema)]),
  },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
