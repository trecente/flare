import { atom } from "jotai";

import { AgeRating } from "@/constants";

export const initialRatings: AgeRating[] = ["safe"];

export const ratingsAtom = atom<AgeRating[]>(initialRatings);
