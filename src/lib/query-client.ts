import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000, // 1 hour
      gcTime: 60 * 60 * 24 * 1000, // 24 hours
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
