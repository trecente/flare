import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { FilterCategory, FilterOption, FilterType } from "@/types/filter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function appendValuesToParams(
  params: URLSearchParams,
  key: string,
  values: number[]
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
