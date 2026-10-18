export type QueryError = {
  message: string;
  /** The path to the field at fault, stepping through names and list indices */
  path?: (string | number)[];
  extensions?: {
    code?: string;
    /** What an error carries beyond `code` is whatever the failure was */
    [key: string]: unknown;
  };
};

export type QueryResponse<TData, TOperationName extends string = never> = {
  errors?: QueryError[];
  data?: TData;
  extensions?: {
    challenge?: { type: "integrity" };
    durationMilliseconds: number;
    operationName: TOperationName extends never ? never : TOperationName;
    requestID: string;
  };
};
