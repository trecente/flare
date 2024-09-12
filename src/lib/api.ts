import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiResponse<T> = {
  items: T;
};

export async function fetchData<T>(
  endpoint: string,
  params?: URLSearchParams
): Promise<T> {
  const url = new URL(`${API_URL}${endpoint}`);

  if (params) url.search = params.toString();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("An error occurred. Please try again.");
    throw error;
  }
}
