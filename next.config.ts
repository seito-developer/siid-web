import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // bug-fix.org/siid 配下で配信するため全ルート・アセットを /siid 起点にする(docs/spec/06_migration.md §3.3)。
  // CSS の url() や Phaser 等、Next.js が自動で書き換えない絶対パス参照は各ファイルで /siid を明示している。
  basePath: '/siid',
  images: {
    // lp-career は品質 80 で書き出す(src/constants/lpCareerAssets.ts)。Next.js 16 では
    // ここに列挙した値しか使えなくなるため、既定の 75 と合わせて明示する。
    qualities: [75, 80],
    // AVIF を作らせない。lp-career のセクション背景は psd_tool.py が必要な寸法・品質で
    // 書き出した webp で、AVIF に再エンコードしても得られる削減はわずかな一方、
    // 縦に長い背景(SP の FREE COUNSELING は 750x2374)の変換に非常に時間がかかり、
    // 実測で画像リクエストが返らなくなった(初回アクセスでの実害)。
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        // SiiD BLOG(microCMS)のインタビュー記事のアイキャッチ(Issue #75)
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
    ],
  },
  // 旧サイト(bug-fix.org/siid)の URL を新ルートへ引き継ぐ 301(docs/spec/06_migration.md §4、Issue #48)。
  // source / destination には basePath('/siid')が自動で付く。旧サイトの正規 URL は末尾スラッシュ付き
  // (/siid/career/)だが、Next.js が先に末尾スラッシュを外す(308)ため、ここでは付けずに書く。
  // 旧 URL と同じパスで実装済みのページ(counseling・counseling-complete・white-paper)は対象外。
  // 特に counseling-complete は旧 URL 互換ページのため、ここに書くとページより優先されて到達不能になる。
  async redirects() {
    const toLpCareer = ['/lp-1', '/lp-1/:path*', '/lp-2', '/lp-2/:path*'].map((source) => ({
      source,
      destination: '/lp-career',
      statusCode: 301 as const,
    }));
    return [
      // /career-path は /career-path/1 へのリダイレクトなので、正規 URL の /career-path/1 へ直接送る
      { source: '/career', destination: '/career-path/1', statusCode: 301 },
      { source: '/tuition', destination: '/courses', statusCode: 301 },
      { source: '/voices', destination: '/career-path/1', statusCode: 301 },
      // lp-1 は廃止(2026-09-10)。/lp-2 は Issue #76 で lp-career に改名する前の URL
      ...toLpCareer,
      { source: '/counseling-complete-lp-1', destination: '/lp-career/complete', statusCode: 301 },
    ];
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
