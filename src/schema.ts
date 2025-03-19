import {
  Type as T,
  type ObjectOptions,
  type Static,
  type TObject,
  type TProperties,
  type TSchema,
} from '@sinclair/typebox';

export const LegacyRef = <T extends TSchema>(schema: T) =>
  T.Unsafe<Static<T>>(T.Ref(schema.$id!));

export const pick = <TSchema extends TProperties, TKey extends keyof TSchema>(
  schema: TSchema,
  keys: readonly TKey[],
): Pick<TSchema, TKey> & { __typename: TSchema['__typename'] } => {
  const obj = {} as any;
  for (const key of keys) obj[key] = schema[key];
  obj.__typename = schema.__typename;
  return obj;
};

export const buildObject = <TProps extends TProperties>(
  props: TProps,
  options?: ObjectOptions,
) => {
  if ('__typename' in props) {
    const __typename = props.__typename;
    delete props.__typename;
    // @ts-ignore
    props.__typename = __typename;
  }
  return T.Object(props, { ...options, additionalProperties: false });
};

const integrity = {
  challenge: T.Optional(buildObject({ type: T.Literal('integrity') })),
} as const;

export const getResponseSchema = <TDataSchema extends TObject>(
  operationName: string,
  DataSchema: TDataSchema,
  integrityChallenge = false,
) =>
  buildObject({
    errors: T.Optional(
      T.Array(
        buildObject({
          message: T.String(),
          path: T.Array(T.String()),
        }),
      ),
    ),
    data: DataSchema,
    extensions: buildObject({
      ...(integrityChallenge ? integrity : {}),
      durationMilliseconds: T.Number(),
      operationName: T.Literal(operationName),
      requestID: T.String(),
    }),
  });
