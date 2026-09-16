import { COURSE_PLAN_ANCHOR_IDS } from '@/constants/coursePlans';
import { pages } from '@/constants/meta';

type MenuItem = {
  nameEN: string;
  nameJP: string;
  url: string;
  comingSoon?: boolean;
  subItems?: { name: string; url: string }[];
};

export const menuItems: MenuItem[] = [
  {
    nameEN: 'Course plan',
    nameJP: 'コース/プラン',
    url: '/courses',
    subItems: [
      {
        name: 'Careerコース',
        url: `/courses#${COURSE_PLAN_ANCHOR_IDS.career}`,
      },
      {
        name: 'Career +Full Supportコース',
        url: `/courses#${COURSE_PLAN_ANCHOR_IDS.fullSupport}`,
      },
      {
        name: '顧問プラン',
        url: `/courses#${COURSE_PLAN_ANCHOR_IDS.vip}`,
      },
    ],
  },
  {
    nameEN: 'Career path',
    nameJP: '卒業生の進路',
    url: '/career-path',
  },
  {
    nameEN: 'Service',
    nameJP: 'サービス一覧',
    url: '/service',
  },
  {
    nameEN: 'Community',
    nameJP: 'SiiDコミュニティ',
    url: '/community',
  },
];

// フッターのメインメニューにだけ追加する項目(PC では 3 列目)。ナビには出さない(Issue #131)。
// 文言・URL は meta.ts のページ定義を参照する。
export const footerExtraMenuItems: Pick<MenuItem, 'nameJP' | 'url'>[] = [
  { nameJP: pages.whitePaper.name.ja, url: pages.whitePaper.url },
  { nameJP: pages.line.name.ja, url: pages.line.url },
];

type FooterOtherLink = {
  label: string;
  url: string;
};

// フッター末尾の外部リンク。
export const footerOtherLinks: FooterOtherLink[] = [
  { label: 'プライバシーポリシー', url: 'https://bug-fix.org/privacy-policy' },
  { label: '運営会社', url: 'https://bug-fix.org' },
];
