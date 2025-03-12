import type {
  BrowsePageAllDirectoriesData,
  ChannelShellData,
  ClipsActionButtonsData,
  ClipsCardsGameData,
  ClipsCardsUserData,
  ClipsDownloadButtonData,
  FfzBroadcastIdData,
  SearchResultsPageSearchResultsData,
  SearchTraySearchSuggestionsData,
  StreamMetadataData,
  UseLiveData,
  UseViewCountData,
  VideoAccessTokenClipData,
} from './queries/types.generated.ts';

// prettier-ignore
type QueryResponseMap = {
  BrowsePage_AllDirectories:       QueryResponse<'BrowsePage_AllDirectories',       BrowsePageAllDirectoriesData>;
  ChannelShell:                    QueryResponse<'ChannelShell',                    ChannelShellData>;
  ClipsActionButtons:              QueryResponse<'ClipsActionButtons',              ClipsActionButtonsData>;
  ClipsCards__Game:                QueryResponse<'ClipsCards__Game',                ClipsCardsGameData>;
  ClipsCards__User:                QueryResponse<'ClipsCards__User',                ClipsCardsUserData>;
  ClipsDownloadButton:             QueryResponse<'ClipsDownloadButton',             ClipsDownloadButtonData>;
  FFZ_BroadcastID:                 QueryResponse<'FFZ_BroadcastID',                 FfzBroadcastIdData>;
  SearchResultsPage_SearchResults: QueryResponse<'SearchResultsPage_SearchResults', SearchResultsPageSearchResultsData>;
  SearchTray_SearchSuggestions:    QueryResponse<'SearchTray_SearchSuggestions',    SearchTraySearchSuggestionsData>;
  StreamMetadata:                  QueryResponse<'StreamMetadata',                  StreamMetadataData>;
  UseLive:                         QueryResponse<'UseLive',                         UseLiveData>;
  UseViewCount:                    QueryResponse<'UseViewCount',                    UseViewCountData>;
  VideoAccessToken_Clip:           QueryResponse<'VideoAccessToken_Clip',           VideoAccessTokenClipData>;
};
type QueryResponseItem = QueryResponseMap[keyof QueryResponseMap];
export type Query = { operationName: keyof QueryResponseMap };

export type QueryMapping<
  N extends Query[],
  Acc extends QueryResponseItem[] = [],
> = N['length'] extends Acc['length']
  ? Acc
  : QueryMapping<
      N,
      [...Acc, QueryResponseMap[N[Acc['length']]['operationName']]]
    >;

export type QueryResponse<TOperationName extends string, TData> = {
  errors?: { message: string }[];
  data: TData;
  extensions: {
    challenge?: { type: 'integrity' };
    durationMilliseconds: number;
    operationName: TOperationName;
    requestID: string;
  };
};
