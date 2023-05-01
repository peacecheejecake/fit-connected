import Calendar from '@/components/Calendar';
import styles from './Scheduler.module.scss';

interface SchedulerProps {}

export default function Scheduler({}: SchedulerProps) {
  return (
    <article className={styles.wrap}>
      <Calendar />
    </article>
  );
}
