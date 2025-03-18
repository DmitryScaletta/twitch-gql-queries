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

const integrityChallenge = {
  challenge: T.Optional(
    T.Object({ type: T.Literal('integrity') }, { additionalProperties: false }),
  ),
} as const;

export const getResponseSchema = <TDataSchema extends TObject>(
  operationName: string,
  DataSchema: TDataSchema,
  integrityError = false,
) =>
  T.Object(
    {
      errors: T.Optional(
        T.Array(
          T.Object(
            {
              message: T.String(),
              path: T.Array(T.String()),
            },
            { additionalProperties: false },
          ),
        ),
      ),
      data: DataSchema,
      extensions: T.Object(
        {
          ...(integrityError ? integrityChallenge : {}),
          durationMilliseconds: T.Number(),
          operationName: T.Literal(operationName),
          requestID: T.String(),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  );
