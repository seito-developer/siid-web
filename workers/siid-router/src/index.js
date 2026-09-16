// bug-fix.org の前段で /siid 配下だけを Vercel の新アプリ(siid-web)へリバースプロキシする Cloudflare Worker。
// URL は bug-fix.org/siid/... のまま、中身を Vercel から返す(docs/spec/06_migration.md §3.2、Issue #47)。
// それ以外のパス(コーポレートサイト)はオリジン(GitHub Pages)へそのまま通す。
// ただしコーポレート側が 404 を返したページ表示のリクエストには、GitHub Pages 既定の
// 「Page not found」ではなく新アプリの 404 ページを返す(Issue #131)。

// Vercel の既定 URL は常に最新の Production デプロイ(= main)を指す(docs/spec/05_deploy.md)。
export const VERCEL_ORIGIN = 'https://siid-web-theta.vercel.app';

// プロキシするのはこのホスト宛てだけ。workers.dev など別ホストで Worker が呼ばれた場合に
// サイト全体の複製(しかも noindex を外したもの)を公開してしまわないようにする。
export const PUBLIC_HOST = 'bug-fix.org';

// コーポレート側の 404 の代わりに返す新アプリの 404 ページ。`/siid/404` は catch-all(src/app/(Main)/[...notFound])
// で not-found.tsx に着地し、ステータス 404 の HTML を返す。ページ内のリンク・アセットは /siid/ 配下の
// 絶対パスなので、bug-fix.org/ 直下で表示しても既存の /siid プロキシで配信できる。
export const NOT_FOUND_PATH = '/siid/404';

// Vercel の応答から外すヘッダー。
// - X-Robots-Tag: 新アプリは *.vercel.app 宛ての応答に noindex を付ける(Issue #14)。Worker からの fetch も
//   Host は vercel.app になるため、消さないと本番全体が検索エンジンから外れる(必須)
// - Strict-Transport-Security: Vercel は `max-age=63072000; includeSubDomains; preload` を付ける。
//   そのまま流すと bug-fix.org 全サブドメインの HTTPS 強制を 2 年間ブラウザに記憶させてしまい、
//   ルートを外すロールバックでも取り消せない。ドメイン全体の方針は Worker が勝手に決めない
// - x-vercel-*: 配信元の内部情報(キャッシュ状態・リクエスト ID)。公開する必要がない
const STRIPPED_HEADERS = ['x-robots-tag', 'strict-transport-security'];
const STRIPPED_HEADER_PREFIX = 'x-vercel-';

/**
 * 新アプリへ振るパスか。`/siid` と完全一致、または `/siid/` で始まるものだけ。
 * 前方一致を `/siid` だけで判定すると `/siid-xxx` のようなコーポレート側のパスまで流れてしまう。
 * Worker のルート `bug-fix.org/siid*` も `/siid-xxx` に一致するため、ルートの絞り込みには頼らない。
 */
export function isSiidPath(pathname) {
  return pathname === '/siid' || pathname.startsWith('/siid/');
}

/**
 * コーポレート側の 404 を新アプリの 404 ページに差し替える対象か。
 * ブラウザのページ表示(GET で HTML を受け入れる)だけを対象にし、画像・API・HEAD の 404 はそのまま返す。
 */
export function wantsHtmlPage(request) {
  if (request.method !== 'GET') {
    return false;
  }
  return (request.headers.get('accept') ?? '').includes('text/html');
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname !== PUBLIC_HOST) {
      return fetch(request);
    }
    if (isSiidPath(url.pathname)) {
      return proxyToVercel(request, url);
    }
    return passThroughWithNotFound(request, url);
  },
};

/**
 * コーポレートのリクエストはオリジン(GitHub Pages)へそのまま通す。
 * オリジンが 404 を返したページ表示だけ、新アプリの 404 ページ(NOT_FOUND_PATH)を 404 のまま返す。
 * 新アプリ側の取得に失敗したときはオリジンの 404 をそのまま返す(fail open)。
 */
async function passThroughWithNotFound(request, url) {
  const origin = await fetch(request);
  if (origin.status !== 404 || !wantsHtmlPage(request)) {
    return origin;
  }

  try {
    const notFoundUrl = new URL(NOT_FOUND_PATH, url.origin);
    const notFound = await proxyToVercel(new Request(notFoundUrl, { headers: request.headers }), notFoundUrl);
    // 新アプリが 404 ページ以外(リダイレクトや障害時の 5xx)を返した場合は差し替えない
    if (notFound.status !== 404) {
      return origin;
    }
    return notFound;
  } catch {
    return origin;
  }
}

async function proxyToVercel(request, url) {
  const target = new URL(url.pathname + url.search, VERCEL_ORIGIN);

  const headers = new Headers(request.headers);
  // Host が bug-fix.org のままだと Vercel はデプロイを特定できない(ドメインを割り当てていない)
  headers.delete('host');

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    // ストリームの本文を送るときは Fetch 仕様上 duplex の指定が必要(Workers は省略しても動くが仕様に合わせる)
    ...(hasBody ? { duplex: 'half' } : {}),
    // 新アプリの 301 / 307 / 308 は追従せず利用者へそのまま返す(旧 URL の 301 は docs/spec/06_migration.md §4)
    redirect: 'manual',
  });

  const response = new Response(upstream.body, upstream);

  for (const name of [...response.headers.keys()]) {
    if (STRIPPED_HEADERS.includes(name) || name.startsWith(STRIPPED_HEADER_PREFIX)) {
      response.headers.delete(name);
    }
  }

  // 新アプリが絶対 URL でリダイレクトした場合に vercel.app へ飛ばさない(通常は /siid/... の相対パス)
  const location = response.headers.get('Location');
  if (location && location.startsWith(VERCEL_ORIGIN)) {
    response.headers.set('Location', `${url.origin}${location.slice(VERCEL_ORIGIN.length)}`);
  }

  return response;
}
