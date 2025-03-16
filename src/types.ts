export type QueryResponse<TOperationName extends string, TData> = {
  errors?: { message: string }[];
  data: TData;
  extensions: {
    challenge?: { type: 'integrity' };
    durationMilliseconds: number;
    operationName: TOperationName;
    requestID: string;
  };
};
