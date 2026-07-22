import { OGP_IMAGE_PATH, SITE_URL, commonTitle } from '@/constants/meta';
import { snsItems } from '@/constants/snsItems';

// Organization の構造化データ(JSON-LD)。
// 運営組織・ロゴ・SNS アカウントを検索エンジンに明示する(SEO 指摘 No.12 対応)。
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SiiD',
  alternateName: commonTitle,
  url: SITE_URL,
  logo: `${SITE_URL}${OGP_IMAGE_PATH}`,
  parentOrganization: {
    '@type': 'Organization',
    name: '合同会社BugFix',
    alternateName: 'BugFix LLC',
    url: 'https://bug-fix.org',
  },
  sameAs: snsItems.map((item) => item.url),
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}
