"use client";

import { useAtomValue } from "jotai";
import { Settings } from "lucide-react";

import { FilterDropdown } from "@/components/filter-dropdown";
import { Button } from "@/components/ui/button";

import { categoriesAtom } from "@/store/filters";

export function ImageFilter() {
  const categories = useAtomValue(categoriesAtom);

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <FilterDropdown key={category.type} category={category} />
        ))}
      </div>

      <Button variant="outline" size="icon" aria-label="Settings" disabled>
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
