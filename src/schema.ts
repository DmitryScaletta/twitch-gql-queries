import {
  Type as T,
  type Static,
  type TObject,
  type TSchema,
} from '@sinclair/typebox';

export const LegacyRef = <T extends TSchema>(schema: T) =>
  T.Unsafe<Static<T>>(T.Ref(schema.$id!));

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
