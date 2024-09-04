import { Image, ImageResponse } from "@/types/image";

const API_URL = "https://api.nekosapi.com/v3";

type ImageSearchParams = {
  offset: number;
  limit: number;
  isNsfw: boolean;
};

export async function getImages({
  offset,
  limit,
  isNsfw,
}: ImageSearchParams): Promise<Image[]> {
  try {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      ...(!isNsfw && { rating: "safe" }),
    });

    const response = await fetch(`${API_URL}/images?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ImageResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error;
  }
}
