// In Next.js, this file would be called: app/providers.jsx
'use client';

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { PropsWithChildren, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';
import axios from 'axios';

const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  );

  return data;
};

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(
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

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
