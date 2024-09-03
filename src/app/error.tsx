"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
};

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl font-semibold tracking-tight">Error</p>
        <p className="mt-2 text-lg text-muted-foreground">
          Something went wrong while trying to load this page.
        </p>
      </div>
    </div>
  );
}
