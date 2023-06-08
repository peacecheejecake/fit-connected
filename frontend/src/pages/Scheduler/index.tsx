import dayjs from 'dayjs';
import { useState } from 'react';
import { useWeekStartDayjs } from '@/hooks';
import Calendar from '@/components/Calendar';
import WeeklyTimeTable from '@/components/WeeklyTimeTable';
import styles from './Scheduler.module.scss';

interface SchedulerProps {}

export default function Scheduler({}: SchedulerProps) {
  const [startDate, setStartDate] = useWeekStartDayjs();

  return (
    <article className={styles.wrap}>
      <Calendar startDate={startDate} setStartDate={setStartDate} />
      <WeeklyTimeTable startDate={startDate} setStartDate={setStartDate} />
    </article>
  );
}
