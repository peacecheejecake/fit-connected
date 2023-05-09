import cx from 'classnames';
import type { PropsWithChildren } from 'react';
import { useMessageBox } from '@/hooks';
import Header from './Header';
import NavBar from './NavBar';
import styles from './Layout.module.scss';

type LayoutProps = PropsWithChildren<{}>;

export default function Layout({ children }: LayoutProps) {
  const [testMessages] = useMessageBox();

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <NavBar />
      <div className={styles.testMessages}>
        {testMessages.map((message, idx) => (
          <span className={styles.message} key={`test-message-${idx}`}>
            {message}
          </span>
        ))}
      </div>
    </>
  );
}
