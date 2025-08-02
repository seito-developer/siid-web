import React from 'react';

import Logo from '@/components/Logo/Logo';

import Menu from '../Menu/Menu';

import styles from './NavigationPc.module.css';

export default function NavigationPc() {
  return (
    <nav className={styles.NavigationPc}>
      <div className={styles.NavigationPc__Container}>
        <Logo />
        <Menu />
      </div>
    </nav>
  );
}