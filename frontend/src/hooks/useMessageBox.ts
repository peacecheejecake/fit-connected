import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import type { SetterOrUpdater } from 'recoil';
import { testMessagesAtom } from '@/store';

const useMessageBox = (): [
  string[],
  (message: any) => void
] => {
  const [testMessages, setTestMessages] = useRecoilState(testMessagesAtom);

  const pushTestMessage = (message: any) => {
    setTestMessages((prev) => [...prev, JSON.stringify(message)]);
  };

  useEffect(() => {
    setTimeout(() => {
      setTestMessages((prev) => prev.slice(1));
    }, 3000);
  }, [testMessages]);

  return [testMessages, pushTestMessage];
};

export { useMessageBox };
