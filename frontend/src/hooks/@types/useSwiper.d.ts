type Direction = null | 'prev' | 'next';
type SwipeHandler = (direction: Direction) => void;
type SwipeSeparateHandler = { prev?: SwipeHandler; next?: SwipeHandler };
type SwipeHandlerPropType = SwipeHandler | SwipeSeparateHandler;

interface UseSwiperProps {
  handler?: SwipeHandlerPropType;
  duration?: number;
}

export type {
  UseSwiperProps,
  Direction,
  SwipeHandler,
  SwipeSeparateHandler,
  SwipeCommonHandler,
};
