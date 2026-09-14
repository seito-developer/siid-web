import { COURSE_PLAN_ANCHOR_IDS } from '@/constants/coursePlans';

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
        name: 'Career+FullSupportEditionコース',
        url: `/courses#${COURSE_PLAN_ANCHOR_IDS.fullSupport}`,
      },
      {
        name: 'Career+VIPEditionコース',
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
