import { atom } from 'recoil';

const testMessagesAtom = atom<string[]>({
  key: 'testMessagesAtom',
  default: [],
});

export { testMessagesAtom };
