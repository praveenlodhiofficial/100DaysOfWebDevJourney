import { atom } from 'recoil';

export const counterAtom = atom({
    key: 'countState',
    default: 0,
  });