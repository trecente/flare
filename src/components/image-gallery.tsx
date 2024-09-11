"use client";

import { useInView } from "react-intersection-observer";

import { ImageCard } from "@/components/image-card";
import { ImageGallerySkeleton } from "@/components/image-gallery-skeleton";
import { ImageLoadError } from "@/components/image-load-error";
import { NoImagesFound } from "@/components/no-images-found";

import { useImages } from "@/hooks/use-images";

export function ImageGallery() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const {
    images,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useImages();

  if (error) return <ImageLoadError />;
  if (isLoading) return <ImageGallerySkeleton />;
  if (images.length === 0) return <NoImagesFound />;

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image, idx) => (
          <ImageCard
            key={`${image.id}-${idx}`}
            image={image}
            priority={idx < 5}
          />
        ))}
      </div>
      {isFetchingNextPage && <ImageGallerySkeleton />}
      <div ref={ref} className="h-10" aria-hidden="true" />
    </div>
  );
}
