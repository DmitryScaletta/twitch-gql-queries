import fsp from 'node:fs/promises';
import { type TSchema } from '@sinclair/typebox';
import { compile } from 'json-schema-to-typescript';

const schemaImportsPromises = [
  import('../src/queries/BrowsePage_AllDirectories/schema.ts'),
  import('../src/queries/ChannelShell/schema.ts'),
  import('../src/queries/ClipsActionButtons/schema.ts'),
  import('../src/queries/ClipsCards.schema.ts'),
  import('../src/queries/ClipsCards__Game/schema.ts'),
  import('../src/queries/ClipsCards__User/schema.ts'),
  import('../src/queries/ClipsDownloadButton/schema.ts'),
  import('../src/queries/FFZ_BroadcastID/schema.ts'),
  import('../src/queries/SearchResultsPage_SearchResults/schema.ts'),
  import('../src/queries/SearchTray_SearchSuggestions/schema.ts'),
  import('../src/queries/StreamMetadata/schema.ts'),
  import('../src/queries/UseLive/schema.ts'),
  import('../src/queries/UseViewCount/schema.ts'),
  import('../src/queries/VideoAccessToken_Clip/schema.ts'),
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
  const schemaImports = await Promise.all(schemaImportsPromises);
  const tsSchemas: TSchema[] = [];

  for (const schemas of schemaImports) {
    for (const [schemaName, schema] of Object.entries(schemas)) {
      if (
        !schemaName.endsWith('Schema') ||
        ['VariablesSchema', 'DataSchema', 'ResponseSchema'].includes(schemaName)
      ) {
        continue;
      }
      tsSchemas.push(schema);
    }
    if ('VariablesSchema' in schemas) {
      tsSchemas.push(schemas.VariablesSchema);
    }
    if ('DataSchema' in schemas) {
      tsSchemas.push(schemas.DataSchema);
    }
  }

  const tsDefs = await Promise.all(tsSchemas.map(jsonSchemaToTs));
  let ts = tsDefs.join('\n');

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
