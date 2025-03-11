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
import { gqlRequest } from '../../main.ts';
import { createValidate } from '../testHelpers.ts';
import { getQuery%QUERY_DISPLAY_NAME% } from './query.ts';
import { ResponseSchema } from './schema.ts';

describe('%QUERY_NAME%', () => {
  const validate = createValidate(ResponseSchema);

  test('real request', async () => {
    const [queryResponse] = await gqlRequest([
      getQuery%QUERY_DISPLAY_NAME%({}),
    ]);
    validate(queryResponse);
  });
});
```

## schema.ts

```ts
import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';

const name = '%QUERY_NAME%';
const displayName = name;

export const VariablesSchema = T.Object(
  {},
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

export const DataSchema = T.Object(
  {},
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema);
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
