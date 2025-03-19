import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate, getChannels } from '../../testHelpers.ts';
import { getQueryGetUserId } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('GetUserID', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const channels = await getChannels();
    const responses = await gqlRequest(
      channels.map(({ login }) =>
        getQueryGetUserId({ login, lookupType: 'ACTIVE' }),
      ),
    );
    responses.map(validate);
  });

  test('real request: loockupType ACTIVE', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryGetUserId({ login: 'xqc', lookupType: 'ACTIVE' }),
    ]);
    validate(queryResponse);
  });

  test('real request: loockupType ALL', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryGetUserId({ login: 'xqc', lookupType: 'ALL' }),
    ]);
    validate(queryResponse);
  });

  test('real request: not exists', async () => {
    const [queryResponse] = await gqlRequest([
      getQueryGetUserId({ login: 'user-not-exists', lookupType: 'ACTIVE' }),
    ]);
    validate(queryResponse);
  });
});
