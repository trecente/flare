import { Skeleton } from "@/components/ui/skeleton";

export function ImageCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <div className="aspect-square">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="absolute left-4 top-4 h-5 w-16" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950/50 to-transparent p-4">
        <div className="flex flex-wrap gap-1">
          {[...Array(2)].map((_, idx) => (
            <Skeleton key={idx} className="h-5 w-16" />
          ))}
        </div>
        <Skeleton className="mt-2 h-4 w-32" />
      </div>
    </div>
  );
}
