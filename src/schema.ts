import {
  Type as T,
  type Static,
  type TObject,
  type TSchema,
} from '@sinclair/typebox';

export const LegacyRef = <T extends TSchema>(schema: T) =>
  T.Unsafe<Static<T>>(T.Ref(schema.$id!));

export const getResponseSchema = <TDataSchema extends TObject>(
  operationName: string,
  DataSchema: TDataSchema,
) =>
  T.Object(
    {
      data: DataSchema,
      extensions: T.Object(
        {
          durationMilliseconds: T.Number(),
          operationName: T.Literal(operationName),
          requestID: T.String(),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  );
