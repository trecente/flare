"use client";

import { useAtom } from "jotai";
import { ChevronDown, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

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

import { FilterDropdownOption } from "@/types/filter";

export function FilterDropdown({ name, options, atom }: FilterDropdownOption) {
  const [selectedValues, setSelectedValues] = useAtom(atom);
  const [open, setOpen] = useState(false);

  const sortedOptions = useMemo(
    () => [...options].sort((a, b) => a.name.localeCompare(b.name)),
    [options]
  );

  const handleSelect = useCallback(
    (optionId: number) => {
      setSelectedValues((current) =>
        current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
      );
    },
    [setSelectedValues]
  );

  const handleClear = useCallback(() => {
    setSelectedValues([]);
    setOpen(false);
  }, [setSelectedValues]);

  const selectedCount = selectedValues.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[150px] justify-between"
          aria-label={`Select ${name.toLowerCase()}`}
        >
          {name} {selectedCount > 0 && `(${selectedCount})`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <div className="flex items-center justify-between p-2">
            <CommandInput placeholder={`Search ${name.toLowerCase()}`} />
            {selectedCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="h-8 w-8 text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground"
                aria-label="Clear selections"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CommandList>
            <CommandEmpty>No {name.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {sortedOptions.map((option) => (
                <CommandItem
                  key={`${name}-${option.id}`}
                  onSelect={() => handleSelect(option.id)}
                  className="cursor-pointer"
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={selectedValues.includes(option.id)}
                      onCheckedChange={() => handleSelect(option.id)}
                      id={`checkbox-${name}-${option.id}`}
                    />
                    <Label
                      htmlFor={`checkbox-${name}-${option.id}`}
                      className="flex-grow cursor-pointer"
                    >
                      {option.name}
                    </Label>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
