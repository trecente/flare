import { AgeRating } from "@/constants";
import { Image, ImageError, ImageResponse } from "@/types";
import { toast } from "sonner";

type ImageSearchParams = {
  offset: number;
  limit: number;
  ratings: AgeRating[];
};

const isError = (data: ImageResponse | ImageError): data is ImageError => {
  return "error" in data;
};

export const getImages = async (
  params: ImageSearchParams
): Promise<Image[]> => {
  const { ratings, ...rest } = params;
  const searchParams = new URLSearchParams();

  Object.entries(rest).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });

  ratings.forEach((rating) => searchParams.append("rating", rating));

  try {
    const response = await fetch(`/api/proxy?${searchParams.toString()}`);
    const data = (await response.json()) as ImageResponse | ImageError;

    if (isError(data)) {
      throw new Error(data.error);
    }

    return data.items;
  } catch (error) {
    console.error("[Image Service] Error:", error);
    toast.error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
    throw error;
  }
};
