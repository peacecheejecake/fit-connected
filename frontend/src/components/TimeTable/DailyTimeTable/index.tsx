import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import type { Dayjs } from 'dayjs';
import { fetchSchedule } from '@/worker';
import { NUM_BLOCKS_DAILY } from '../_constants';
import type { DailyTimeTableData, Reservation } from '@/pages/api/@types';
import TimeBlock from './_components/TimeBlock';
import styles from './DailyTimeTable.module.scss';

interface DailyTimeTableProps {
  date: Dayjs;
}

export default function DailyTimeTable({ date }: DailyTimeTableProps) {
  const formatSchedule = (data: DailyTimeTableData) => {
    const _schedule: Reservation[][] = [...Array(NUM_BLOCKS_DAILY)].fill([]);
    const { schedules } = data;

    if (!schedules) return [];

    schedules.forEach((schedule) => {
      if (!schedule) return;
      const { hour, reservations } = schedule;
      _schedule[hour] = reservations;
    });

    return _schedule;
  };

  const { data: _mockupData } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => fetchSchedule(date.format('YYYY-MM-DD')),
  });

  if (!_mockupData) return null;
  // const schedules = formatSchedule(_mockupData);

  return (
    <div className={styles.dailyTable}>
      {formatSchedule(_mockupData).map((reservations, idx) => (
        <TimeBlock selected={idx % 2 > 0} key={`time-block-${idx}`}>
          {reservations.map(({ type, name }, resIdx) => (
            <dl className={styles.schedule} key={`res-${idx}-${resIdx}`}>
              <dt className={cx(styles.typeIcon, styles[type])}></dt>
              <dd className={styles.name}>{name}</dd>
            </dl>
          ))}
        </TimeBlock>
      ))}
    </div>
  );
}
