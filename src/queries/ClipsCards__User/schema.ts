import { Type as T } from '@sinclair/typebox';
import { getResponseSchema, LegacyRef } from '../../schema.ts';
import { ClipsCardsFilterSchema } from '../ClipsCards.schema.ts';

const name = 'ClipsCards__User';
const displayName = 'ClipsCardsUser';

export const VariablesSchema = T.Object(
  {
    login: T.String(),
    limit: T.Number(),
    criteria: T.Optional(
      T.Object(
        {
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
    url: T.String({
      /* format: 'uri' */
    }),
    embedURL: T.String({
      /* format: 'uri' */
    }),
    title: T.String(),
    viewCount: T.Number(),
    language: T.String(),
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
    champBadge: T.Union([T.Null(), T.Unknown()]),
    isFeatured: T.Boolean(),
    guestStarParticipants: T.Union([T.Null(), GuestStarParticipantsSchema]),
    __typename: T.Literal('Clip'),
  },
  {
    $id: `${displayName}Clip`,
    additionalProperties: false,
  },
);

const ClipsSchema = T.Object(
  {
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

const UserSchema = T.Object(
  {
    id: T.String(),
    clips: T.Union([T.Null(), ClipsSchema]),
    __typename: T.Literal('User'),
  },
  { additionalProperties: false },
);

export const DataSchema = T.Object(
  { user: T.Union([T.Null(), UserSchema]) },
  {
    $id: `${displayName}Data`,
    additionalProperties: false,
  },
);

export const ResponseSchema = getResponseSchema(name, DataSchema, true);
