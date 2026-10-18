import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, pick, TRef } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'ChatList_Badges';
export const displayName = 'ChatListBadges';
export const tags = ['Chat'];

export const UserSchema = strictObject(
  {
    ...pick(schemas.User, ['id', 'primaryColorHex']),
    broadcastBadges: T.Array(
      strictObject(
        pick(schemas.Badge, [
          'id',
          'setID',
          'version',
          'title',
          'image1x',
          'image2x',
          'image4x',
          'clickAction',
          'clickURL',
        ]),
      ),
    ),
    self: T.Union([T.Null()]),
  },
  { $id: `${displayName}User` },
);

export const VariablesSchema = strictObject(
  { channelLogin: T.String() },
  { $id: `${displayName}Variables` },
);

export const DataSchema = strictObject(
  { user: T.Union([T.Null(), TRef(UserSchema)]) },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
