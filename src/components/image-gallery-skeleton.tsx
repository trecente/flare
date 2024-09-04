import { ImageCardSkeleton } from "@/components/image-card-skeleton";

export function ImageGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(30)].map((_, idx) => (
        <ImageCardSkeleton key={idx} />
      ))}
    </div>
  );
}
