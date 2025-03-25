import path from 'node:path';
import assert from 'node:assert';
import fsp from 'node:fs/promises';
import { Type as T, type TSchema } from '@sinclair/typebox';
import { LegacyRef, strictObject } from '../../src/schema.ts';

type RequestBody = {
  summary: string;
  value: any;
};
type ResponseExample = {
  summary: string;
  value: any;
};
type QueryMetadata = {
  name: string;
  displayName: string;
  description?: string;
  tags: string[];
  requestBodies: RequestBody[];
  responseExamples: ResponseExample[];
  additionalSchemas: TSchema[];
  VariablesSchema: TSchema;
  RequestBodySchema: TSchema;
  DataSchema: TSchema;
  ResponseSchema: TSchema;
};

const REQUIRED_EXPORTS = [
  'name',
  'displayName',
  'tags',
  'VariablesSchema',
  'DataSchema',
  'ResponseSchema',
];

const createRequestBodySchema = (
  queryName: string,
  displayQueryName: string,
  VariablesSchema: TSchema,
  sha256Hash: string,
) =>
  strictObject(
    {
      operationName: T.Literal(queryName),
      variables: LegacyRef(VariablesSchema),
      extensions: strictObject({
        persistedQuery: strictObject({
          version: T.Literal(1),
          sha256Hash: T.Literal(sha256Hash),
        }),
      }),
    },
    { $id: `${displayQueryName}RequestBody` },
  );

export const getQueriesMetadata = async () => {
  let filePaths = await fsp.readdir('src/queries', { recursive: true });
  filePaths = filePaths.map((f) => f.replaceAll(path.sep, '/')).sort();
  const schemaFilePaths = filePaths
    .filter((f) => f.endsWith('/schema.ts'))
    .map((f) => `../../src/queries/${f}`);
  const httpFilePaths = filePaths
    .filter((f) => f.endsWith('/query.http'))
    .map((f) => `./src/queries/${f}`);
  const responsesFilePaths = filePaths
    .filter((f) => f.includes('/mocks/'))
    .map((f) => `./src/queries/${f}`);

  const [schemaImports, httpFiles, responseFiles] = await Promise.all([
    Promise.all(schemaFilePaths.map((f) => import(f))),
    Promise.all(httpFilePaths.map((f) => fsp.readFile(f, 'utf-8'))),
    Promise.all(responsesFilePaths.map((f) => fsp.readFile(f, 'utf-8'))),
  ]);
  assert(schemaImports.length === httpFiles.length);

  const queries: QueryMetadata[] = [];
  for (let i = 0; i < schemaImports.length; i += 1) {
    const schemaImport = schemaImports[i];
    const httpFile = httpFiles[i];

    for (const exportName of REQUIRED_EXPORTS) {
      assert(
        exportName in schemaImport,
        `${exportName} not found in ${schemaFilePaths[i]}`,
      );
    }

    const additionalSchemas: TSchema[] = [];
    for (const [objName, obj] of Object.entries(schemaImport)) {
      if (REQUIRED_EXPORTS.includes(objName) || !objName.endsWith('Schema')) {
        continue;
      }
      additionalSchemas.push(obj as TSchema);
    }

    const requestBodies: RequestBody[] = [];
    const requestBodyArr = httpFile.split(/### ([^\n]+)/).slice(1);
    for (let j = 0; j < requestBodyArr.length; j += 2) {
      const content = requestBodyArr[j + 1].match(/\n(?<requestBody>{.+\n})/s)
        ?.groups?.requestBody;
      assert(content, `No request body found in ${httpFilePaths[i]}`);
      requestBodies.push({
        summary:
          requestBodyArr[j] === schemaImport.name
            ? 'default'
            : requestBodyArr[j],
        value: JSON.parse(content),
      });
    }
    assert(
      requestBodies.length > 0,
      `No request body found in ${httpFilePaths[i]}`,
    );
    const { sha256Hash } = requestBodies[0].value.extensions.persistedQuery;
    assert(sha256Hash);

    const responseExamples: ResponseExample[] = [];
    for (let i = 0; i < responseFiles.length; i += 1) {
      const responseFilePath = responsesFilePaths[i];
      const responseFile = responseFiles[i];
      if (!responseFilePath.includes(schemaImport.name)) continue;
      responseExamples.push({
        summary:
          path
            .parse(responseFilePath)
            .name.replace(/^\d+-?/, '')
            .replaceAll('-', ' ') || 'default',
        value: JSON.parse(responseFile),
      });
    }

    const RequestBodySchema = createRequestBodySchema(
      schemaImport.name,
      schemaImport.displayName,
      schemaImport.VariablesSchema,
      sha256Hash,
    );

    queries.push({
      name: schemaImport.name,
      displayName: schemaImport.displayName,
      description: schemaImport.description,
      tags: schemaImport.tags,
      requestBodies,
      responseExamples,
      additionalSchemas,
      VariablesSchema: schemaImport.VariablesSchema,
      RequestBodySchema,
      DataSchema: schemaImport.DataSchema,
      ResponseSchema: schemaImport.ResponseSchema,
    });
  }

  return queries;
};
