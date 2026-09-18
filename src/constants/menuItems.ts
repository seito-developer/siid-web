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

// PC の下層ナビ(NavigationPcLower)のメニュー末尾にだけ追加する項目(Issue #148)。
// TOP は Header の CONTACT ボタン、SP はハンバーガーメニュー内の ContactButton が導線になるため、ほかには出さない。
export const pcLowerNavExtraMenuItems: Pick<MenuItem, 'nameEN' | 'nameJP' | 'url'>[] = [
  { nameEN: 'Contact', nameJP: '個別説明会', url: pages.counseling.url },
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
  external?: boolean;
};

// フッター末尾のリンク。external は別タブで開く。
export const footerOtherLinks: FooterOtherLink[] = [
  // 404 ページのミニゲームへの導線。意図的に 404 へ飛ばして遊んでもらう
  { label: pages.notFound.name.en, url: pages.notFound.url },
  { label: 'プライバシーポリシー', url: 'https://bug-fix.org/privacy-policy', external: true },
  { label: '運営会社', url: 'https://bug-fix.org', external: true },
];
