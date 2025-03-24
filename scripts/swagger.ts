import fsp from 'node:fs/promises';
import type { TSchema } from '@sinclair/typebox';
import { getQueriesMetadata } from './utils/getQueriesMetadata.ts';

const template: any = {
  openapi: '3.0.0',
  info: {
    title: 'Twitch GraphQL API Queries',
    description:
      '[github.com/DmitryScaletta/twitch-gql-queries](https://github.com/DmitryScaletta/twitch-gql-queries)',
    version: 'GraphQL',
  },
  servers: [{ url: 'https://gql.twitch.tv/gql', description: 'GraphQL' }],
  security: [],
  tags: [],
  paths: {},
  components: {
    schemas: {},
  },
};

const normalizeRefs = (schema: TSchema) => {
  for (const value of Object.values(schema)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$ref) {
        if (!value.$ref.startsWith('#')) {
          value.$ref = `#/components/schemas/${value.$ref}`;
        }
      } else {
        normalizeRefs(value);
      }
    }
  }
  return schema;
};

const buildOpenApi = async () => {
  const queriesMetadata = await getQueriesMetadata();

  const openApi = template;

  for (const {
    name,
    displayName,
    description,
    tags,
    requestBodies,
    responseExamples,
    additionalSchemas,
    VariablesSchema,
    RequestBodySchema,
    DataSchema,
    ResponseSchema,
  } of queriesMetadata) {
    const endpointPath = `#${name}`;
    let reqBodyExample = undefined;
    let reqBodyExamples = undefined;

    if (requestBodies.length > 1) {
      reqBodyExamples = {} as any;
      for (const { summary, value } of requestBodies) {
        reqBodyExamples[summary] = { value };
      }
    } else {
      reqBodyExample = requestBodies[0].value;
    }

    let resExample = undefined;
    let resExamples = undefined;

    if (responseExamples.length > 1) {
      resExamples = {} as any;
      for (const { summary, value } of responseExamples) {
        resExamples[summary] = { value };
      }
    } else {
      resExample = responseExamples[0].value;
    }

    openApi.paths[endpointPath] = {
      post: {
        summary: '',
        tags,
        description,
        parameters: [
          {
            in: 'header',
            name: 'Client-ID',
            required: true,
            schema: {
              type: 'string',
              default: 'kimne78kx3ncx6brgo4mv6wki5h1ko',
            },
          },
        ],
        requestBody: {
          description: '',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: `#/components/schemas/${displayName}RequestBody`,
              },
              example: reqBodyExample,
              examples: reqBodyExamples,
            },
          },
        },
        responses: {
          '200': {
            description: '',
            content: {
              'application/json': {
                schema: {
                  $ref: `#/components/schemas/${displayName}Response`,
                },
                example: resExample,
                examples: resExamples,
              },
            },
          },
        },
      },
    };

    ResponseSchema.$id = `${displayName}Response`;

    for (const schema of [
      ...additionalSchemas,
      VariablesSchema,
      RequestBodySchema,
      DataSchema,
      ResponseSchema,
    ]) {
      if (!schema.$id) continue;
      openApi.components.schemas[schema.$id.replace(/Schema$/, '')] =
        normalizeRefs(schema);
    }
  }

  await Promise.all([
    fsp.writeFile('openapi.json', JSON.stringify(openApi, null, 2)),
    fsp.writeFile('docs/openapi.json', JSON.stringify(openApi)),
  ]);
};

buildOpenApi();
