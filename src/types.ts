export type QueryResponse<TData, TOperationName extends string = never> = {
  errors?: { message: string }[];
  data: TData;
  extensions: {
    challenge?: { type: 'integrity' };
    durationMilliseconds: number;
    operationName: TOperationName extends never ? never : TOperationName;
    requestID: string;
  };
};
