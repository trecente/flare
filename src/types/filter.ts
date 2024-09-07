import { PrimitiveAtom } from "jotai";

export type FilterDropdownOption = {
  name: string;
  options: { id: number; name: string }[];
  atom: PrimitiveAtom<number[]>;
};
