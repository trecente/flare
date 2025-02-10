"use client";

import { Settings } from "lucide-react";

import { RatingsDropdown } from "@/components/ratings-dropdown";
import { Button } from "@/components/ui/button";

export function RatingsContainer() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <RatingsDropdown />
        </div>

        <Button
          variant="outline"
          size="icon"
          aria-label="Settings (coming soon)"
          disabled
          className="shrink-0"
          title="Settings coming soon"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
