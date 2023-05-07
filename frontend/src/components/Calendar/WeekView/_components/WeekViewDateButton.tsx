import { useMemo } from 'react';
import type { Dayjs } from 'dayjs';
import cx from 'classnames';
import styles from '../WeekView.module.scss';

interface WeekViewDateButtonProps {
  date: Dayjs;
  isHoliday?: boolean;
  selectedDateState?: [Dayjs, React.Dispatch<React.SetStateAction<Dayjs>>];
}
export default function WeekViewDateButton({
  date,
  isHoliday,
  selectedDateState,
}: WeekViewDateButtonProps) {
  if (!selectedDateState) {
    return (
      <button type='button' className={cx(styles.date)}>
        <span className={cx(styles.text, { [styles.holiday]: isHoliday })}>
          {date.date()}
        </span>
      </button>
    );
  }

  const [selectedDate, setSelectedDate] = selectedDateState;
  const isSelected = useMemo(() => date.isSame(selectedDate), [selectedDate]);

  const handleClickText = () => {
    setSelectedDate(date);
  };

  return (
    <button type='button' className={cx(styles.date)}>
      <span
        className={cx(styles.text, {
          [styles.holiday]: isHoliday,
          [styles.selected]: isSelected,
        })}
        onClick={handleClickText}
      >
        {date.date()}
      </span>
    </button>
  );
}
