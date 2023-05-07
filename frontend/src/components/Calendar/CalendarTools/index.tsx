import styles from './CalendarTools.module.scss';

interface CalendarToolsProps {}

export default function CalendarTools({}: CalendarToolsProps) {
  return (
    <div className={styles.tools}>
      <button type="button">prev</button>
      <button type="button">next</button>
    </div>
  )
}