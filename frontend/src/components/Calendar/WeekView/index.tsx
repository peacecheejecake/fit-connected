import { useMemo, useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import cx from 'classnames';
import type { Dispatch, SetStateAction } from 'react';
import type { Dayjs } from 'dayjs';
import { createDatesForWeek, getWeekStartDateIncluded } from '@/utils';
import { useDayjs, useSwiper } from '@/hooks';
import type { Direction } from '@/hooks';
import type { PlaneVelocity, ViewMode } from '@types';
import { WeekViewDates } from './_components';
import styles from './WeekView.module.scss';

interface WeekViewDatesProps {
  // startDate: Dayjs;
  // setStartDate: Dispatch<SetStateAction<Dayjs>>;
  // viewMode: ViewMode;
  // setViewMode: Dispatch<SetStateAction<ViewMode>>;

  selectedDate: Dayjs;
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>;
  veolocity: PlaneVelocity;
}

export default function WeekView({
  // startDate,
  // setStartDate,
  // viewMode,
  // setViewMode,
  selectedDate,
  setSelectedDate,
  veolocity
}: WeekViewDatesProps) {
  // const [startDate, setStartDate] = useWeekStartDayjs();
  // const [selectedDate, setSelectedDate] = useDayjs(startDate);

  // useEffect(() => {
  //   setViewMode(selectedDate ? 'week' : 'day');
  // }, [selectedDate]);

  const startDate = useMemo(() => {
    const _targetDate = selectedDate ?? dayjs();
    return getWeekStartDateIncluded(_targetDate);
  }, [selectedDate]);

  const lastWeekDates = useMemo(
    () => createDatesForWeek(startDate.subtract(7, 'day')),
    [startDate]
  );
  const thisWeekDates = useMemo(() => createDatesForWeek(startDate), [startDate]);
  const nextWeekDates = useMemo(
    () => createDatesForWeek(startDate.add(7, 'day')),
    [startDate]
  );

  // const changeWeek = useCallback((direction: Direction) => {
  //   if (!direction) return;

  //   const sign = direction === 'left' ? -1 : 1;
  //   const changeOneWeek = (prev: Dayjs) => prev.add(sign * 7, 'day');

  //   setStartDate(changeOneWeek);
  //   setSelectedDate(changeOneWeek);
  // }, []);

  // const changeMode = useCallback((direction: Direction) => {
  //   console.log('&&&', direction)
  //   if (!direction) return;
    
  //   if (viewMode === 'month' && direction === 'up') {
  //     setViewMode(selectedDate ? 'day' : 'week');
  //     setStartDate(getWeekStartDateIncluded(selectedDate));
  //   } else if ((viewMode === 'day' || viewMode === 'week') && direction === 'down') {
  //     setViewMode('month');
  //   }
  // }, []);

  // const { swiperTarget, vx } = useSwiper<HTMLDivElement>({
  //   axis: 'xy',
  //   handler: {
  //     left: changeWeek,
  //     right: changeWeek,
  //     up: changeMode,
  //     down: changeMode
  //   },
  //   useKeyboard: true,
  // });

  const [vx] = veolocity;

  const direction = useMemo(() => {
    if (vx > 0) return 'next';
    if (vx < 0) return 'prev';
    return null;
  }, [vx]);

  return (
    <div
      className={cx(styles.weekWrapper, {
        [styles.paging]: direction,
        [styles.next]: vx > 0,
        [styles.prev]: vx < 0,
      })}
      // ref={swiperTarget}
    >
      {/* <button
        className={cx(styles.pagination, styles.prev)}
        onClick={goPrev}
        type='button'
      >
        prev
      </button> */}

      {/* {lastLastWeekDates && <WeekViewDates dates={lastLastWeekDates} />} */}

      <WeekViewDates dates={lastWeekDates} />
      <WeekViewDates
        dates={thisWeekDates}
        selectedDateState={[selectedDate, setSelectedDate]}
      />
      <WeekViewDates dates={nextWeekDates} />

      {/* {nextNextWeekDates && <WeekViewDates dates={nextNextWeekDates} />} */}

      {/* <button
        className={cx(styles.pagination, styles.next)}
        onClick={goNext}
        type='button'
      >
        next
      </button> */}
    </div>
  );
}
