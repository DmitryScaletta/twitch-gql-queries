import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQueryChatListBadges } from './query.ts';
import { ResponseSchema, UserSchema } from './schema.ts';

describe('ChatList_Badges', () => {
  const validate = createValidate(ResponseSchema, [UserSchema]);

  test('real request', async () => {
    const responses = await gqlRequest([
      getQueryChatListBadges({ channelLogin: 'xqc' }),
    ]);
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const responses = await gqlRequest([
      getQueryChatListBadges({ channelLogin: 'user-not-exists' }),
    ]);
    responses.map(validate);
  });
});
