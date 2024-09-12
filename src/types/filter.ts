export type FilterType = "tags" | "artists" | "characters";

export type FilterCategory = {
  name: string;
  type: FilterType;
  options: FilterOption[];
};

export type FilterOption = {
  id: number;
  name: string;
};

export type SelectedFilters = {
  [K in FilterType]: number[];
};

export type FilterState = {
  categories: FilterCategory[];
  selectedFilters: SelectedFilters;
};
