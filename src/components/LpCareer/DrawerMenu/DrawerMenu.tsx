'use client';

import React, { useEffect } from 'react';

import Image from 'next/image';

import { LP_CAREER_LOGO } from '@/constants/lpCareerAssets';
import { LP_CAREER_MENU_ITEMS } from '@/constants/lpCareerMenu';

import CtaButton from '../CtaButton/CtaButton';

import styles from './DrawerMenu.module.css';

// SP のドロワーメニュー(docs/spec/lp-career-sections/17-drawer.md)。
// 白いバーにロゴと閉じるボタン、紺の背景に枠線だけのメニュー 5 項目と CTA。

type Props = {
  lpHref?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function DrawerMenu({ isOpen, onClose, lpHref = '' }: Props) {
  // 開いている間は背面のスクロールを止める
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="lp-career-drawer"
      className={`${styles.DrawerMenu} ${isOpen ? styles.isOpen : ''}`}
      hidden={!isOpen}
    >
      <div className={styles.DrawerMenu__Bar}>
        <Image src={LP_CAREER_LOGO} alt="SiiD" width={80} height={20} />
        <button type="button" className={styles.DrawerMenu__Close} aria-label="メニューを閉じる" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="M3 3 L21 21 M21 3 L3 21" stroke="currentColor" strokeWidth="2.4" fill="none" />
          </svg>
        </button>
      </div>

      <nav className={styles.DrawerMenu__Nav} aria-label="セクション">
        <ul className={styles.DrawerMenu__List}>
          {LP_CAREER_MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={`${lpHref}${item.href}`} onClick={onClose}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <CtaButton href={`${lpHref}#counselling`} size="sp" className={styles.DrawerMenu__Cta} />
      </nav>
    </div>
  );
}
