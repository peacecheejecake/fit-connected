import cx from 'classnames';
import styles from '../WeekHeader.module.scss';

export interface Weekday {
  title: string; // todo: typing
  isHoliday: boolean;
}

interface WeekHeaderButton {
  weekday: Weekday;
}

export default function WeekHeaderButton({ weekday }: WeekHeaderButton) {
  const {title, isHoliday} = weekday;
  return (
    <button
      type='button'
      className={cx(styles.week, { [styles.holiday]: isHoliday })}
    >
      {title}
    </button>
  );
}
