"use client";

import { useQueries } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";

import { ageRatings } from "@/constants/age-rating";
import { createCategory } from "@/lib/utils";
import { getArtists, getCharacters, getTags } from "@/services/image-service";
import { categoriesAtom } from "@/store/filters";

import { FilterOption } from "@/types/filter";
import { ImageFilterOption } from "@/types/image";

export function useCategories() {
  const setCategories = useSetAtom(categoriesAtom);

  const queries = useQueries({
    queries: [
      { queryKey: ["tags"], queryFn: getTags },
      { queryKey: ["artists"], queryFn: getArtists },
      { queryKey: ["characters"], queryFn: getCharacters },
    ],
  });

  const isLoading = queries.some((query) => query.isLoading);

  const mapToOptions = useCallback(
    (data: ImageFilterOption[] | undefined): FilterOption[] =>
      data?.map(({ id, name }) => ({ id, name })) ?? [],
    []
  );

  const [tags, artists, characters] = queries.map((query) => query.data);

  const categories = useMemo(
    () => [
      createCategory("Tags", "tags", mapToOptions(tags)),
      createCategory("Artists", "artists", mapToOptions(artists)),
      createCategory("Characters", "characters", mapToOptions(characters)),
      createCategory("Age Ratings", "age_ratings", ageRatings),
    ],
    [tags, artists, characters, mapToOptions]
  );

  useEffect(() => {
    if (!isLoading) {
      setCategories(categories);
    }
  }, [categories, setCategories, isLoading]);

  return { isCategoriesLoading: isLoading };
}
