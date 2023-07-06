import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import type { Dayjs } from 'dayjs';
import type { Direction, ViewMode } from '@types';
import { useMessageBox, useSwiper, useDayjs } from '@/hooks';
import { getWeekStartDateIncluded, isMobile } from '@/utils';
import WeekHeader from './WeekHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import styles from './Calendar.module.scss';

interface CalendarProps {
  startDate: Dayjs;
  setStartDate: Dispatch<SetStateAction<Dayjs>>;
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

export default function Calendar({
  startDate,
  setStartDate,
  viewMode,
  setViewMode,
}: CalendarProps) {
  // const [startDate, setStartDate] = useDayjs();
  // const today = dayjs();
  // const startDate = today.subtract(today.day(), 'day');

  // const [startDate, setStartDate] = useWeekStartDayjs();
  // const [viewMode, setViewMode] = useState<ViewMode>('week');

  const [selectedDate, setSelectedDate] = useDayjs(null);

  useEffect(() => {
    setViewMode(selectedDate ? 'week' : 'day');
  }, [selectedDate]);

  const changeWeek = useCallback((direction: Direction) => {
    if (!direction || viewMode === 'month') return;

    const sign = direction === 'left' ? -1 : 1;
    const addOrSubtract = (prev: Dayjs) => prev.add(sign * 7, 'day');

    setStartDate(addOrSubtract);
    setSelectedDate(addOrSubtract);
  }, []);

  const changeMode = useCallback((direction: Direction) => {
    console.log('&&&', direction)
    if (!direction) return;
    
    if (viewMode === 'month' && direction === 'up') {
      setViewMode(selectedDate ? 'day' : 'week');
      setStartDate(getWeekStartDateIncluded(selectedDate));
    } else if ((viewMode === 'day' || viewMode === 'week') && direction === 'down') {
      setViewMode('month');
    }
  }, []);

  const { swiperTarget, velocity } = useSwiper<HTMLDivElement>({
    axis: 'xy',
    handler: {
      left: changeWeek,
      right: changeWeek,
      up: changeMode,
      down: changeMode
    },
    useKeyboard: true
    // useKeyboard: !isMobile(), // TODO: fix isMobile
  });

  // const [, pushMessage] = useMessageBox();

  const View = {
    week: WeekView,
    month: MonthView,
    day: WeekView,
  }[viewMode];

  return (
    <div className={styles.calendarWrap} ref={swiperTarget}>
      <WeekHeader />
      <View
        // startDate={startDate}
        // setStartDate={setStartDate}
        // viewMode={viewMode}
        // setViewMode={setViewMode}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        veolocity={velocity}
      />
    </div>
  );
}
