# Template

## query.ts

```ts
import type { %QUERY_DISPLAY_NAME%Variables } from '../types.generated.ts';

export const getQuery%QUERY_DISPLAY_NAME% = (
  variables: %QUERY_DISPLAY_NAME%Variables,
) => ({
  operationName: '%QUERY_NAME%' as const,
  variables,
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        '',
    },
  },
});
```

## query.test.ts

```ts
import { describe, test } from 'node:test';
import { gqlRequest } from '../../gqlRequest.ts';
import { createValidate } from '../../testHelpers.ts';
import { getQuery%QUERY_DISPLAY_NAME% } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('%QUERY_NAME%', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const responses = await gqlRequest([
      getQuery%QUERY_DISPLAY_NAME%({}),
    ]);
    responses.map(validate)
  });
});
```

## schema.ts

```ts
import { Type as T } from '@sinclair/typebox';
import { strictObject, getResponseSchema, pick } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = '%QUERY_NAME%';
export const displayName = name;
export const tags = [];

export const VariablesSchema = strictObject(
  {},
  { $id: `${displayName}Variables` },
);

export const DataSchema = strictObject(
  {},
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
```

## query.http

```http
### %QUERY_NAME%

POST https://gql.twitch.tv/gql
Content-Type: application/json
Client-Id: {{$dotenv CLIENT_ID}}

{
  "operationName": "%QUERY_NAME%",
  "variables": {
  },
  "extensions": {
    "persistedQuery": {
      "version": 1,
      "sha256Hash": ""
    }
  }
}
```
