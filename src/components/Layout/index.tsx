import cx from 'classnames';
import type { PropsWithChildren } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import styles from './Layout.module.scss';

type LayoutProps = PropsWithChildren<{
  
}>

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
      <NavBar/>
      <main>
        {children}
      </main>
    </>
  )
}