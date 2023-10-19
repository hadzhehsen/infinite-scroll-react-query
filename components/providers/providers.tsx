"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/utils/get-query-client";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => {
    return getQueryClient();
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
