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
  const url = params
    ? `${API_URL}${endpoint}?${params}`
    : `${API_URL}${endpoint}`;

  const response = await fetch(url);

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
  try {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });

    appendParams(params, "tag", tags);
    appendParams(params, "artist", artists);
    appendParams(params, "character", characters);

    const data: ImageResponse = await fetchData("/images", params);
    return data.items;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error;
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const data: TagResponse = await fetchData("/images/tags");
    return data.items;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    throw error;
  }
}

export async function getArtists(): Promise<Artist[]> {
  try {
    const data: ArtistResponse = await fetchData("/artists");
    return data.items;
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    throw error;
  }
}

export async function getCharacters(): Promise<Character[]> {
  try {
    const data: CharacterResponse = await fetchData("/characters");
    return data.items;
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    throw error;
  }
}
