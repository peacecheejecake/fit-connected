import type { PropsWithChildren } from 'react';
import styles from './Header.module.scss';

type HeaderProps = PropsWithChildren<{}>;

export default function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Logo</h1>
    </header>
  );
}
