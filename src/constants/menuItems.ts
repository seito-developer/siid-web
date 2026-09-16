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

type FooterOtherLink = {
  label: string;
  url: string;
  external?: boolean;
};

// フッター末尾の補助リンク。ナビのメインメニュー(menuItems)には出さず、フッターからだけ辿れるもの。
// 資料請求・LINE 登録は Issue #131 で追加(文言・URL は meta.ts のページ定義を参照)。
export const footerOtherLinks: FooterOtherLink[] = [
  { label: pages.whitePaper.name.ja, url: pages.whitePaper.url },
  { label: pages.line.name.ja, url: pages.line.url },
  { label: 'プライバシーポリシー', url: 'https://bug-fix.org/privacy-policy', external: true },
  { label: '運営会社', url: 'https://bug-fix.org', external: true },
];
