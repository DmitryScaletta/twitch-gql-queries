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
