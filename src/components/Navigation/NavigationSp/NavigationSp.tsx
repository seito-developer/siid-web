'use client';

import React, { useState } from 'react';

import { usePathname } from 'next/navigation';

import ContactButton from '@/components/ContactButton/ContactButton';
import Logo from '@/components/Logo/Logo';
import HamburgerMenu from '@/components/Navigation/HamburgerMenu/HamburgerMenu';
import Menu from '@/components/Navigation/Menu/Menu';
import { isConversionFocusedPage } from '@/constants/conversionFocusedPages';

import styles from './NavigationSp.module.css';

function NavigationSp() {
  const [isActive, setIsActive] = useState(false);
  const isConversionFocused = isConversionFocusedPage(usePathname());

  if (isConversionFocused) {
    return (
      <nav className={styles.NavigationSp}>
        <div className={styles.NavigationSp__ButtonContainer}>
          <div className={`${styles.NavigationSp__Button} ${styles.isLogoOnly}`}>
            <div className={styles.NavigationSp__Item}>
              <Logo />
            </div>
          </div>
        </div>
        <div className={styles.NavigationSp__ButtonBack} />
      </nav>
    );
  }

  return (
    <nav className={`${styles.NavigationSp} ${isActive ? styles.isActive : ''}`}>
      <div className={styles.NavigationSp__Container}>
        <div className={styles.NavigationSp__ContactButton}>
          <ContactButton />
        </div>
        <div>
          <Menu />
        </div>
      </div>
      <div className={styles.NavigationSp__ButtonContainer}>
        <button
          type="button"
          className={styles.NavigationSp__Button}
          onClick={() => setIsActive(!isActive)}
        >
          <div className={styles.NavigationSp__Item}>
            <Logo />
          </div>
          <div className={styles.NavigationSp__Item}>
            <HamburgerMenu isActive={isActive} />
          </div>
        </button>
      </div>
      <div className={styles.NavigationSp__ButtonBack} />
      <div
        className={styles.NavigationSp__Closer}
        onClick={() => setIsActive(false)}
      />
    </nav>
  );
}

export default NavigationSp;
