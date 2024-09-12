import { FilterCategory, FilterState, SelectedFilters } from "@/types/filter";
import { atom } from "jotai";

export const initialFilterState: FilterState = {
  categories: [
    { name: "Tags", type: "tags", options: [] },
    { name: "Artists", type: "artists", options: [] },
    { name: "Characters", type: "characters", options: [] },
  ],
  selectedFilters: {
    tags: [],
    artists: [],
    characters: [],
  },
};

export const categoriesAtom = atom<FilterCategory[]>(
  initialFilterState.categories
);
export const selectedFiltersAtom = atom<SelectedFilters>(
  initialFilterState.selectedFilters
);
