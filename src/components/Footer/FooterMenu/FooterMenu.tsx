import React from 'react';

import Link from 'next/link';

import Logo from '@/components/Logo/Logo';
import { footerExtraMenuItems, footerOtherLinks, menuItems } from '@/constants/menuItems';
import { snsFooterItems } from '@/constants/snsItems';

import styles from './FooterMenu.module.css';


export default function FooterMenu({ copyrightOnly = false }: { copyrightOnly?: boolean }) {
  const copyright = (
    <small className={`${styles.FooterMenu__Copyright} ${copyrightOnly ? styles.isStatic : ''}`}>
             &copy; BugFix LLC. All rights reserved.
    </small>
  );

  // コンバージョン特化ページ(Issue #42)ではリンク要素をすべて出さない
  if (copyrightOnly) {
    return <div className={styles.FooterMenu}>{copyright}</div>;
  }

  return (
    <div className={styles.FooterMenu}>
      <div className={styles.FooterMenu__Landmark}>
        <Logo width={134} height={34} fill='#fff' />
        <ul className={styles.FooterMenu__SnsList}>
          {snsFooterItems.map((snsItem, index) => (
            <li key={index} className={styles.FooterMenu__SnsItem}>
              <Link href={snsItem.url} target="_blank" rel="noopener noreferrer" aria-label={`${snsItem.name}（別タブで開く）`}>
                <svg width={snsItem.width} height={snsItem.height} aria-hidden="true">
                  <use href={`#${snsItem.icon}`} />
                </svg>
              </Link> 
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles.FooterMenu__MainList}>
        {menuItems.map((item, index) => (
          <li className={styles.FooterMenu__MainItem} key={index}>
            {item.comingSoon ? (
              <span className={styles.FooterMenu__DisabledLink}>
                <span className={styles.FooterMenu__Ja}>{item.nameJP}（coming soon）</span>
              </span>
            ) : (
              <Link href={item.url}>
                <span className={styles.FooterMenu__Ja}>{item.nameJP}</span>
              </Link>
            )}
            {item.subItems && item.subItems.length > 0 && (
              <ul className={styles.FooterMenu__SubList}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className={styles.FooterMenu__SubItem}>
                    <Link href={subItem.url}>
                      <svg width="7" height="5">
                        <use href="#smallArrowWhite" />
                      </svg>
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {/* フッターだけの項目(資料請求・LINE 登録)。PC ではグリッドの 3 列目に置く(Issue #131) */}
        {footerExtraMenuItems.map((item) => (
          <li className={styles.FooterMenu__MainItem} key={item.url}>
            <Link href={item.url}>
              <span className={styles.FooterMenu__Ja}>{item.nameJP}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.FooterMenu__OtherLinks}>
        {footerOtherLinks.map((link) => (
          <li key={link.url} className={styles.FooterMenu__OtherLinkItem}>
            {link.external ? (
              <Link href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</Link>
            ) : (
              <Link href={link.url}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>
      {copyright}
    </div>
  );
}

