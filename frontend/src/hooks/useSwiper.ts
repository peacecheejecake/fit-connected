import { useRef, useState, useEffect, useMemo } from 'react';
import { UseSwiperProps, PlaneVelocity, Direction } from './@types';

const THRES_DIST_X = 32;
const THRES_DIST_Y = 32;
const SPEED_ON_KEYPRESS = 32;

const getDirectionFromVelocity = ([vx, vy]: PlaneVelocity): Direction | undefined => {
  if (vx > 0) return 'right';
  if (vx < 0) return 'left';
  if (vy > 0) return 'down';
  if (vy < 0) return 'up';
};

const useSwiper = <T extends HTMLElement>({
  handler,
  axis = 'x',
  duration = 300,
  useKeyboard = false,
}: UseSwiperProps) => {
  const ref = useRef<T>(null);
  const [velocity, setVelocity] = useState<PlaneVelocity>([0, 0]);

  useEffect(() => {
    if (!ref?.current) return;

    let touchStartX: number;
    let touchStartY: number;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].screenX;
      touchStartY = event.touches[0].screenY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();

      let vx = 0;
      let vy = 0;

      const diffX = event.changedTouches[0].screenX - touchStartX;
      const diffY = event.changedTouches[0].screenY - touchStartY;
      const absDiffX = Math.abs(diffX);
      const absDiffY = Math.abs(diffY);

      switch (axis) {
        case 'xy':
          if (isNaN(diffX) || isNaN(diffY)) return;
          if (absDiffX >= THRES_DIST_X && absDiffY >= THRES_DIST_Y) {
            if (absDiffX > absDiffY) vx = -diffX;
            else vy = diffY;
          } else if (absDiffX >= THRES_DIST_X) {
            vx = -diffX;
          } else if (absDiffY >= THRES_DIST_Y) {
            vy = diffY;
          }
          break;
        case 'x':
          if (isNaN(diffX)) return;
          if (absDiffX >= THRES_DIST_X) vx = -diffX;
          break;
        case 'y':
          if (isNaN(diffY)) return;
          if (absDiffY >= THRES_DIST_Y) vy = diffY;
          break;
      }

      const isMoving = vx !== 0 || vy !== 0;

      if (!isMoving) {
        const { clientX, clientY } = event.changedTouches[0];
        const elementToClick = document.elementFromPoint(clientX, clientY);

        if (elementToClick instanceof HTMLElement) {
          elementToClick.click();
        }
        return;
      }

      setVelocity([vx, vy]);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

      const { key } = event;

      const isHoriontalKey = key === 'ArrowLeft' || key === 'ArrowRight';
      const isVerticalKey = key === 'ArrowDown' || key === 'ArrowUp';

      if (
        (!isHoriontalKey && !isVerticalKey) ||
        (axis === 'x' && isVerticalKey) ||
        (axis === 'y' && isHoriontalKey)
      ) {
        return;
      }

      const _velocityHandler = {
        ArrowLeft: ([, vy]: PlaneVelocity): PlaneVelocity => [-SPEED_ON_KEYPRESS, vy],
        ArrowRight: ([, vy]: PlaneVelocity): PlaneVelocity => [SPEED_ON_KEYPRESS, vy],
        // ArrowUp: ([vx]: PlaneVelocity): PlaneVelocity => [vx, -SPEED_ON_KEYPRESS],
        // ArrowDown: ([vx]: PlaneVelocity): PlaneVelocity => [vx, SPEED_ON_KEYPRESS],
        ArrowUp: (prev: PlaneVelocity): PlaneVelocity => prev,
        ArrowDown: (prev: PlaneVelocity): PlaneVelocity => prev,
      }[key];

      setVelocity(_velocityHandler);
    };

    ref.current.addEventListener('touchstart', handleTouchStart, false);
    ref.current.addEventListener('touchend', handleTouchEnd, false);
    useKeyboard && window.addEventListener('keydown', handleKeyDown);

    return () => {
      ref.current?.removeEventListener('touchend', handleTouchEnd);
      ref.current?.removeEventListener('touchstart', handleTouchStart);
      useKeyboard && window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const direction = getDirectionFromVelocity(velocity);

    if (!direction) return;

    setTimeout(() => {
      setVelocity([0, 0]);

      const _handler = typeof handler === 'object' ? handler[direction] : handler;
      _handler && _handler(direction);
    }, duration);
  }, [velocity]);

  return { swiperTarget: ref, velocity, vx: velocity[0], vy: velocity[1] };
};

export { useSwiper };
