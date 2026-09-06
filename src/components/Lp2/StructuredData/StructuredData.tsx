import { SITE_URL, pages } from '@/constants/meta';

// 構造化データ(リリース前チェックリスト「メタ/SEO > 構造化データ」)。
// LP は 1 ページ完結のため BreadcrumbList は自分自身のみの 1 階層とする。

const ORGANIZATION = {
  '@type': 'Organization',
  name: '合同会社BugFix',
  url: 'https://bug-fix.org/',
  brand: {
    '@type': 'Brand',
    name: 'SiiD',
  },
  sameAs: [
    'https://www.youtube.com/@programming-siid',
    'https://x.com/seito_horiguchi',
    'https://www.instagram.com/seito.ai_engineer/',
    'https://www.threads.com/@seito.ai_engineer',
    'https://www.tiktok.com/@seito2020',
  ],
};

export default function StructuredData() {
  const url = `${SITE_URL}${pages.lp2.url}`;
  const json = {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: pages.lp2.name.ja,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify の結果だけを埋めるため、外部入力は入らない
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
