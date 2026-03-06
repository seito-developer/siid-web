import React from 'react';

import TransitionLink from '@/components/TransitionLink/TransitionLink';

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
          { index !== 0 ? <span>{item.title}</span> : <TransitionLink href={item.url}>{item.title}</TransitionLink>}
        </li>
      ))}
    </ol>
  );
}