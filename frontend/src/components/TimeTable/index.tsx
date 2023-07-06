// import type { SetStateAction, Dispatch } from 'react';
import type { Dayjs } from 'dayjs';
import type { ViewMode } from '@types';
import { createDatesForWeek } from '@/utils';
import DailyTimeTable from './DailyTimeTable';
import styles from './TimeTable.module.scss';

interface TimeTableProps {
  mode: ViewMode;
  startDate: Dayjs;
  // setStartDate: Dispatch<SetStateAction<Dayjs>>;
}

export default function TimeTable({mode, startDate}: TimeTableProps) {
  if (mode === 'day') return <DailyTimeTable date={startDate}/>

  const dates = createDatesForWeek(startDate);

  return (
    <div className={styles.timeTableWrap}>
      {dates.map((date) => (
        <DailyTimeTable date={date} key={`time-table-${date.toString()}`}/>
      ))}
    </div>
  )
}
