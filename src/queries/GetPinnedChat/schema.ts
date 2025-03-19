import { Type as T } from '@sinclair/typebox';
import {
  buildObject,
  getResponseSchema,
  LegacyRef,
  pick,
} from '../../schema.ts';
import * as schemas from '../../schemas.ts';

const name = 'GetPinnedChat';
const displayName = name;

export const VariablesSchema = buildObject(
  {
    channelID: T.String(),
    count: T.Number(),
  },
  { $id: `${displayName}Variables` },
);

export const MessageSchema = buildObject(
  {
    ...pick(schemas.Message, ['id', 'sentAt']),
    content: buildObject({
      ...pick(schemas.MessageContent, ['text']),
      fragments: T.Array(
        buildObject(pick(schemas.MessageFragment, ['content', 'text'])),
      ),
    }),
    parentMessage: T.Union([T.Null(), T.Unknown()]),
    threadParentMessage: T.Union([T.Null(), T.Unknown()]),
    sender: buildObject({
      ...pick(schemas.User, ['id', 'chatColor', 'displayName']),
      displayBadges: T.Array(
        buildObject(pick(schemas.Badge, ['id', 'setID', 'version'])),
      ),
    }),
  },
  { $id: `${displayName}Message` },
);

export const PinnedChatMessageSchema = buildObject(
  {
    ...pick(schemas.PinnedChatMessage, [
      'id',
      'type',
      'startsAt',
      'updatedAt',
      'endsAt',
    ]),
    pinnedMessage: LegacyRef(MessageSchema),
    pinnedBy: buildObject(pick(schemas.User, ['id', 'displayName'])),
  },
  { $id: `${displayName}PinnedChatMessage` },
);

export const DataSchema = buildObject(
  {
    channel: T.Union([
      T.Null(),
      buildObject({
        ...pick(schemas.Channel, ['id']),
        pinnedChatMessages: T.Union([
          T.Null(),
          buildObject({
            edges: T.Array(
              buildObject({
                node: LegacyRef(PinnedChatMessageSchema),
                cursor: T.Union([T.Null(), T.String()]),
                __typename: T.Literal('PinnedChatMessageEdge'),
              }),
            ),
            pageInfo: buildObject(pick(schemas.PageInfo, ['hasNextPage'])),
            __typename: T.Literal('PinnedChatMessageConnection'),
          }),
        ]),
      }),
    ]),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
