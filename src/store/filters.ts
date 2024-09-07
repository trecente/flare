import { atom } from "jotai";

import { Artist, Character, Tag } from "@/types/image";

export const tagsAtom = atom<Tag[]>([]);
export const selectedTagsAtom = atom<number[]>([]);

export const artistsAtom = atom<Artist[]>([]);
export const selectedArtistsAtom = atom<number[]>([]);

export const charactersAtom = atom<Character[]>([]);
export const selectedCharactersAtom = atom<number[]>([]);
