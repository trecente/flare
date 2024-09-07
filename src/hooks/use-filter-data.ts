import { useAtom } from "jotai";
import { useEffect } from "react";

import { getArtists, getCharacters, getTags } from "@/services/image-service";
import { artistsAtom, charactersAtom, tagsAtom } from "@/store/filters";

export function useFilterData() {
  const [tags, setTags] = useAtom(tagsAtom);
  const [artists, setArtists] = useAtom(artistsAtom);
  const [characters, setCharacters] = useAtom(charactersAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedTags, fetchedArtists, fetchedCharacters] =
          await Promise.all([getTags(), getArtists(), getCharacters()]);
        setTags(fetchedTags);
        setArtists(fetchedArtists);
        setCharacters(fetchedCharacters);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      }
    };

    fetchData();
  }, [setTags, setArtists, setCharacters]);

  return { tags, artists, characters };
}
