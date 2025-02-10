import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseCustomQueryParamsTypes<T> {
  filters?: string | {};
  queryKeyName: string;
  queryFn: (filterString: string, signal: AbortSignal) => Promise<any>;
  page?: number;
  queryKeys?: (string | number | boolean | null | undefined)[];
  sort?: string;
  include?: string;
  queryOptions?: any;
  id?: any;
}

interface useCustomQueryReturnType<T> {
  data: T | undefined;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isPending: boolean;
  isLoading: boolean;
  isFetched: boolean;
  error: AxiosError<unknown, any> | null;
}

const useCustomQuery = <T>({
  filters = {},
  queryKeyName,
  queryFn,
  page,
  sort,
  include,
  queryKeys = [],
  queryOptions,
  id,
}: UseCustomQueryParamsTypes<T>): useCustomQueryReturnType<T> => {
  const {
    data,
    isFetching,
    isSuccess,
    isError,
    isPending,
    isLoading,
    isFetched,
    error,
  } = useQuery<T>({
    queryKey: [
      queryKeyName,
      filters,
      ...(page !== undefined ? [page + 1] : []),
      sort,
      include,
      id,
      ...queryKeys,
    ],
    queryFn: ({ signal }) => {
      const filterString = Object.entries(filters)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `filter[${key}]=${value}`)
        .join("&");

      const sortString = sort ? `sort=${sort}` : "";
      const includeString = include ? `include=${include}` : "";

      const queryParams = [
        filterString,
        sortString,
        includeString,
        ...(page !== undefined ? [`page=${page + 1}`] : []),
      ]
        .filter((param) => param)
        .join("&");

      return queryFn(queryParams, signal);
    },
    ...queryOptions,
  });

  return {
    data,
    isFetching,
    isSuccess,
    isError,
    isPending,
    isLoading,
    isFetched,
    error: error as AxiosError<unknown, any> | null,
  };
};

export default useCustomQuery;
