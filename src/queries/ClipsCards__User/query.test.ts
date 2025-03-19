import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryClipsCardsUser } from './query.ts';
import { ClipSchema, ResponseSchema } from './schema.ts';

describe('ClipsCards__User', () => {
  const validate = createValidate(ResponseSchema, [ClipSchema]);

  test('real request: all variables', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryClipsCardsUser({
          login,
          limit: 20,
          criteria: {
            filter: 'LAST_WEEK',
            shouldFilterByDiscoverySetting: false,
          },
          cursor: null,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: only required variables', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryClipsCardsUser({
          login,
          limit: 20,
        }),
      ),
    );
    responses.map(validate);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsUser({
        login: 'user-not-exists',
        limit: 20,
      }),
    ]);
    validate(queryResponse);
  });

  test('real request: integrity error', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryClipsCardsUser({
        login: 'xqc',
        limit: 20,
        cursor: 'MjA=',
      }),
    ]);
    validate(queryResponse);
  });
});
