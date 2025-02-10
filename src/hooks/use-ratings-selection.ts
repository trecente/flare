import { useAtom } from "jotai";

import { AgeRating } from "@/constants";
import { ratingsAtom } from "@/store";

export function useRatingsSelection() {
  const [ratings, setRatings] = useAtom(ratingsAtom);

  return {
    selectedCount: ratings.length,
    handleSelect: (rating: AgeRating) =>
      setRatings(
        ratings.includes(rating)
          ? ratings.filter((r) => r !== rating)
          : [...ratings, rating]
      ),
    handleClear: () => setRatings([]),
    isSelected: (rating: AgeRating) => ratings.includes(rating),
  };
}
