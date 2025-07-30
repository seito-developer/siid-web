import Link from 'next/link'
import React from 'react'
import styles from './Menu.module.css';

const menuItems = [
    {
        nameEN: 'Course plan',
        nameJP: 'コース/プラン',
        href: '/',
        subItems: [
            {
                name: 'Careerコース',
                href: '/'
            },
            {
                name: 'Career+FullSupportEditionコース',
                href: '/'
            },
            {
                name: 'Career+VIPEditionコース',
                href: '/'
            },
        ],
    },
    {
        nameEN: 'Career path',
        nameJP: '卒業生の進路',
        href: '/career-path',
    },
    {
        nameEN: 'After support',
        nameJP: 'アフターサポート',
        href: '/after-support',
    },
    {
        nameEN: 'Community',
        nameJP: 'コミュニティ',
        href: '/community',
    }
]

export default function Menu() {
  return (
    <div className={styles.Menu}>
        <ul>
            {menuItems.map((item, index) => (
                <li key={index}>
                    <Link href={item.href}>
                        <span className={styles.Menu__En}>{item.nameEN}</span>
                        <span className={styles.Menu__Ja}>{item.nameJP}</span>
                    </Link>
                    {item.subItems && item.subItems.length > 0 && (
                        <ul>
                            {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                    <Link href={subItem.href}>
                                        {subItem.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    </div>
  )
}

