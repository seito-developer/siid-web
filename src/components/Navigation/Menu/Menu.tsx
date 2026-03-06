import React from 'react';

import Link from 'next/link';

import TransitionLink from '@/components/TransitionLink/TransitionLink';
import { menuItems } from '@/constants/menuItems';
import { snsItems } from '@/constants/snsItems';

import styles from './Menu.module.css';

export default function Menu({ modifierClass }: { modifierClass?: string }) {
  return (
    <div className={`${styles.Menu} ${modifierClass}`}>
      <ul className={styles.Menu__MainList}>
        {menuItems.map((item, index) => (
          <li className={styles.Menu__MainItem} key={index}>
            <TransitionLink href={item.url}>
              <span className={styles.Menu__En}>{item.nameEN}</span>
              <span className={styles.Menu__Ja}>{item.nameJP}</span>
              <span className={styles.Menu__Bar} />
            </TransitionLink>
            {item.subItems && item.subItems.length > 0 && (
              <ul className={styles.Menu__SubList}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className={styles.Menu__SubItem}>
                    <TransitionLink href={subItem.url}>
                      <svg width="7" height="5">
                        <use href="#smallArrow" />
                      </svg>
                      {subItem.name}
                    </TransitionLink>
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
            <Link href={snsItem.url} target="_blank">
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
