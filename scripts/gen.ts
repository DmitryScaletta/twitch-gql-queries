import fsp from 'node:fs/promises';
import { type TSchema } from 'typebox';
import { compile } from 'json-schema-to-typescript';
import { getQueriesMetadata } from './utils/getQueriesMetadata.ts';

const replaceRefsWithIds = (schema: TSchema) => {
  for (const value of Object.values(schema)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$ref) {
        value.$id = value.$ref;
        delete value.$ref;
      } else {
        replaceRefsWithIds(value);
      }
    }
  }
  return schema;
};

const jsonSchemaToTs = (schema: TSchema) =>
  compile(
    replaceRefsWithIds(structuredClone(schema)),
    '__PLEASE_ADD_AN_ID_TO_THIS_SCHEMA__',
    {
      declareExternallyReferenced: false,
      additionalProperties: false,
      bannerComment: '',
      customName: (schema) => schema.$id,
      style: {
        singleQuote: true,
        trailingComma: 'all',
      },
    },
  );

export const gen = async () => {
  const queriesMetadata = await getQueriesMetadata();
  const tsSchemas: TSchema[] = [];
  const responseTypes: string[] = [];
  const queryResponseMap: string[] = [];

  for (const {
    name,
    displayName,
    additionalSchemas,
    VariablesSchema,
    DataSchema,
  } of queriesMetadata) {
    tsSchemas.push(
      ...additionalSchemas.filter((s) => (s as any).$id),
      VariablesSchema,
      DataSchema,
    );
    responseTypes.push(
      `export type ${displayName}Response = QueryResponse<${displayName}Data, '${name}'>;`,
    );
    queryResponseMap.push(`  ${name}: ${displayName}Response;`);
  }

  const tsDefs = await Promise.all(tsSchemas.map(jsonSchemaToTs));
  let ts = [
    "import type { QueryResponse } from '../types.ts';\n",
    ...tsDefs,
    ...responseTypes,
    '\nexport interface QueryResponseMap {',
    ...queryResponseMap,
    '};\n',
  ].join('\n');

  for (const schema of tsSchemas) {
    // ts hack for string autocomplete
    ts = ts.replaceAll("' | string;", "' | string & {};");

    // TODO: add better fix
    // when linking the same schema with another schema multiple times
    // `json-schema-to-typescript` adds numbers to the end of the schema name
    if ((schema as any).$id) {
      ts = ts.replaceAll(new RegExp(`(${(schema as any).$id})\\d+`, 'g'), '$1');
    }
  }

  await fsp.writeFile('./src/queries/types.generated.ts', ts);
};

gen();
