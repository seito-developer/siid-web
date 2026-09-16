import React from 'react';

import Link from 'next/link';

import { absoluteUrl } from '@/constants/meta';

import styles from './Breadcrumb.module.css';

export type BreadcrumbProps = {
  title: string;
  url: string;
};

// 画面のパンくずと同じデータから BreadcrumbList の JSON-LD を生成する(SEO 指摘 No.12 / Issue #97)。
// パンくずを出しているページすべてに自動で付くよう、ページ側ではなくこのコンポーネントに持たせている。
// item は canonical と同じ規則で SITE_URL 起点の絶対 URL にする。
function buildBreadcrumbList(breadcrumb: BreadcrumbProps[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      item: absoluteUrl(item.url),
    })),
  };
}

export default function Breadcrumb({ breadcrumb }: { breadcrumb: BreadcrumbProps[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbList(breadcrumb)) }}
      />
      <ol className={styles.Breadcrumb}>
        {breadcrumb.map((item, index) => (
          <li className={styles.Breadcrumb__Item} key={index}>
            { index !== 0 ? <span>{item.title}</span> : <Link href={item.url}>{item.title}</Link>}
          </li>
        ))}
      </ol>
    </>
  );
}
