import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export function ImageLoadError() {
  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <TriangleAlert className="h-16 w-16 animate-pulse text-destructive" />
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Failed to Load Images
          </h2>
          <p className="text-lg text-muted-foreground">
            We encountered an error while loading the images. Please try
            refreshing the page or check your internet connection.
          </p>
          <p className="text-sm text-muted-foreground">
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
