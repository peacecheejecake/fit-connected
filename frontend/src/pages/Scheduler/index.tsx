import dayjs from 'dayjs';
import { useState } from 'react';
import { useWeekStartDayjs } from '@/hooks';
import Calendar from '@/components/Calendar';
import TimeTable from '@/components/TimeTable';
import type { ViewMode } from '@types';
import styles from './Scheduler.module.scss';

interface SchedulerProps {}

export default function Scheduler({}: SchedulerProps) {
  // const [startDate, setStartDate] = useWeekStartDayjs();
  const [startDate, setStartDate] = useWeekStartDayjs();
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  const Contents = (): JSX.Element | null => {
    if (viewMode === 'month') return null;
    return <TimeTable mode={viewMode} startDate={startDate} />;
  };

  return (
    <article className={styles.wrap}>
      <Calendar
        startDate={startDate}
        setStartDate={setStartDate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <Contents />
    </article>
  );
}
