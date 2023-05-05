import { useState } from 'react';
import { navBarItems } from '@/contents/navigation';
import NavBtn from './NavBtn';
import styles from './NavBar.module.scss';

interface NavBarProps {}

const INITIAL_IDX = 0;

export default function NavBar({}: NavBarProps) {
  const selectedIdxState = useState(INITIAL_IDX);

  return (
    <nav className={styles.navBar}>
      {navBarItems.map((item) => (
        <NavBtn
          item={item}
          selectedIdxState={selectedIdxState}
          key={`nav-btn-${item.idx}`}
        />
      ))}
    </nav>
  );
}
