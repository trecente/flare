import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { getImages } from "@/services/image-service";
import { isNsfwAtom } from "@/store/settings";

const ITEMS_PER_PAGE = 30;

export function useImages() {
  const [isNsfw] = useAtom(isNsfwAtom);

  const query = useInfiniteQuery({
    queryKey: ["images", isNsfw],
    queryFn: ({ pageParam = 0 }) =>
      getImages({
        offset: pageParam,
        limit: ITEMS_PER_PAGE,
        isNsfw,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === ITEMS_PER_PAGE
        ? allPages.length * ITEMS_PER_PAGE
        : undefined,
    refetchOnWindowFocus: false,
  });

  const images = query.data?.pages.flatMap((page) => page) ?? [];

  return {
    ...query,
    images,
  };
}
