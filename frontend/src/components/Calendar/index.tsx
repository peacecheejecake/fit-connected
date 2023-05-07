import cx from 'classnames';
import { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useDayjs } from '@/hooks';
import WeekHeader from './WeekHeader';
import WeekViewDates from './WeekView';
import styles from './Calendar.module.scss';

interface CalendarProps {}

export default function Calendar({}: CalendarProps) {
  // const [startDate, setStartDate] = useDayjs();
  const today = dayjs();
  // const startDate = today.subtract(today.day(), 'day');

  return (
    <div className={styles.calendarWrap}>
      <WeekHeader />
      {/* <WeekViewDates startDate={startDate} /> */}
      <WeekViewDates/>
    </div>
  );
}
