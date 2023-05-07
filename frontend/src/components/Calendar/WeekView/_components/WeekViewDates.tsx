import type { Dayjs } from 'dayjs';
import WeekViewDateButton from './WeekViewDateButton';
import styles from '../WeekView.module.scss';

interface WeekViewDatesProps {
  dates: Dayjs[];
  selectedDateState?: [Dayjs, React.Dispatch<React.SetStateAction<Dayjs>>];
}

export default function WeekViewDates({
  dates,
  selectedDateState,
}: WeekViewDatesProps) {
  return (
    <div className={styles.week}>
      {dates.map((date, idx) => (
        <WeekViewDateButton
          date={date}
          isHoliday={idx === 0}
          selectedDateState={selectedDateState}
          key={`week-date-${date}`}
        />
      ))}
    </div>
  );
}
