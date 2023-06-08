import { useMemo, useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import type { Dispatch, SetStateAction } from 'react';
import type { Dayjs } from 'dayjs';
import { createDates } from '@/worker';
import { useDayjs, useSwiper } from '@/hooks';
import type { Direction } from '@/hooks';
import { WeekViewDates } from './_components';
import styles from './WeekView.module.scss';

interface WeekViewDatesProps {
  startDate: Dayjs;
  setStartDate: Dispatch<SetStateAction<Dayjs>>;
}

export default function WeekView({ startDate, setStartDate }: WeekViewDatesProps) {
  // const [startDate, setStartDate] = useWeekStartDayjs();
  const [selectedDate, setSelectedDate] = useDayjs(startDate);

  const lastWeekDates = useMemo(
    () => createDates(startDate.subtract(7, 'day')),
    [startDate]
  );
  const thisWeekDates = useMemo(() => createDates(startDate), [startDate]);
  const nextWeekDates = useMemo(
    () => createDates(startDate.add(7, 'day')),
    [startDate]
  );

  const go = (direction: Direction) => {
    if (!direction) return;

    const sign = direction === 'prev' ? -1 : 1;
    const changeOneWeek = (prev: Dayjs) => prev.add(sign * 7, 'day');

    setStartDate(changeOneWeek);
    setSelectedDate(changeOneWeek);
  };

  const { swiperTarget, direction } = useSwiper<HTMLDivElement>({ handler: go });

  return (
    <div
      className={cx(styles.weekWrapper, {
        [styles.paging]: direction,
        [styles.next]: direction === 'next',
        [styles.prev]: direction === 'prev',
      })}
      ref={swiperTarget}
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
