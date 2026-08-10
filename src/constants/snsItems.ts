export const snsItems = [
  {
    icon: 'youtube',
    url: 'https://www.youtube.com/@programming-siid',
    width: 29,
    height: 20,
  },
  {
    icon: 'x',
    url: 'https://x.com/seito_horiguchi',
    width: 24,
    height: 24,
  }, {
    icon: 'tiktok',
    // @seito_horiguchi は存在しないアカウント（oEmbed 400）。実在するのは @seito2020
    url: 'https://www.tiktok.com/@seito2020',
    width: 25,
    height: 28,
  },
  {
    icon: 'instagram',
    url: 'https://www.instagram.com/seito.ai_engineer/',
    width: 30,
    height: 30,
  },
  {
    icon: 'threads',
    url: 'https://www.threads.com/@seito.ai_engineer',
    width: 24,
    height: 24,
  },
];

export const snsFooterItems = [
  snsItems[0],
  {
    icon: 'xWhite',
    url: 'https://x.com/seito_horiguchi',
    width: 24,
    height: 24,
  },
  snsItems[2],
  snsItems[3],
  {
    // フッターは暗色背景のため白版アイコンを使う（x / xWhite と同じ扱い）
    icon: 'threadsWhite',
    url: snsItems[4].url,
    width: 24,
    height: 24,
  },
];
