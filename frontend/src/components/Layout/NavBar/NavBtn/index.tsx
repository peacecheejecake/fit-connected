import cx from 'classnames';
import type { NavBarItem } from '@/contents/navigation';
import styles from './NavBtn.module.scss';

export default function NavBtn({ item, selectedIdxState }: NavBtnProps) {
  const { idx, Icon, title } = item;
  const [selectedIdx, setSelectedIdx] = selectedIdxState;
  const handleClickBtn: React.PointerEventHandler<HTMLButtonElement> = () => {
    setSelectedIdx(idx);
  };

  return (
    <button
      type='button'
      className={cx(styles.navBtn, { [styles.selected]: selectedIdx === idx })}
      onClick={handleClickBtn}
    >
      <Icon />
      <span className={styles.title}>{title}</span>
    </button>
  );
}

interface NavBtnProps {
  item: NavBarItem;
  selectedIdxState: [number, React.Dispatch<React.SetStateAction<number>>];
}

// extends React.ButtonHTMLAttributes<HTMLButtonElement>