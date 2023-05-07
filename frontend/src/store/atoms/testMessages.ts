import { atom } from 'recoil';

const testMessagesAtom = atom<string[]>({
  key: '#testMessages',
  default: [],
});

export { testMessagesAtom };
