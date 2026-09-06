import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // bug-fix.org/siid 配下で配信するため全ルート・アセットを /siid 起点にする(docs/spec/06_migration.md §3.3)。
  // CSS の url() や Phaser 等、Next.js が自動で書き換えない絶対パス参照は各ファイルで /siid を明示している。
  basePath: '/siid',
  images: {
    // lp-2 は品質 90 で書き出す(src/constants/lp2Assets.ts)。Next.js 16 では
    // ここに列挙した値しか使えなくなるため、既定の 75 と合わせて明示する。
    qualities: [75, 90],
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
      // 注意: 本番の Cloudflare Worker も *.vercel.app をオリジンとして fetch するため、このヘッダーは
      // 本番向けレスポンスにも付く。Worker がプロキシ応答から X-Robots-Tag を除去する契約
      // (docs/spec/06_migration.md §3.2、Issue #47)とセットで機能する。
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
