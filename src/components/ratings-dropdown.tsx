"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RatingsCheckboxItem } from "@/components/ratings-checkbox-item";
import { sortedAgeRatings } from "@/constants";
import { useImages } from "@/hooks/use-images";
import { useRatingsSelection } from "@/hooks/use-ratings-selection";
import { PopoverClose } from "@radix-ui/react-popover";

export function RatingsDropdown() {
  const { isUnavailable } = useImages();
  const { selectedCount, handleSelect, handleClear, isSelected } =
    useRatingsSelection();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[150px] justify-between"
          disabled={isUnavailable}
        >
          Age Ratings ({selectedCount})
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Search age ratings" />
          <CommandList>
            <CommandEmpty>No age ratings found.</CommandEmpty>
            <CommandGroup>
              {sortedAgeRatings.map((rating) => (
                <RatingsCheckboxItem
                  key={rating}
                  rating={rating}
                  isSelected={isSelected(rating)}
                  onSelect={handleSelect}
                />
              ))}
            </CommandGroup>
          </CommandList>
          <PopoverClose asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="m-2"
              disabled={selectedCount === 0}
            >
              Clear selections
            </Button>
          </PopoverClose>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
