import cx from 'classnames';
import styles from '../TimeTableDaily.module.scss';

interface TimeBlockProps extends React.PropsWithChildren {
  selected: boolean;
}

export default function TimeBlock({ selected, children }: TimeBlockProps) {
  return (
    <button
      type='button'
      className={cx(styles.timeBlock, { [styles.seleceted]: selected })}
    >
      {children}
    </button>
  );
}
