import { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useMessageBox } from '@/hooks';
import WeekHeader from './WeekHeader';
import WeekViewDates from './WeekView';
import styles from './Calendar.module.scss';

interface CalendarProps {}

export default function Calendar({}: CalendarProps) {
  // const [startDate, setStartDate] = useDayjs();
  const today = dayjs();
  // const startDate = today.subtract(today.day(), 'day');

  const [, pushMessage] = useMessageBox();
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.calendarWrap} ref={wrapRef}>
      <WeekHeader />
      {/* <WeekViewDates startDate={startDate} /> */}
      <WeekViewDates />
    </div>
  );
}
