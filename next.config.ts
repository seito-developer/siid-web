import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // bug-fix.org/siid 配下で配信するため全ルート・アセットを /siid 起点にする(docs/spec/06_migration.md §3.3)。
  // CSS の url() や Phaser 等、Next.js が自動で書き換えない絶対パス参照は各ファイルで /siid を明示している。
  basePath: '/siid',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  async headers() {
    return [
      // Vercel の直 URL(*.vercel.app)は本番(bug-fix.org/siid)との重複インデックスを防ぐため noindex にする。
      // 本番ドメインは Cloudflare Worker 経由の bug-fix.org のみなのでこのルールに一致しない(docs/spec/05_deploy.md)。
      {
        source: '/:path*',
        basePath: false,
        has: [
          {
            type: 'host',
            value: '.*\\.vercel\\.app',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
