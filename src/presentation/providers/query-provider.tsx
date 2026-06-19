import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { PropsWithChildren } from "react";

export const queryClient =
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  });

export function QueryProvider({
  children,
}: PropsWithChildren) {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  );
}