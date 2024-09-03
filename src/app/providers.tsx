"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { ThemeProvider } from "next-themes";

import { queryClient } from "@/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
