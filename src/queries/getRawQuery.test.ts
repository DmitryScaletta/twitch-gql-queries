import { describe, test } from 'node:test';
import { Type as T } from '@sinclair/typebox';
import { strictObject, getResponseSchema } from '../schema.ts';
import { createValidate } from '../testHelpers.ts';
import { gqlRequest } from '../gqlRequest.ts';
import { getRawQuery } from './getRawQuery.ts';

describe('getRawQuery', () => {
  test('real request: GetVideo', async () => {
    const query = `
    query GetVideo($videoId: ID!) {
      video(id: $videoId) {
        id
        title
        game {
          id
          name
        }
      }
    }`;
    const DataSchema = strictObject({
      video: strictObject({
        id: T.String(),
        title: T.String(),
        game: T.Union([
          T.Null(),
          strictObject({
            id: T.String(),
            name: T.String(),
          }),
        ]),
      }),
    });
    const responses = await gqlRequest([
      getRawQuery({
        query,
        variables: { videoId: '1816688726' },
      }),
    ]);
    responses.map(createValidate(getResponseSchema(DataSchema)));
  });

  test('real request: videoPlaybackAccessToken', async () => {
    const query = `{
      videoPlaybackAccessToken(
        id: "1816688726"
        params: {
          platform: "web"
          playerBackend: "mediaplayer"
          playerType: "site"
        }
      ) {
        value
        signature
      }
    }`;
    const DataSchema = strictObject({
      videoPlaybackAccessToken: strictObject({
        value: T.String(),
        signature: T.String(),
      }),
    });
    const responses = await gqlRequest([getRawQuery({ query })]);
    responses.map(createValidate(getResponseSchema(DataSchema)));
  });
});
