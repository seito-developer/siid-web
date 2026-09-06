import { MetadataRoute } from 'next';

import { commonTitle } from '@/constants/meta';

// リリース前チェックリスト「favicon > site.webmanifest」。
// Next.js のファイル規約で /site.webmanifest 相当を出力する。
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: commonTitle,
    short_name: 'SiiD',
    description:
      'ITエンジニア転職と生成AIに特化したプログラミングスクール SiiD の公式サイトです。',
    start_url: '/siid/',
    display: 'standalone',
    background_color: '#f1f1f1',
    theme_color: '#131a3e',
    icons: [
      { src: '/siid/favicon.ico', sizes: '32x32 16x16', type: 'image/x-icon' },
      { src: '/siid/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
