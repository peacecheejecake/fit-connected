import { useRef, useState, useEffect } from 'react';
import type { UseSwiperProps, Direction } from './@types';

const SWIPE_DISTANCE_THRESHOLD = 32;

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
      touchStartX = event.touches[0].screenX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      
      if (isNaN(touchStartX)) return;
      
      const diffX = event.changedTouches[0].screenX - touchStartX;

      if (Math.abs(diffX) <= SWIPE_DISTANCE_THRESHOLD) {
        const {clientX, clientY} = event.changedTouches[0];
        const elementToClick = document.elementFromPoint(clientX, clientY);

        if (elementToClick instanceof HTMLElement) {
          elementToClick.click();
        }

        return;
      }
      
      if (diffX > SWIPE_DISTANCE_THRESHOLD) {
        setDirection('prev');
      }

      else if (diffX < SWIPE_DISTANCE_THRESHOLD) {
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
