import {
  Artist,
  ArtistResponse,
  Character,
  CharacterResponse,
  Image,
  ImageResponse,
  Tag,
  TagResponse,
} from "@/types/image";

const API_URL = "https://api.nekosapi.com/v3";

type ImageSearchParams = {
  offset: number;
  limit: number;
  tags: number[];
  artists: number[];
  characters: number[];
};

async function fetchData<T>(
  endpoint: string,
  params?: URLSearchParams
): Promise<T> {
  const url = new URL(`${API_URL}${endpoint}`);

  if (params) {
    url.search = params.toString();
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

const appendParams = (params: URLSearchParams, key: string, values: number[]) =>
  values.forEach((value) => params.append(key, value.toString()));

export async function getImages({
  offset,
  limit,
  tags,
  artists,
  characters,
}: ImageSearchParams): Promise<Image[]> {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  appendParams(params, "tag", tags);
  appendParams(params, "artist", artists);
  appendParams(params, "character", characters);

  try {
    const data = await fetchData<ImageResponse>("/images", params);
    return data.items;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error;
  }
}

export async function getTags(): Promise<Tag[]> {
  return fetchData<TagResponse>("/images/tags").then((data) => data.items);
}

export async function getArtists(): Promise<Artist[]> {
  return fetchData<ArtistResponse>("/artists").then((data) => data.items);
}

export async function getCharacters(): Promise<Character[]> {
  return fetchData<CharacterResponse>("/characters").then((data) => data.items);
}
