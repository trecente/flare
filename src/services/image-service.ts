import { fetchData } from "@/lib/api";
import { appendValuesToParams, getNamesByIds } from "@/lib/utils";
import { Artist, Character, Image, Tag } from "@/types/image";

type ImageSearchParams = {
  offset: number;
  limit: number;
  tags: number[];
  artists: number[];
  characters: number[];
  ratings: number[];
};

export const getImages = ({
  offset,
  limit,
  tags,
  artists,
  characters,
  ratings,
}: ImageSearchParams) => {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  const filterParams = {
    tag: tags,
    artist: artists,
    character: characters,
    rating: getNamesByIds(ratings),
  };

  Object.entries(filterParams).forEach(([key, values]) =>
    appendValuesToParams(params, key, values)
  );

  return fetchData<Image[]>("/images", params);
};

export const getTags = () => fetchData<Tag[]>("/images/tags");
export const getArtists = () => fetchData<Artist[]>("/artists");
export const getCharacters = () => fetchData<Character[]>("/characters");
