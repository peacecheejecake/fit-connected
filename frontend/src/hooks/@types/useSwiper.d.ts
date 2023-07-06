type Axis = 'x' | 'y' | 'xy';

type HorizontalDirection = null | 'left' | 'right';
type VerticalDirection = null | 'up' | 'down';

type PlaneDirection = HorizontalDirection | VerticalDirection;
type Direction = HorizontalDirection | VerticalDirection | PlaneDirection;
// type Direction<T extends Axis> = T extends 'horizontal'
//   ? HorizontalDirection
//   : T extends 'vertical'
//   ? VerticalDirection
//   : PlaneDirection;

type HorizontalVelocity = number;
type VerticalVelocity = number;
type PlaneVelocity = [number, number];
type Velocity = HorizontalVelocity | VerticalVelocity | PlaneVelocity;

type SwipeHandler = (direction: Direction) => void;

// type HorizontalSwipeHandlers = {
//   [direction in HorizontalDirection]?: SwipeHandler;
// };
// type VerticalSwipeHandlers = {
//   [direction in VerticalDirection]?: SwipeHandler;
// };
// type PlaneSwipeHandlers = {
//   [direction in PlaneDirection]?: SwipeHandler;
// };

type DirectionalSwipeHandlers = {
  left?: SwipeHandler;
  right?: SwipeHandler;
  up?: SwipeHandler;
  down?: SwipeHandler;
};

type SwipeHandlerPropType =
  | SwipeHandler
  | DirectionalSwipeHandlers;

interface UseSwiperProps {
  axis?: Axis;
  handler?: SwipeHandlerPropType;
  duration?: number;
  useKeyboard?: boolean;
}

export type {
  UseSwiperProps,
  Axis,
  HorizontalDirection,
  VerticalDirection,
  PlaneDirection,
  Direction,
  HorizontalVelocity,
  VerticalVelocity,
  PlaneVelocity,
  Velocity,
  SwipeHandler,
  // HorizontalSwipeHandlers,
  // VerticalSwipeHandlers,
  // PlaneSwipeHandlers,
  DirectionalSwipeHandlers,
  SwipeHandlerPropType,
};
