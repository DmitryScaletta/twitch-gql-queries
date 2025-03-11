import fsp from 'node:fs/promises';
import { type TSchema } from '@sinclair/typebox';
import { compile } from 'json-schema-to-typescript';
import * as BrowsePageAllDirectories from '../src/queries/BrowsePage_AllDirectories/schema.ts';
import * as ChannelShell from '../src/queries/ChannelShell/schema.ts';
import * as ClipsActionButtons from '../src/queries/ClipsActionButtons/schema.ts';
import * as ClipsCards from '../src/queries/ClipsCards.schema.ts';
import * as ClipsCardsGame from '../src/queries/ClipsCards__Game/schema.ts';
import * as ClipsCardsUser from '../src/queries/ClipsCards__User/schema.ts';
import * as ClipsDownloadButton from '../src/queries/ClipsDownloadButton/schema.ts';
import * as FfzBroadcastId from '../src/queries/FFZ_BroadcastID/schema.ts';
import * as SearchResultsPageSearchResults from '../src/queries/SearchResultsPage_SearchResults/schema.ts';
import * as SearchTraySearchSuggestions from '../src/queries/SearchTray_SearchSuggestions/schema.ts';
import * as StreamMetadata from '../src/queries/StreamMetadata/schema.ts';
import * as UseLive from '../src/queries/UseLive/schema.ts';
import * as UseViewCount from '../src/queries/UseViewCount/schema.ts';
import * as VideoAccessTokenClip from '../src/queries/VideoAccessToken_Clip/schema.ts';

const schemas = [
  BrowsePageAllDirectories.SortSchema,
  BrowsePageAllDirectories.GameSchema,
  BrowsePageAllDirectories.VariablesSchema,
  BrowsePageAllDirectories.DataSchema,
  ChannelShell.UserSchema,
  ChannelShell.UserDoesNotExistSchema,
  ChannelShell.VariablesSchema,
  ChannelShell.DataSchema,
  ClipsActionButtons.ClipSchema,
  ClipsActionButtons.VariablesSchema,
  ClipsActionButtons.DataSchema,
  ClipsCards.ClipsCardsFilter,
  ClipsCards.ClipsCardsClip,
  ClipsCardsGame.VariablesSchema,
  ClipsCardsGame.DataSchema,
  ClipsCardsUser.VariablesSchema,
  ClipsCardsUser.DataSchema,
  ClipsDownloadButton.ClipSchema,
  ClipsDownloadButton.VariablesSchema,
  ClipsDownloadButton.DataSchema,
  FfzBroadcastId.UserSchema,
  FfzBroadcastId.VariablesSchema,
  FfzBroadcastId.DataSchema,
  SearchResultsPageSearchResults.ChannelSchema,
  SearchResultsPageSearchResults.RelatedLiveChannelSchema,
  SearchResultsPageSearchResults.GameSchema,
  SearchResultsPageSearchResults.VideoSchema,
  SearchResultsPageSearchResults.VariablesSchema,
  SearchResultsPageSearchResults.DataSchema,
  SearchTraySearchSuggestions.SuggestionChannelSchema,
  SearchTraySearchSuggestions.SuggestionCategorySchema,
  SearchTraySearchSuggestions.SuggestionSchema,
  SearchTraySearchSuggestions.SuggestionsSchema,
  SearchTraySearchSuggestions.VariablesSchema,
  SearchTraySearchSuggestions.DataSchema,
  StreamMetadata.UserSchema,
  StreamMetadata.VariablesSchema,
  StreamMetadata.DataSchema,
  UseLive.VariablesSchema,
  UseLive.DataSchema,
  UseViewCount.VariablesSchema,
  UseViewCount.DataSchema,
  VideoAccessTokenClip.VariablesSchema,
  VideoAccessTokenClip.DataSchema,
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
  const ts: string[] = [];

  for (const schema of schemas) {
    const tsDefinition = await jsonSchemaToTs(schema);
    ts.push(tsDefinition);
  }

  const tsContent = ts
    .join('\n')
    // TODO: fix using multiple refs in the same schema
    .replaceAll('SearchResultsPageChannel1', 'SearchResultsPageChannel');

  await fsp.writeFile('./src/queries/types.generated.ts', tsContent);
};

main();
