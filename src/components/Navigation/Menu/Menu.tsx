import React from 'react';

import Link from 'next/link';


import { menuItems } from '@/constants/menuItems';
import { snsItems } from '@/constants/snsItems';

import styles from './Menu.module.css';

type Props = {
  modifierClass?: string;
  /** メニュー内のページリンクを押したときに呼ばれる(SP のハンバーガーメニューを閉じる用途) */
  onNavigate?: () => void;
};

export default function Menu({ modifierClass, onNavigate }: Props) {
  return (
    <div className={`${styles.Menu} ${modifierClass}`}>
      <ul className={styles.Menu__MainList}>
        {menuItems.map((item, index) => (
          <li className={styles.Menu__MainItem} key={index}>
            {item.comingSoon ? (
              <span className={styles.Menu__DisabledLink}>
                <span className={styles.Menu__En}>{item.nameEN}</span>
                <span className={styles.Menu__Ja}>{item.nameJP}（coming soon）</span>
                <span className={styles.Menu__Bar} />
              </span>
            ) : (
              <Link href={item.url} onClick={onNavigate}>
                <span className={styles.Menu__En}>{item.nameEN}</span>
                <span className={styles.Menu__Ja}>{item.nameJP}</span>
                <span className={styles.Menu__Bar} />
              </Link>
            )}
            {item.subItems && item.subItems.length > 0 && (
              <ul className={styles.Menu__SubList}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className={styles.Menu__SubItem}>
                    <Link href={subItem.url} onClick={onNavigate}>
                      <svg width="7" height="5">
                        <use href="#smallArrow" />
                      </svg>
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul className={styles.Menu__SnsList}>
        {snsItems.map((snsItem, index) => (
          <li key={index} className={styles.Menu__SnsItem}>
            <Link href={snsItem.url} target="_blank" rel="noopener noreferrer">
              <svg width={snsItem.width} height={snsItem.height}>
                <use href={`#${snsItem.icon}`} />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
