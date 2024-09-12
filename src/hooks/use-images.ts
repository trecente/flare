"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { useCategories } from "@/hooks/use-categories";
import { getImages } from "@/services/image-service";
import { selectedFiltersAtom } from "@/store/filters";
import { Image } from "@/types/image";

const ITEMS_PER_PAGE = 30;

export function useImages() {
  const selectedFilters = useAtomValue(selectedFiltersAtom);
  const { isCategoriesLoading } = useCategories();

  const query = useInfiniteQuery<Image[], Error>({
    queryKey: ["images", selectedFilters],
    queryFn: ({ pageParam = 0 }) =>
      getImages({
        offset: pageParam as number,
        limit: ITEMS_PER_PAGE,
        tags: selectedFilters.tags ?? [],
        artists: selectedFilters.artists ?? [],
        characters: selectedFilters.characters ?? [],
        ratings: selectedFilters.age_ratings ?? [],
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === ITEMS_PER_PAGE
        ? allPages.length * ITEMS_PER_PAGE
        : undefined,
  });

  const { data, isError, isLoading } = query;

  const isUnavailable = isError || isLoading || isCategoriesLoading;

  return {
    ...query,
    images: data?.pages.flatMap((page) => page) ?? [],
    isUnavailable,
  };
}
