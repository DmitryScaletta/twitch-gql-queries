import assert from 'node:assert';
import type { TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export const createValidate =
  (ResponseSchema: TSchema, references: TSchema[] = []) =>
  (response: any) => {
    const errors = [...Value.Errors(ResponseSchema, references, response)];
    if (errors.length > 0) {
      for (const error of errors) {
        console.log(error.message, error.path, error.value);
      }
    }
    assert.deepEqual(errors, []);
  };
