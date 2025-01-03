import { selector } from "recoil";
import { counterAtom } from "../atoms/counterAtom";

export const counterSelector = selector({
  key: 'isEvenSelector',
  get: ({ get }) => {
    const currentCount = get(counterAtom);
    return currentCount % 2 === 0;
  },
});