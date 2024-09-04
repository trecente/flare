export type ImageRating = "explict" | "safe" | "suggestive" | "borderline";

export interface Image {
  id: number;
  image_url: string;
  source: string;
  rating: ImageRating;
  artist: Artist | null;
  characters: Character[];
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  description: string;
  is_nsfw: boolean;
}

export interface Artist {
  id: number;
  name: string;
  aliases: string[];
  image_url: string;
  links: string[];
}

export interface Character {
  id: number;
  name: string;
  aliases: string[];
  description: string;
  ages: number[];
  height: number | null;
  weight: number | null;
  gender: string;
  species: string;
  birthday: string | null;
  nationality: string;
  occupations: string[];
}

export type ImageResponse = {
  items: Image[];
  count: number;
};