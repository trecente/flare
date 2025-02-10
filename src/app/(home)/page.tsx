import { Metadata } from "next";

import { ImageGallery } from "@/components/image-gallery";
import { RatingsContainer } from "@/components/ratings-container";

export const metadata: Metadata = {
  title: "Explore Anime Artwork",
};

export default function Home() {
  return (
    <div className="grid px-4 py-5 sm:px-6 lg:px-10">
      <RatingsContainer />
      <ImageGallery />
    </div>
  );
}
