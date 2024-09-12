import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ageRatings } from "@/constants/age-rating";
import { FilterCategory, FilterOption, FilterType } from "@/types/filter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function appendValuesToParams(
  params: URLSearchParams,
  key: string,
  values: (string | number)[]
): void {
  values.forEach((value) => params.append(key, value.toString()));
}

export function createCategory(
  name: string,
  type: FilterType,
  options: FilterOption[]
): FilterCategory {
  return {
    name,
    type,
    options,
  };
}

export function getNamesByIds(ageRatingIds: number[]): string[] {
  return ageRatingIds
    .map((id) => ageRatings.find((r) => r.id === id)?.name.toLowerCase())
    .filter(Boolean) as string[];
}
