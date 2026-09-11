// bug-fix.org の前段で /siid 配下だけを Vercel の新アプリ(siid-web)へリバースプロキシする Cloudflare Worker。
// URL は bug-fix.org/siid/... のまま、中身を Vercel から返す(docs/spec/06_migration.md §3.2、Issue #47)。
// それ以外のパス(コーポレートサイト)はオリジン(GitHub Pages)へそのまま通す。

// Vercel の既定 URL は常に最新の Production デプロイ(= main)を指す(docs/spec/05_deploy.md)。
export const VERCEL_ORIGIN = 'https://siid-web-theta.vercel.app';

/**
 * 新アプリへ振るパスか。`/siid` と完全一致、または `/siid/` で始まるものだけ。
 * 前方一致を `/siid` だけで判定すると `/siid-xxx` のようなコーポレート側のパスまで流れてしまう。
 * Worker のルート `bug-fix.org/siid*` も `/siid-xxx` に一致するため、ルートの絞り込みには頼らない。
 */
export function isSiidPath(pathname) {
  return pathname === '/siid' || pathname.startsWith('/siid/');
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (!isSiidPath(url.pathname)) {
      return fetch(request);
    }
    return proxyToVercel(request, url);
  },
};

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

  // 必須: 新アプリは Host が *.vercel.app の応答に noindex を付ける(直 URL の重複インデックス対策、Issue #14)。
  // Worker からの fetch も Host は vercel.app になるため、ここで消さないと本番全体が検索エンジンから外れる。
  response.headers.delete('X-Robots-Tag');

  // 新アプリが絶対 URL でリダイレクトした場合に vercel.app へ飛ばさない(通常は /siid/... の相対パス)
  const location = response.headers.get('Location');
  if (location && location.startsWith(VERCEL_ORIGIN)) {
    response.headers.set('Location', `${url.origin}${location.slice(VERCEL_ORIGIN.length)}`);
  }

  return response;
}
