import { useRef, useState, useEffect } from 'react';
import type { UseSwiperProps, Direction, SwipeHandler } from './@types';

const useSwiper = <T extends HTMLElement>({
  handler,
  duration = 300,
}: UseSwiperProps) => {
  const ref = useRef<T>(null);

  const [direction, setDirection] = useState<Direction>(null);

  useEffect(() => {
    if (!ref?.current) return;

    let touchStartX: number;

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();

      touchStartX = event.touches[0].screenX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();

      if (isNaN(touchStartX)) return;

      const diffX = event.changedTouches[0].screenX - touchStartX;

      if (diffX > 52) {
        setDirection('prev');
      }

      if (diffX < -52) {
        setDirection('next');
      }
    };

    ref.current.addEventListener('touchstart', handleTouchStart, false);
    ref.current.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      ref.current?.removeEventListener('touchstart', handleTouchStart);
      ref.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (!direction) return;

    setTimeout(() => {
      setDirection(null);

      const _handler = typeof handler === 'object' ? handler[direction] : handler;
      _handler && _handler(direction);
    }, duration);

  }, [direction]);

  return { swiperTarget: ref, direction, setDirection };
};

export { useSwiper };
