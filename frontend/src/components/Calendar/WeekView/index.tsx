import { useMemo, useState } from 'react';
import cx from 'classnames';
import type { Dayjs } from 'dayjs';
import { useDayjs, useWeekStartDayjs } from '@/hooks';
import { createDates } from './_worker';
import { WeekViewDates } from './_components';
import styles from './WeekView.module.scss';

interface WeekViewDatesProps {
  // startDate: Dayjs;
}

export default function WeekView({}: WeekViewDatesProps) {
  const [direction, setDirection] = useState<null | 'prev' | 'next'>(null);

  const [startDate, setStartDate] = useWeekStartDayjs();
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

  const [lastLastWeekDates, setLastLastWeekDates] = useState<null | Dayjs[]>(null);
  const [nextNextWeekDates, setNextNextWeekDates] = useState<null | Dayjs[]>(null);

  const handleClickPrev = () => {
    if (direction) return;

    setDirection('prev');
    setNextNextWeekDates(createDates(startDate.add(14, 'day')));
    setSelectedDate((prev) => prev.subtract(7, 'day'));
    
    setTimeout(() => {
      setStartDate((prev) => prev.subtract(7, 'day'));
      setDirection(null);
      setNextNextWeekDates(null);
    }, 300);
  };

  const handleClickNext = () => {
    if (direction) return;

    setDirection('next');
    setLastLastWeekDates(createDates(startDate.subtract(14, 'day')));
    setSelectedDate((prev) => prev.add(7, 'day'));
    
    setTimeout(() => {
      setStartDate((prev) => prev.add(7, 'day'));
      setDirection(null);
      setLastLastWeekDates(null);
    }, 300);
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
