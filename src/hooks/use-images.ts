"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { getImages } from "@/services/image-service";
import { ratingsAtom } from "@/store";

const ITEMS_PER_PAGE = 30;

export function useImages() {
  const ratings = useAtomValue(ratingsAtom);

  const query = useInfiniteQuery({
    queryKey: ["images", ratings],
    queryFn: ({ pageParam = 0 }) =>
      getImages({
        offset: pageParam as number,
        limit: ITEMS_PER_PAGE,
        ratings,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === ITEMS_PER_PAGE
        ? allPages.length * ITEMS_PER_PAGE
        : undefined,
  });

  return {
    ...query,
    images: query.data?.pages.flatMap((page) => page) ?? [],
    isUnavailable: query.isError || query.isLoading,
  };
}
