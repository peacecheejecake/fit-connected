import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import type { Dayjs } from 'dayjs';
import type { PlaneVelocity } from '@types';
import { useDayjs } from '@/hooks';
import { getWeekStartDateIncluded, createWeeksForMonth } from '@/utils';
import { WeekViewDates } from '../WeekView/_components';
import styles from './MonthView.module.scss';

interface MonthViewProps {
  // startDate: Dayjs;
  // setStartDate: Dispatch<SetStateAction<Dayjs>>;
  // viewMode: ViewMode;
  // setViewMode: Dispatch<SetStateAction<ViewMode>>;

  selectedDate: Dayjs;
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>;
  veolocity: PlaneVelocity;
}

export default function MonthViewProps({
  selectedDate,
  setSelectedDate,
  veolocity,
}: MonthViewProps) {
  const startDateOfFirstWeek = useMemo(() => {
    const _targetDate = selectedDate ?? dayjs();
    return getWeekStartDateIncluded(_targetDate);
  }, [selectedDate]);

  // const startDateOfLastWeek = useMemo(() => {
  //   const year =
  //     startDateOfFirstWeek.year() + Number(startDateOfFirstWeek.month() === 11);
  //   const month =
  //     startDateOfFirstWeek.month() + Number(startDateOfFirstWeek.date() > 1);

  //   return getWeekStartDateIncluded(
  //     dayjs()
  //       .set('year', year)
  //       .set('month', month + 1)
  //       .set('date', 1)
  //       .subtract(1, 'day')
  //   );
  // }, [startDateOfFirstWeek]);

  const weeks = useMemo(
    () => createWeeksForMonth(startDateOfFirstWeek),
    [startDateOfFirstWeek]
  );

  return (
    <div className={styles.monthWrapper}>
      {weeks.map((week, idx) => (
        <WeekViewDates 
          dates={week} key={`month-view-week-${idx}`}
          selectedDateState={[selectedDate, setSelectedDate]}
        />
      ))}
    </div>
  );
}
