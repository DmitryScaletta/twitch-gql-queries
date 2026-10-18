import { Type as T } from 'typebox';
import { strictObject, getResponseSchema, pick, TRef } from '../../schema.ts';
import * as schemas from '../../schemas.ts';

export const name = 'BitsConfigContext_Global';
export const displayName = 'BitsConfigContextGlobal';
export const tags = ['Chat'];

export const VariablesSchema = strictObject(
  {},
  { $id: `${displayName}Variables` },
);

export const CheermoteSchema = strictObject(
  {
    ...pick(schemas.Cheermote, ['id', 'prefix', 'type', 'campaign']),
    tiers: T.Array(
      strictObject(
        pick(schemas.CheermoteTier, ['id', 'bits', 'canShowInBitsCard']),
      ),
    ),
  },
  { $id: `${displayName}Cheermote` },
);

export const CheerConfigSchema = strictObject(
  {
    displayConfig: strictObject({
      backgrounds: T.Array(T.Union([T.Literal('light'), T.Literal('dark')])),
      colors: T.Array(
        strictObject({
          bits: T.Integer({ minimum: 1 }),
          color: T.String({ pattern: '^#[0-9a-fA-F]{6}$' }),
          __typename: T.Literal('CheermoteColorConfig'),
        }),
      ),
      order: T.Array(schemas.CheermoteType),
      scales: T.Array(T.String()),
      types: T.Array(
        strictObject({
          animation: T.Union([T.Literal('static'), T.Literal('animated')]),
          extension: T.Union([T.Literal('png'), T.Literal('gif')]),
          __typename: T.Literal('CheermoteDisplayType'),
        }),
      ),
      __typename: T.Literal('CheermoteDisplayConfig'),
    }),
    groups: T.Array(
      strictObject({
        templateURL: T.String(),
        nodes: T.Array(TRef(CheermoteSchema)),
        __typename: T.Literal('CheermoteGroup'),
      }),
    ),
    __typename: T.Literal('GlobalCheerConfig'),
  },
  { $id: `${displayName}CheerConfig` },
);

export const DataSchema = strictObject(
  {
    cheerConfig: TRef(CheerConfigSchema),
    __typename: T.Literal('Query'),
  },
  { $id: `${displayName}Data` },
);

export const ResponseSchema = getResponseSchema(DataSchema, name);
