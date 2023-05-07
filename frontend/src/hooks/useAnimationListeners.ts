import { useEffect } from 'react';

type AnimationListnerOptions = {
  start?: EventListener;
  end?: EventListener;
  deps?: any[]
};

const useAnimationListners = ({ start, end, deps }: AnimationListnerOptions) => {
  useEffect(() => {
    if (start) document.addEventListener('animationstart', start, false);
    if (end) document.addEventListener('animationend', end, false);

    return () => {
      if (start) document.removeEventListener('animationstart', start);
      if (end) document.removeEventListener('animationend', end);
    };
  }, deps ?? []);
};

export { useAnimationListners };
