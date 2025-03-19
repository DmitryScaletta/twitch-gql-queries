import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryGetPinnedChat } from './query.ts';
import {
  MessageSchema,
  PinnedChatMessageSchema,
  ResponseSchema,
} from './schema.ts';

import resPinnedMessage from './mocks/response-pinned-message.json' with { type: 'json' };
import resNoPinnedMessage from './mocks/response-no-pinned-message.json' with { type: 'json' };

describe('GetPinnedChat', () => {
  const validate = createValidate(ResponseSchema, [
    PinnedChatMessageSchema,
    MessageSchema,
  ]);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryGetPinnedChat({ channelID: '71092938', count: 1 }),
    ]);
    validate(queryResponse);
  });

  test('real request: not-exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryGetPinnedChat({ channelID: 'channel-not-exists', count: 1 }),
    ]);
    validate(queryResponse);
  });

  test('mock: pinned message', () => validate(resPinnedMessage));
  test('mock: no pinned message', () => validate(resNoPinnedMessage));
});
