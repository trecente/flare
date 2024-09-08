import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { getImages } from "@/services/image-service";
import {
  selectedArtistsAtom,
  selectedCharactersAtom,
  selectedTagsAtom,
} from "@/store/filters";

const ITEMS_PER_PAGE = 30;

export function useImages() {
  const tags = useAtomValue(selectedTagsAtom);
  const artists = useAtomValue(selectedArtistsAtom);
  const characters = useAtomValue(selectedCharactersAtom);

  const query = useInfiniteQuery({
    queryKey: ["images", tags, artists, characters],
    queryFn: ({ pageParam = 0 }) =>
      getImages({
        offset: pageParam,
        limit: ITEMS_PER_PAGE,
        tags,
        artists,
        characters,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === ITEMS_PER_PAGE
        ? allPages.length * ITEMS_PER_PAGE
        : undefined,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    images: query.data?.pages.flatMap((page) => page) ?? [],
  };
}
