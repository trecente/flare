"use client";

import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useFilterSelection } from "@/hooks/use-filter-selection";
import { useImages } from "@/hooks/use-images";
import { FilterCategory } from "@/types/filter";

type FilterDropdownProps = {
  category: FilterCategory;
};

export function FilterDropdown({
  category: { name, type, options },
}: FilterDropdownProps) {
  const { isUnavailable } = useImages();
  const { selectedCount, handleSelect, handleClear, isSelected } =
    useFilterSelection(type);

  const sortedOptions = useMemo(
    () => [...options].sort((a, b) => a.name.localeCompare(b.name)),
    [options]
  );

  const lowerCaseName = name.toLowerCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="min-w-[150px] justify-between"
          aria-label={`Select ${lowerCaseName}`}
          disabled={isUnavailable}
        >
          {name} {selectedCount > 0 && `(${selectedCount})`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder={`Search ${lowerCaseName}`} />
          <CommandList>
            <CommandEmpty>No {lowerCaseName} found.</CommandEmpty>
            <CommandGroup>
              {sortedOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(option.id);
                  }}
                >
                  <CommandItem className="cursor-pointer items-center gap-2">
                    <Checkbox
                      checked={isSelected(option.id)}
                      id={`checkbox-${type}-${option.id}`}
                    />
                    <Label
                      htmlFor={`checkbox-${type}-${option.id}`}
                      className="flex-grow cursor-pointer"
                    >
                      {option.name}
                    </Label>
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
          {selectedCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="m-2"
            >
              Clear selections
            </Button>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
