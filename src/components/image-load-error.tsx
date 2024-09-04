import { TriangleAlert } from "lucide-react";

export function ImageLoadError() {
  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <TriangleAlert className="h-12 w-12 animate-pulse text-red-500" />
        <div className="text-center">
          <p className="text-2xl font-semibold tracking-tight">
            Failed to load images
          </p>
          <p className="mt-2 text-muted-foreground">
            Please try again later or contact support if the problem persists
          </p>
        </div>
      </div>
    </div>
  );
}
