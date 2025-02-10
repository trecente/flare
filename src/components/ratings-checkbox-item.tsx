import { Checkbox } from "@/components/ui/checkbox";
import { CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { AgeRating } from "@/constants";
import { capitalize } from "@/lib/utils";

type RatingsCheckboxItemProps = {
  rating: AgeRating;
  isSelected: boolean;
  onSelect: (rating: AgeRating) => void;
};

export function RatingsCheckboxItem({
  rating,
  isSelected,
  onSelect,
}: RatingsCheckboxItemProps) {
  return (
    <CommandItem
      onSelect={() => onSelect(rating)}
      className="aria-selected:bg-accent flex items-center gap-2"
    >
      <div
        className="flex flex-1 items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          id={`checkbox-rating-${rating}`}
          onCheckedChange={() => onSelect(rating)}
        />
        <Label
          htmlFor={`checkbox-rating-${rating}`}
          className="flex-1 cursor-pointer"
        >
          {capitalize(rating)}
        </Label>
      </div>
    </CommandItem>
  );
}
