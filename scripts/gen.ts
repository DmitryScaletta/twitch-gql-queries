import path from 'node:path';
import fsp from 'node:fs/promises';
import { type TSchema } from '@sinclair/typebox';
import { compile } from 'json-schema-to-typescript';

const getSchemaPaths = async () => {
  const files = await fsp.readdir('src/queries', { recursive: true });
  const schemaFiles = files
    .filter((filePath) => filePath.endsWith('schema.ts'))
    .sort();
  return schemaFiles.map(
    (filePath) => `../src/queries/${filePath.replace(path.sep, '/')}`,
  );
};

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

const main = async () => {
  const schemaPaths = await getSchemaPaths();
  const schemaImports: Record<string, TSchema>[] = await Promise.all(
    schemaPaths.map((schemaPath) => import(schemaPath)),
  );
  const tsSchemas: TSchema[] = [];
  const queries: [name: string, displayName: string][] = [];

  for (const [i, schemas] of Object.entries(schemaImports)) {
    for (const [schemaName, schema] of Object.entries(schemas)) {
      if (
        !schemaName.endsWith('Schema') ||
        ['VariablesSchema', 'DataSchema', 'ResponseSchema'].includes(schemaName)
      ) {
        continue;
      }
      tsSchemas.push(schema as TSchema);
    }
    if ('VariablesSchema' in schemas) {
      tsSchemas.push(schemas.VariablesSchema);
    }
    if ('DataSchema' in schemas) {
      const name = schemaPaths[i as any].split('/').at(-2)!;
      const displayName = schemas.DataSchema.$id!.replace(/Data$/, '');
      queries.push([name, displayName]);
      tsSchemas.push(schemas.DataSchema);
    }
  }

  const tsDefs = await Promise.all(tsSchemas.map(jsonSchemaToTs));
  const responseTypes: string[] = [];
  const queryResponseMap: string[] = [];
  for (const [name, displayName] of queries) {
    responseTypes.push(
      `export type ${displayName}Response = QueryResponse<'${name}', ${displayName}Data>;`,
    );
    queryResponseMap.push(`  ${name}: ${displayName}Response;`);
  }
  queryResponseMap.push();
  let ts = [
    "import type { QueryResponse } from '../types.ts';\n",
    ...tsDefs,
    ...responseTypes,
    '\nexport type QueryResponseMap = {',
    ...queryResponseMap,
    '};\n',
  ].join('\n');

  // TODO: add better fix
  // when linking the same schema with another schema multiple times
  // `json-schema-to-typescript` adds numbers to the end of the schema name
  for (const schema of tsSchemas) {
    if (!schema.$id) continue;
    ts = ts.replaceAll(new RegExp(`(${schema.$id})\\d+`, 'g'), '$1');
  }

  await fsp.writeFile('./src/queries/types.generated.ts', ts);
};

main();
