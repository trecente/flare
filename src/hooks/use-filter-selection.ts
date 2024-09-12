import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { selectedFiltersAtom } from "@/store/filters";
import { SelectedFilters } from "@/types/filter";

const MAX_ARTISTS = 1;

export type FilterType = keyof SelectedFilters;

export function useFilterSelection(type: FilterType) {
  const [selectedFilters, setSelectedFilters] = useAtom(selectedFiltersAtom);

  const selectedValues = useMemo(
    () => selectedFilters[type] ?? [],
    [selectedFilters, type]
  );

  const selectedCount = selectedValues.length;

  const handleSelect = useCallback(
    (id: number) => {
      setSelectedFilters((prev) => {
        const currentTypeFilters = prev[type] ?? [];
        const isArtistType = type === "artists";
        const isAlreadySelected = currentTypeFilters.includes(id);

        if (isArtistType) {
          if (isAlreadySelected) return { ...prev, [type]: [] };
          if (currentTypeFilters.length >= MAX_ARTISTS) {
            toast.info("Only one artist can be selected at a time.");
            return prev;
          }
          return { ...prev, [type]: [id] };
        }

        return {
          ...prev,
          [type]: isAlreadySelected
            ? currentTypeFilters.filter((v) => v !== id)
            : [...currentTypeFilters, id],
        };
      });
    },
    [setSelectedFilters, type]
  );

  const handleClear = useCallback(() => {
    setSelectedFilters((prev) => ({ ...prev, [type]: [] }));
  }, [setSelectedFilters, type]);

  const isSelected = useCallback(
    (id: number) => selectedValues.includes(id),
    [selectedValues]
  );

  return {
    selectedCount,
    handleSelect,
    handleClear,
    isSelected,
  };
}
