import { useMemo, useState, useReducer } from 'react';
import cx from 'classnames';
import type { Dayjs } from 'dayjs';
import { useDayjs, useWeekStartDayjs, useAnimationListners } from '@/hooks';
import { useWeekDates } from './_hooks';
import { createDates, getWeekStartDateIncluded } from './_worker';
import { WeekViewDates } from './_components';
import styles from './WeekView.module.scss';

interface WeekViewDatesProps {
  // startDate: Dayjs;
}

export default function WeekView({}: WeekViewDatesProps) {
  const [startDate, setStartDate] = useWeekStartDayjs();

  const lastWeekDates = useMemo(
    () => createDates(startDate.subtract(7, 'day')),
    [startDate]
  );
  const thisWeekDates = useMemo(() => createDates(startDate), [startDate]);
  const nextWeekDates = useMemo(
    () => createDates(startDate.add(7, 'day')),
    [startDate]
  );

  const [lastLastWeekDates, setLastLastWeekDates] = useState<null | Dayjs[]>(null);
  const [nextNextWeekDates, setNextNextWeekDates] = useState<null | Dayjs[]>(null);

  const [selectedDate, setSelectedDate] = useDayjs(startDate);

  const [direction, setDirection] = useState<null | 'prev' | 'next'>(null);

  const handleClickPrev = () => {
    if (direction) return;

    setDirection('prev');
    setNextNextWeekDates(createDates(startDate.add(14, 'day')));

    const newStartDate = startDate.subtract(7, 'day');
    setSelectedDate(newStartDate.add(selectedDate.day(), 'day'));

    setTimeout(() => {
      setDirection(null);
      setNextNextWeekDates(null);
      setStartDate(newStartDate);
    }, 1000);
  };

  const handleClickNext = () => {
    if (direction) return;

    setDirection('next');
    setLastLastWeekDates(createDates(startDate.subtract(14, 'day')));
    
    const newStartDate = startDate.add(7, 'day');
    setSelectedDate(newStartDate.add(selectedDate.day(), 'day'));

    setTimeout(() => {
      setDirection(null);
      setLastLastWeekDates(null);
      setStartDate(newStartDate);
    }, 1000);
  };

  return (
    <div
      className={cx(styles.weekWrapper, {
        [styles.paging]: direction,
        [styles.next]: direction === 'next',
        [styles.prev]: direction === 'prev',
      })}
    >
      <button
        className={cx(styles.pagination, styles.prev)}
        onClick={handleClickPrev}
        type='button'
      >
        prev
      </button>

      {lastLastWeekDates && <WeekViewDates dates={lastLastWeekDates} />}
      <WeekViewDates dates={lastWeekDates} />
      <WeekViewDates
        dates={thisWeekDates}
        selectedDateState={[selectedDate, setSelectedDate]}
      />
      <WeekViewDates dates={nextWeekDates} />
      {nextNextWeekDates && <WeekViewDates dates={nextNextWeekDates} />}

      <button
        className={cx(styles.pagination, styles.next)}
        onClick={handleClickNext}
        type='button'
      >
        next
      </button>
    </div>
  );
}
