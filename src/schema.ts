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

export const getResponseSchema = <TDataSchema extends TObject>(
  DataSchema: TDataSchema,
  operationName?: string,
) =>
  buildObject({
    errors: T.Optional(
      T.Array(
        buildObject({
          message: T.String(),
          path: T.Optional(T.Array(T.Union([T.String(), T.Number()]))),
          locations: T.Optional(
            buildObject({ line: T.Number(), column: T.Number() }),
          ),
        }),
      ),
    ),
    data: DataSchema,
    extensions: buildObject({
      challenge: T.Optional(buildObject({ type: T.Literal('integrity') })),
      durationMilliseconds: T.Number(),
      ...(operationName ? { operationName: T.Literal(operationName) } : null),
      requestID: T.String(),
    }),
  });
