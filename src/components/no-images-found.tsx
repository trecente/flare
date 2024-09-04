import { SearchX } from "lucide-react";

export function NoImagesFound() {
  return (
    <div className="fixed inset-0 -z-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <SearchX className="h-12 w-12 text-muted-foreground" />
        <div className="text-center">
          <p className="text-2xl font-semibold tracking-tight">
            No images found
          </p>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    </div>
  );
}
