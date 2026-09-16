// name はアイコンのみのリンクの aria-label に使う(Issue #84)。
export const snsItems = [
  {
    name: 'YouTube',
    icon: 'youtube',
    url: 'https://www.youtube.com/@programming-siid',
    width: 29,
    height: 20,
  },
  {
    name: 'X（旧Twitter）',
    icon: 'x',
    url: 'https://x.com/seito_horiguchi',
    width: 24,
    height: 24,
  }, {
    name: 'TikTok',
    icon: 'tiktok',
    // @seito_horiguchi は存在しないアカウント（oEmbed 400）。実在するのは @seito2020
    url: 'https://www.tiktok.com/@seito2020',
    width: 25,
    height: 28,
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/seito.ai_engineer/',
    width: 30,
    height: 30,
  },
  {
    name: 'Threads',
    icon: 'threads',
    url: 'https://www.threads.com/@seito.ai_engineer',
    width: 24,
    height: 24,
  },
];

export const snsFooterItems = [
  snsItems[0],
  {
    name: 'X（旧Twitter）',
    icon: 'xWhite',
    url: 'https://x.com/seito_horiguchi',
    width: 24,
    height: 24,
  },
  snsItems[2],
  snsItems[3],
  {
    // フッターは暗色背景のため白版アイコンを使う（x / xWhite と同じ扱い）
    name: 'Threads',
    icon: 'threadsWhite',
    url: snsItems[4].url,
    width: 24,
    height: 24,
  },
];
