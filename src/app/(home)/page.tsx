import { Metadata } from "next";

import { ImageFilter } from "@/components/image-filter";
import { ImageGallery } from "@/components/image-gallery";

export const metadata: Metadata = {
  title: "Explore Anime Artwork",
};

export default function Home() {
  return (
    <div className="my-5 grid px-10">
      <ImageFilter />
      <ImageGallery />
    </div>
  );
}
