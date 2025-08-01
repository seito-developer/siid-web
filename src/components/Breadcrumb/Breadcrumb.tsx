import Link from 'next/link'
import React from 'react'
import styles from './Breadcrumb.module.css';

export type BreadcrumbProps = {
  title: string;
  url: string;
};

export default function Breadcrumb({ breadcrumb }: { breadcrumb: BreadcrumbProps[] }) {
  return (
    <ol className={styles.Breadcrumb}>
        {breadcrumb.map((item, index) => (
          <li className={styles.Breadcrumb__Item} key={index}>
            { index !== 0 ? <span>{item.title}</span> : <Link href={item.url}>{item.title}</Link>}
          </li>
        ))}
    </ol>
  )
}