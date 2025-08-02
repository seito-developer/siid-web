import Link from 'next/link'
import React from 'react'
import styles from './FooterMenu.module.css';
import { menuItems } from '@/constants/menuItems';
import { snsFooterItems } from '@/constants/snsItems';
import Logo from '@/components/Logo/Logo';

export default function FooterMenu() {
  return (
    <div className={styles.FooterMenu}>
        <div className={styles.FooterMenu__Landmark}>
            <Logo width={134} height={34} fill='#fff' />
            <ul className={styles.FooterMenu__SnsList}>
                {snsFooterItems.map((snsItem, index) => (
                    <li key={index} className={styles.FooterMenu__SnsItem}>
                        <Link href={snsItem.url} target="_blank">
                            <svg width={snsItem.width} height={snsItem.height}>
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
                    <Link href={item.url}>
                        <span className={styles.FooterMenu__Ja}>{item.nameJP}</span>
                    </Link>
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
        </ul>
        <ul className={styles.FooterMenu__OtherLinks}>
            <li className={styles.FooterMenu__OtherLinkItem}>
                <Link href="https://bug-fix.org/privacy-policy" target="_blank">プライバシーポリシー</Link>
            </li>
            <li className={styles.FooterMenu__OtherLinkItem}>
                <Link href="https://bug-fix.org" target="_blank">運営会社</Link>
            </li>
        </ul>
        <small className={styles.FooterMenu__Copyright}>
             Copyright (&copy;) BugFix All Rights Reserved.
        </small>
    </div>
  )
}

