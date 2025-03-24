import { Type as T } from '@sinclair/typebox';
import {
  strictObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'GetPinnedChat';
export const displayName = name;
export const tags = ['Chat'];

export const VariablesSchema = strictObject(
  {
    channelID: T.String(),
    count: T.Integer({ minimum: 1 }),
  },
  { $id: `${displayName}Variables` },
);

const ParentMessageSchema = strictObject({
  ...pick(schemas.Message, ['id', 'sentAt']),
  content: strictObject(pick(schemas.MessageContent, ['text'])),
  sender: strictObject(pick(schemas.User, ['id', 'displayName'])),
});

const ThreadParentMessageSchema = strictObject({
  ...pick(schemas.Message, ['id']),
  content: strictObject(pick(schemas.MessageContent, ['text'])),
  sender: strictObject(pick(schemas.User, ['id', 'displayName'])),
});

export const MessageSchema = strictObject(
  {
    ...pick(schemas.Message, ['id', 'sentAt']),
    content: strictObject({
      ...pick(schemas.MessageContent, ['text']),
      fragments: T.Array(
        strictObject(pick(schemas.MessageFragment, ['content', 'text'])),
      ),
    }),
    parentMessage: T.Union([T.Null(), ParentMessageSchema]),
    threadParentMessage: T.Union([T.Null(), ThreadParentMessageSchema]),
    sender: strictObject({
      ...pick(schemas.User, ['id', 'chatColor', 'displayName']),
      displayBadges: T.Array(
        strictObject(pick(schemas.Badge, ['id', 'setID', 'version'])),
      ),
    }),
  },
  { $id: `${displayName}Message` },
);

export const PinnedChatMessageSchema = strictObject(
  {
    ...pick(schemas.PinnedChatMessage, [
      'id',
      'type',
      'startsAt',
      'updatedAt',
      'endsAt',
    ]),
    pinnedMessage: LegacyRef(MessageSchema),
    pinnedBy: strictObject(pick(schemas.User, ['id', 'displayName'])),
  },
  { $id: `${displayName}PinnedChatMessage` },
);

const PinnedChatMessagesSchema = strictObject({
  edges: T.Array(
    strictObject({
      node: LegacyRef(PinnedChatMessageSchema),
      cursor: T.Union([T.Null(), T.String()]),
      __typename: T.Literal('PinnedChatMessageEdge'),
    }),
  ),
  pageInfo: strictObject(pick(schemas.PageInfo, ['hasNextPage'])),
  __typename: T.Literal('PinnedChatMessageConnection'),
});

const ChannelSchema = strictObject({
  ...pick(schemas.Channel, ['id']),
  pinnedChatMessages: T.Union([T.Null(), PinnedChatMessagesSchema]),
});

export const DataSchema = strictObject(
  { channel: T.Union([T.Null(), ChannelSchema]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
