import cx from 'classnames';
import { randomColor } from '@/utils';
import styles from '../DailyTimeTable.module.scss';

interface TimeBlockProps extends React.PropsWithChildren {
  selected: boolean;
}

export default function TimeBlock({ selected, children }: TimeBlockProps) {
  return (
    <button
      type='button'
      className={cx(styles.timeBlock, { [styles.seleceted]: selected })}
      style={{ backgroundColor: randomColor() }}
    >
      {children}
    </button>
  );
}
