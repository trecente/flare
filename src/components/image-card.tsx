"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageCardSkeleton } from "@/components/image-card-skeleton";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types/image";

type ImageCardProps = {
  image: ImageType;
  priority: boolean;
};

const NSFW_RATINGS = ["explicit", "borderline"] as const;
const MAX_TAGS = 3;

export function ImageCard({ image, priority }: ImageCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dominantColor = `rgb(${image.color_dominant.join(", ")})`;
  const isNsfw = NSFW_RATINGS.includes(
    image.rating as (typeof NSFW_RATINGS)[number]
  );

  if (hasError) return null;

  return (
    <div className="group relative cursor-pointer select-none overflow-hidden rounded-lg shadow-md">
      <div
        className="relative aspect-square"
        style={{ backgroundColor: dominantColor }}
      >
        {!isImageLoaded && <ImageCardSkeleton />}

        <Image
          src={image.image_url}
          alt={`Image by ${image.artist?.name || "Unknown"}`}
          className={cn(
            "object-cover duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-110",
            isImageLoaded ? "scale-100 blur-0" : "scale-110 opacity-0 blur-2xl"
          )}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setHasError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
        />
      </div>
      {isImageLoaded && (
        <>
          <Badge
            variant={isNsfw ? "destructive" : "secondary"}
            className="absolute left-4 top-4 z-10"
          >
            {isNsfw ? "NSFW" : "SFW"}
          </Badge>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950/50 to-transparent p-4">
            <div className="flex flex-wrap gap-1">
              {image.tags.slice(0, MAX_TAGS).map((tag, idx) => (
                <Badge key={idx} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>

            <p className="mt-2 text-sm text-white">
              <span className="font-medium">Artist:</span>{" "}
              {image.artist?.name || "Unknown"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
