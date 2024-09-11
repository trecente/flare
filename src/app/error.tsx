"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="h-16 w-16 animate-pulse text-destructive" />
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Something Went Wrong
          </h2>
          <p className="text-lg text-muted-foreground">
            We encountered an error while loading this page.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            If the issue persists, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
