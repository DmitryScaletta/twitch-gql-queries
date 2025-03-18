# twitch-gql-queries

Type-safe requests to twitch public GraphQL API

## Features

* **Type-safe**. Types for query variables and responses
* **Tests**. All types are validated with real requests
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

## Available queries

* BrowsePage_AllDirectories
* ChannelRoot_AboutPanel
* ChannelShell
* ClipsActionButtons
* ClipsCards__Game
* ClipsCards__User
* ClipsDownloadButton
* DirectoryPage_Game
* FFZ_BroadcastID
* GetPinnedChat
* GetUserID
* GlobalBadges
* SearchResultsPage_SearchResults
* SearchTray_SearchSuggestions
* ShareClipRenderStatus
* StreamMetadata
* UseLive
* UseViewCount
* VideoAccessToken_Clip
* VideoPreviewOverlay
* WatchLivePrompt

## Adding new query

### Step 1. Generate query template

```bash
pnpm new-query QueryName
```

### Step 2: Add schemas

Add `VariablesSchema` and `DataSchema` (`data` field in the query response) using [TypeBox](https://github.com/sinclairzx81/typebox).

It's possible to export additional schemas like `ClipSchema` or `UserSchema` if needed (exports should end with `Schema`). Use `LegacyRef` to link them to main schemas.

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
