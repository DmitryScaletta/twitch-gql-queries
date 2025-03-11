import { Type as T } from '@sinclair/typebox';

const category = 'ClipsCards';

export const ClipsCardsFilterSchema = T.Union(
  [
    T.Literal('LAST_DAY'),
    T.Literal('LAST_WEEK'),
    T.Literal('LAST_MONTH'),
    T.Literal('ALL_TIME'),
  ],
  { $id: `${category}Filter` },
);

export const ClipsCardsClipSchema = T.Object(
  {
    id: T.String(),
    slug: T.String(),
    url: T.String(),
    embedURL: T.String(),
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
    isFeatured: T.Boolean(),
    durationSeconds: T.Number(),
    champBadge: T.Null(),
    __typename: T.Literal('Clip'),
  },
  {
    $id: `${category}Clip`,
    additionalProperties: false,
  },
);
