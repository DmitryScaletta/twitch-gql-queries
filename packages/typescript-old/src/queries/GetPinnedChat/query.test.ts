import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryGetPinnedChat } from './query.ts';
import {
  MessageSchema,
  PinnedChatMessageSchema,
  ResponseSchema,
} from './schema.ts';

import resPinnedMessage from './mocks/1-pinned-message.json' with { type: 'json' };
import resNoPinnedMessage from './mocks/2-no-pinned-message.json' with { type: 'json' };
import resWithParentMessage from './mocks/4-with-parent-message.json' with { type: 'json' };

describe('GetPinnedChat', () => {
  const validate = createValidate(ResponseSchema, [
    PinnedChatMessageSchema,
    MessageSchema,
  ]);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ id }) =>
        getQueryGetPinnedChat({ channelID: id, count: 1 }),
      ),
    );
    responses.map(validate);
  });

  test('real request: not-exists', async () => {
    const responses = await gqlRequest([
      getQueryGetPinnedChat({ channelID: 'channel-not-exists', count: 1 }),
    ]);
    responses.map(validate);
  });

  test('mock: pinned message', () => validate(resPinnedMessage));
  test('mock: no pinned message', () => validate(resNoPinnedMessage));
  test('mock: with parent message', () => validate(resWithParentMessage));
});
