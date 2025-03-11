import fsp from 'node:fs/promises';
import { type TSchema } from '@sinclair/typebox';
import { compile } from 'json-schema-to-typescript';

const schemasPromises = [
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

const jsonSchemaToTs = (schema: any) =>
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
  const tsPromises: Promise<string>[] = [];
  const schemas = await Promise.all(schemasPromises);

  for (const querySchemas of schemas) {
    for (const [schemaName, schema] of Object.entries(querySchemas)) {
      if (
        !schemaName.endsWith('Schema') ||
        ['VariablesSchema', 'DataSchema', 'ResponseSchema'].includes(schemaName)
      ) {
        continue;
      }
      tsPromises.push(jsonSchemaToTs(schema));
    }
    if ('VariablesSchema' in querySchemas) {
      tsPromises.push(jsonSchemaToTs(querySchemas.VariablesSchema));
    }
    if ('DataSchema' in querySchemas) {
      tsPromises.push(jsonSchemaToTs(querySchemas.DataSchema));
    }
  }

  const ts = await Promise.all(tsPromises);
  const tsContent = ts
    .join('\n')
    // TODO: fix using multiple refs in the same schema
    .replaceAll('SearchResultsPageChannel1', 'SearchResultsPageChannel');

  await fsp.writeFile('./src/queries/types.generated.ts', tsContent);
};

main();
