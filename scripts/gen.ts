import fsp from 'node:fs/promises';
import { type TSchema } from '@sinclair/typebox';
import { compile } from 'json-schema-to-typescript';

const schemaPaths = [
  '../src/queries/BrowsePage_AllDirectories/schema.ts',
  '../src/queries/ChannelShell/schema.ts',
  '../src/queries/ClipsActionButtons/schema.ts',
  '../src/queries/ClipsCards.schema.ts',
  '../src/queries/ClipsCards__Game/schema.ts',
  '../src/queries/ClipsCards__User/schema.ts',
  '../src/queries/ClipsDownloadButton/schema.ts',
  '../src/queries/FFZ_BroadcastID/schema.ts',
  '../src/queries/SearchResultsPage_SearchResults/schema.ts',
  '../src/queries/SearchTray_SearchSuggestions/schema.ts',
  '../src/queries/StreamMetadata/schema.ts',
  '../src/queries/UseLive/schema.ts',
  '../src/queries/UseViewCount/schema.ts',
  '../src/queries/VideoAccessToken_Clip/schema.ts',
];

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
  const schemaImports: Record<string, TSchema>[] = await Promise.all(
    schemaPaths.map((path) => import(path)),
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
      const name = schemaPaths[i as any].split('/')[3];
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
