'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import ContactButton from '@/components/ContactButton/ContactButton';
import Logo from '@/components/Logo/Logo';
import HamburgerMenu from '@/components/Navigation/HamburgerMenu/HamburgerMenu';
import Menu from '@/components/Navigation/Menu/Menu';
import { isConversionFocusedPage } from '@/constants/conversionFocusedPages';

import styles from './NavigationSp.module.css';

function NavigationSp() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const isConversionFocused = isConversionFocusedPage(pathname);

  // ルートレイアウト常駐で遷移してもアンマウントされないため、
  // ページが変わったらメニューを閉じる(戻る/進む操作もここで拾う)
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  // コンバージョン特化ページ(Issue #42)ではナビゲーション自体を出さない
  if (isConversionFocused) {
    return null;
  }

  return (
    <nav className={`${styles.NavigationSp} ${isActive ? styles.isActive : ''}`}>
      <div className={styles.NavigationSp__Container}>
        <div className={styles.NavigationSp__ContactButton}>
          <ContactButton />
        </div>
        <div>
          {/* 同一ページ内のアンカー遷移(例: /courses#plan-career)は pathname が変わらないため onNavigate でも閉じる */}
          <Menu onNavigate={() => setIsActive(false)} />
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
