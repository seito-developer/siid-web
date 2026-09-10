'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { LP_CAREER_LOGO } from '@/constants/lpCareerAssets';
import { LP_CAREER_MENU_ITEMS } from '@/constants/lpCareerMenu';

import CtaButton from '../CtaButton/CtaButton';
import DrawerMenu from '../DrawerMenu/DrawerMenu';

import styles from './Header.module.css';

// 固定ヘッダー。PC と SP でデザインが大きく異なる(docs/spec/lp-career-sections/01-header.md)。
//
//   PC: 薄いグレーの帯にロゴ・アンカーメニュー 5 項目・CTA ボタン
//   SP: 紺の帯に「AI × PROGRAMMING × CAREER」のタグライン
//
// SP のハンバーガーはカンプに描かれていないが、ドロワー(sp12_menu.psd)を開く導線が
// 他に無いため追加している。

export default function Header({ lpHref = '' }: { lpHref?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.Header}>
        <div className={styles.Header__Pc}>
          <a href={`${lpHref}#top`} className={styles.Header__Logo} aria-label="SiiD">
            <Image src={LP_CAREER_LOGO} alt="SiiD" width={125} height={31} priority />
          </a>
          <nav className={styles.Header__Nav} aria-label="セクション">
            <ul className={styles.Header__Menu}>
              {LP_CAREER_MENU_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={`${lpHref}${item.href}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <CtaButton href={`${lpHref}#counselling`} className={styles.Header__Cta} />
        </div>

        <div className={styles.Header__Sp}>
          <span className={styles.Header__Tagline}>AI × PROGRAMMING × CAREER</span>
          <button
            type="button"
            className={styles.Header__Burger}
            aria-label="メニューを開く"
            aria-expanded={isOpen}
            aria-controls="lp-career-drawer"
            onClick={() => setIsOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <DrawerMenu lpHref={lpHref} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
