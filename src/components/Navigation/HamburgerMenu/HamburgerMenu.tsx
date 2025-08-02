import React from 'react';

import styles from './HamburgerMenu.module.css';

function HamburgerMenu({ isActive }: { isActive: boolean }) {
  return (
    <div className={`${styles.HamburgerMenu} ${isActive ? styles.isActive : ''}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default HamburgerMenu;