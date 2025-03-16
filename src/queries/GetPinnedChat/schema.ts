import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = 'GetPinnedChat';
const displayName = name;

export const VariablesSchema = T.Object(
  {
    channelID: T.String(),
    count: T.Number(),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const MessageSchema = T.Object(
  {
    id: T.String(),
    content: T.Object(
      {
        text: T.String(),
        fragments: T.Array(
          T.Object(
            {
              content: T.Union([T.Null(), T.Unknown()]),
              text: T.String(),
              __typename: T.Literal('MessageFragment'),
            },
            { additionalProperties: false },
          ),
        ),
        __typename: T.Literal('MessageContent'),
      },
      { additionalProperties: false },
    ),
    parentMessage: T.Union([T.Null(), T.Unknown()]),
    threadParentMessage: T.Union([T.Null(), T.Unknown()]),
    sentAt: T.String({
      /* format: 'date-time' */
    }),
    sender: T.Object(
      {
        id: T.String(),
        chatColor: T.Union([T.Null(), T.String()]),
        displayName: T.String(),
        displayBadges: T.Array(
          T.Object(
            {
              id: T.String(),
              setID: T.String(),
              version: T.String(),
              __typename: T.Literal('Badge'),
            },
            { additionalProperties: false },
          ),
        ),
        __typename: T.Literal('User'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('Message'),
  },
  {
    $id: `${displayName}Message`,
    additionalProperties: false,
  },
);

export const PinnedChatMessageSchema = T.Object(
  {
    id: T.String(),
    type: T.Union([T.Literal('MOD'), T.String()]),
    pinnedMessage: LegacyRef(MessageSchema),
    startsAt: T.String({
      /* format: 'date-time' */
    }),
    updatedAt: T.String({
      /* format: 'date-time' */
    }),
    endsAt: T.Union([
      T.Null(),
      T.String({
        /* format: 'date-time' */
      }),
    ]),
    pinnedBy: T.Object(
      {
        id: T.String(),
        displayName: T.String(),
        __typename: T.Literal('User'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('PinnedChatMessage'),
  },
  {
    $id: `${displayName}PinnedChatMessage`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {
    channel: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          pinnedChatMessages: T.Union([
            T.Null(),
            T.Object(
              {
                edges: T.Array(
                  T.Object(
                    {
                      node: LegacyRef(PinnedChatMessageSchema),
                      cursor: T.Union([T.Null(), T.String()]),
                      __typename: T.Literal('PinnedChatMessageEdge'),
                    },
                    { additionalProperties: false },
                  ),
                ),
                pageInfo: T.Object(
                  {
                    hasNextPage: T.Boolean(),
                    __typename: T.Literal('PageInfo'),
                  },
                  { additionalProperties: false },
                ),
                __typename: T.Literal('PinnedChatMessageConnection'),
              },
              { additionalProperties: false },
            ),
          ]),
          __typename: T.Literal('Channel'),
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
