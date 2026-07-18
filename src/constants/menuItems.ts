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
    url: '/',
    subItems: [
      {
        name: 'Careerコース',
        url: '/',
      },
      {
        name: 'Career+FullSupportEditionコース',
        url: '/',
      },
      {
        name: 'Career+VIPEditionコース',
        url: '/',
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
