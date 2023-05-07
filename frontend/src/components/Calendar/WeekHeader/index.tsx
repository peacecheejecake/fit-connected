import { weekLocaleMap } from './_constants';
import WeekHeaderButton from './_components/WeekHeaderButton';
import styles from './WeekHeader.module.scss';

interface WeekHeaderProps {}

export default function WeekHeader({}: WeekHeaderProps) {
  const weekdays = Object.values(weekLocaleMap).map(({ ko }) => ({
    title: ko,
    isHoliday: ko === '일',
  }));

  return (
    <div className={styles.weekHeader}>
      {weekdays.map((day) => (
        <WeekHeaderButton weekday={day} key={`week-${day.title}`} />
      ))}
    </div>
  );
}
