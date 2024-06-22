export const ErrorHandler = <T>(error: unknown, data?: T): ApiResponse<T> => {
  console.log(error);
  return {
    data,
    error: "GENERIC_ERROR",
  };
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};
