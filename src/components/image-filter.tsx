"use client";

import { Settings } from "lucide-react";
import { useMemo } from "react";

import { FilterDropdown } from "@/components/filter-dropdown";
import { Button } from "@/components/ui/button";

import { useFilterData } from "@/hooks/use-filter-data";
import {
  selectedArtistsAtom,
  selectedCharactersAtom,
  selectedTagsAtom,
} from "@/store/filters";
import { FilterDropdownOption } from "@/types/filter";

export function ImageFilter() {
  const { tags, artists, characters } = useFilterData();

  const filterDropdownOptions = useMemo<FilterDropdownOption[]>(
    () => [
      {
        name: "Tags",
        options: tags.map(({ id, name }) => ({ id, name })),
        atom: selectedTagsAtom,
      },
      {
        name: "Artists",
        options: artists.map(({ id, name }) => ({ id, name })),
        atom: selectedArtistsAtom,
      },
      {
        name: "Characters",
        options: characters.map(({ id, name }) => ({ id, name })),
        atom: selectedCharactersAtom,
      },
    ],
    [tags, artists, characters]
  );

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex flex-wrap gap-4">
        {filterDropdownOptions.map((option) => (
          <FilterDropdown key={option.name} {...option} />
        ))}
      </div>

      <Button variant="outline" size="icon" aria-label="Settings" disabled>
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
