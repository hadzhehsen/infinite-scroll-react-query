import { QueryClient, QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import { cache } from 'react';

const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  );

  return data;
};

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000,
          queryFn: defaultQueryFn,
        },
      },
    }),
);
