'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { LP2_LOGO } from '@/constants/lp2Assets';
import { LP2_MENU_ITEMS } from '@/constants/lp2Menu';

import CtaButton from '../CtaButton/CtaButton';
import DrawerMenu from '../DrawerMenu/DrawerMenu';

import styles from './Header.module.css';

// 固定ヘッダー。PC と SP でデザインが大きく異なる(docs/spec/lp2-sections/01-header.md)。
//
//   PC: 薄いグレーの帯にロゴ・アンカーメニュー 5 項目・CTA ボタン
//   SP: 紺の帯に「AI × PROGRAMMING × CAREER」のタグライン
//
// SP のハンバーガーはカンプに描かれていないが、ドロワー(sp12_menu.psd)を開く導線が
// 他に無いため追加している。

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.Header__Pc}>
          <a href="#top" className={styles.Header__Logo} aria-label="SiiD">
            <Image src={LP2_LOGO} alt="SiiD" width={125} height={31} priority />
          </a>
          <nav className={styles.Header__Nav} aria-label="セクション">
            <ul className={styles.Header__Menu}>
              {LP2_MENU_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <CtaButton className={styles.Header__Cta} />
        </div>

        <div className={styles.Header__Sp}>
          <span className={styles.Header__Tagline}>AI × PROGRAMMING × CAREER</span>
          <button
            type="button"
            className={styles.Header__Burger}
            aria-label="メニューを開く"
            aria-expanded={isOpen}
            aria-controls="lp2-drawer"
            onClick={() => setIsOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <DrawerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
