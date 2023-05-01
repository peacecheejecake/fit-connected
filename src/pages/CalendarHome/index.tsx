import Calendar from '@/components/Calendar';
import styles from './CalendarHome.module.scss';

interface CalendarHomeProps {}

export default function CalendarHome({}: CalendarHomeProps) {
  return (
    <article className={styles.wrap}>
      <Calendar />
    </article>
  );
}
