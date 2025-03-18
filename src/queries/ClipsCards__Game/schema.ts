import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';
import { ClipsCardsFilterSchema } from '../ClipsCards.schema.ts';

const name = 'ClipsCards__Game';
const displayName = 'ClipsCardsGame';

export const VariablesSchema = T.Object(
  {
    categorySlug: T.String(),
    limit: T.Number(),
    criteria: T.Optional(
      T.Object(
        {
          languages: T.Optional(T.Union([T.Array(T.String()), T.Null()])),
          filter: T.Optional(
            T.Union([LegacyRef(ClipsCardsFilterSchema), T.Null()]),
          ),
          shouldFilterByDiscoverySetting: T.Optional(
            T.Union([T.Boolean(), T.Null()]),
          ),
        },
        { additionalProperties: false },
      ),
    ),
    cursor: T.Optional(T.Union([T.String(), T.Null()])),
  },
  {
    $id: `${displayName}Variables`,
    additionalProperties: false,
  },
);

const GuestStarParticipantsSchema = T.Object(
  {
    guests: T.Array(
      T.Object(
        {
          id: T.String(),
          login: T.String(),
          displayName: T.String(),
          profileImageURL: T.String({
            /* format: 'uri' */
          }),
          primaryColorHex: T.Union([T.Null(), T.String()]),
          description: T.Union([T.Null(), T.String()]),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ),
    sessionIdentifier: T.String(),
    __typename: T.Literal('GuestStarParticipants'),
  },
  { additionalProperties: false },
);

export const ClipSchema = T.Object(
  {
    id: T.String(),
    slug: T.String(),
    title: T.String(),
    viewCount: T.Number(),
    curator: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          login: T.String(),
          displayName: T.String(),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ]),
    game: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          slug: T.String(),
          name: T.String(),
          boxArtURL: T.String({
            /* format: 'uri' */
          }),
          __typename: T.Literal('Game'),
        },
        { additionalProperties: false },
      ),
    ]),
    broadcaster: T.Union([
      T.Null(),
      T.Object(
        {
          id: T.String(),
          login: T.String(),
          displayName: T.String(),
          profileImageURL: T.String({
            /* format: 'uri' */
          }),
          primaryColorHex: T.Optional(T.Union([T.Null(), T.String()])),
          roles: T.Object(
            {
              isPartner: T.Boolean(),
              __typename: T.Literal('UserRoles'),
            },
            { additionalProperties: false },
          ),
          __typename: T.Literal('User'),
        },
        { additionalProperties: false },
      ),
    ]),
    thumbnailURL: T.String({
      /* format: 'uri' */
    }),
    createdAt: T.String({
      /* format: 'date-time' */
    }),
    durationSeconds: T.Number(),
    isFeatured: T.Boolean(),
    guestStarParticipants: T.Union([T.Null(), GuestStarParticipantsSchema]),
    previewThumbnailProperties: T.Object(
      {
        blurReason: T.Union([T.Literal('BLUR_NOT_REQUIRED'), T.String()]),
        __typename: T.Literal('PreviewThumbnailProperties'),
      },
      { additionalProperties: false },
    ),
    __typename: T.Literal('Clip'),
  },
  {
    $id: `${displayName}Clip`,
    additionalProperties: false,
  },
);

const ClipsSchema = T.Object(
  {
    banners: T.Union([
      T.Null(),
      T.Array(T.Union([T.Literal('MAY_CONTAIN_MATURE_CONTENT'), T.String()])),
    ]),
    pageInfo: T.Object(
      {
        hasNextPage: T.Boolean(),
        __typename: T.Literal('PageInfo'),
      },
      { additionalProperties: false },
    ),
    edges: T.Array(
      T.Object(
        {
          cursor: T.Union([T.Null(), T.String()]),
          node: LegacyRef(ClipSchema),
          __typename: T.Literal('ClipEdge'),
        },
        { additionalProperties: false },
      ),
    ),
    __typename: T.Literal('ClipConnection'),
  },
  { additionalProperties: false },
);

const GameSchema = T.Object(
  {
    id: T.String(),
    name: T.String(),
    displayName: T.String(),
    clips: T.Union([T.Null(), ClipsSchema]),
    __typename: T.Literal('Game'),
  },
  { additionalProperties: false },
);

export const DataSchema = T.Object(
  { game: T.Union([T.Null(), GameSchema]) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema, true);
