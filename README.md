# twitch-gql-queries

Type-safe requests to twitch public GraphQL API

You can try queries right in the browser: [Swagger UI](https://twitch-gql-swagger.surge.sh) / [Scalar Swagger UI](https://twitch-gql-swagger.surge.sh/scalar/)

## Features

* **Type-safe** objects for all queries: *Variables* and *Response*
* **[Swagger UI](https://twitch-gql-swagger.surge.sh)** to see and try all queries or generate types for your language
* **TypeBox Schemas** for *Variables* and *Response* objects
* **Tests** to validate types with real requests
* **Zero dependencies**

## Installation

```bash
npm i twitch-gql-queries

pnpm i twitch-gql-queries

yarn add twitch-gql-queries
```

## Usage

```ts
import {
  getQueryClipsCardsUser,
  getQueryStreamMetadata,
  getQueryFfzBroadcastId,
  getQueryUseViewCount,
  gqlRequest,
} from 'twitch-gql-queries';

const [
  streamMetadataResponse,
  ffzBroadcastIdResponse,
  clipsCardsUserResponse,
] = await gqlRequest([
  getQueryStreamMetadata({ channelLogin: 'xqc' }),
  getQueryFfzBroadcastId({ id: '71092938' }),
  getQueryClipsCardsUser({
    login: 'xqc',
    limit: 30,
    criteria: { filter: 'LAST_MONTH' },
  }),
]);

console.log({
  streamMetadataResponse,
  ffzBroadcastIdResponse,
  clipsCardsUserResponse,
});

const channels = await gqlRequest(
  ['lirik', 'forsen'].map((channelLogin) =>
    getQueryUseViewCount({ channelLogin }),
  ),
);

console.log(channels);
```

Using raw queries:

```ts
import { getRawQuery, gqlRequest, type GetRawQueryReturnType } from 'twitch-gql-queries';

const query = `
query GetVideo($videoId: ID!) {
  video(id: $videoId) {
    id
    title
    game {
      id
      name
    }
  }
}`;
type GetVideoData = {
  video: {
    id: string;
    title: string;
    game: null | {
      id: string;
      name: string;
    }
  }
}
const getQueryGetVideo = (variables: { videoId: string }) =>
  ({ query, variables }) as GetRawQueryReturnType<GetVideoData>;

const responses = await gqlRequest([
  getRawQuery<GetVideoData>({
    query,
    variables: { videoId: '1622426365' },
  }),
  getQueryGetVideo({ videoId: '1816688726' }),
]);

console.log(responses);
```

## Available queries

* BrowsePage_AllDirectories
* ChannelRoot_AboutPanel
* ChannelShell
* ChannelVideoShelvesQuery
* ClipsCards__Game
* ClipsCards__User
* ClipsDownloadButton
* DirectoryPage_Game
* FFZ_BroadcastID
* FilterableVideoTower_Videos
* GetPinnedChat
* GetUserID
* GlobalBadges
* PlaybackAccessToken
* SearchResultsPage_SearchResults
* SearchTray_SearchSuggestions
* ShareClipRenderStatus
* StreamMetadata
* UseLive
* UseViewCount
* VideoAccessToken_Clip
* VideoMetadata
* VideoPreviewOverlay
* WatchLivePrompt

## Adding new query

### Step 1. Generate query template

```bash
pnpm add-query QueryName
```

### Step 2: Add schemas

Add `VariablesSchema` and `DataSchema` (`data` field in the query response) using [TypeBox](https://github.com/sinclairzx81/typebox).

It's possible to export additional schemas like `ClipSchema` or `UserSchema` if needed. Schema name should end with `Schema` and should have an `$id` property. Use `LegacyRef` to link them to main schemas.

### Step 3: Generate types

```bash
pnpm gen
```

### Step 4: Add http requests

Add at least one http request to `query.http`. Add more cases for various scenarios if possible.

See VS Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension

### Step 5: Add tests

Add tests for all possible query responses.

If it's impossible to test some cases with real requests, add responses to `src/queries/QueryName/mocks` folder. For example:

* `mocks/response-online.json`
* `mocks/response-offline.json`
* `mocks/response-banned.json`

Currently banned channels can be found here: [x.com/StreamerBans](https://x.com/StreamerBans).

## Removing query

```bash
pnpm remove-query QueryName
```
