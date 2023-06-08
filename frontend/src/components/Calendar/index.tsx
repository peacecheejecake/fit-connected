import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import type { Dayjs } from 'dayjs';
import { useMessageBox, useWeekStartDayjs } from '@/hooks';
import WeekHeader from './WeekHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import type { ViewMode } from './@types';
import styles from './Calendar.module.scss';

interface CalendarProps {
  startDate: Dayjs;
  setStartDate: Dispatch<SetStateAction<Dayjs>>;
}

export default function Calendar({ startDate, setStartDate }: CalendarProps) {
  // const [startDate, setStartDate] = useDayjs();
  // const today = dayjs();
  // const startDate = today.subtract(today.day(), 'day');

  // const [startDate, setStartDate] = useWeekStartDayjs();
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  const [, pushMessage] = useMessageBox();
  const wrapRef = useRef<HTMLDivElement>(null);

  const View = {
    week: WeekView,
    month: MonthView,
  }[viewMode];

  return (
    <div className={styles.calendarWrap} ref={wrapRef}>
      <WeekHeader />
      <View startDate={startDate} setStartDate={setStartDate}/>
    </div>
  );
}
