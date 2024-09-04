"use client";

import { Settings } from "lucide-react";

import { FilterSwitch } from "@/components/filter-switch";
import { Button } from "@/components/ui/button";

import { hideDetailsAtom, isNsfwAtom } from "@/store/settings";

export type FilterOption = {
  id: string;
  label: string;
  atom: typeof isNsfwAtom | typeof hideDetailsAtom;
};

const filterOptions: FilterOption[] = [
  { id: "nsfw-mode", label: "NSFW Mode", atom: isNsfwAtom },
  { id: "hide-details", label: "Hide Details", atom: hideDetailsAtom },
];

export function ImageFilter() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex flex-wrap gap-4">
        {filterOptions.map(({ id, label, atom }) => (
          <FilterSwitch key={id} id={id} label={label} atom={atom} />
        ))}
      </div>
      <Button variant="outline" size="icon" aria-label="Settings" disabled>
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
