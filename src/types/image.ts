import { AgeRating } from "@/constants";

export interface Image {
  id: number;
  url: string;
  rating: AgeRating;
  color_dominant: number[];
  artist_name: string | null;
  tags: string[];
  source_url: string | null;
}

export interface ImageResponse {
  items: Image[];
  count: number;
}

export interface ImageError {
  error: string;
}
