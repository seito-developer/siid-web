// Node の組み込みテストランナーで Worker の分岐とヘッダー処理を検証する。
//   cd workers/siid-router && npm test
// fetch を差し替え、Worker が「どこへ・何を」送ったかと、利用者へ何を返したかを確認する。
import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import worker, { NOT_FOUND_PATH, VERCEL_ORIGIN, isSiidPath, wantsHtmlPage } from '../src/index.js';

const realFetch = globalThis.fetch;
let calls;

function mockFetch(respond) {
  calls = [];
  globalThis.fetch = async (input, init) => {
    const req = input instanceof Request ? input : new Request(input, init);
    calls.push({ url: req.url, method: req.method, headers: req.headers, redirect: init?.redirect ?? req.redirect, body: init?.body, input });
    return respond(req);
  };
}

beforeEach(() => mockFetch(() => new Response('ok', { status: 200 })));
afterEach(() => { globalThis.fetch = realFetch; });

describe('isSiidPath', () => {
  it('/siid と /siid/ 配下だけを新アプリへ振る', () => {
    for (const p of ['/siid', '/siid/', '/siid/career-path/1', '/siid/_next/static/x.js', '/siid/lp-1']) {
      assert.equal(isSiidPath(p), true, p);
    }
    for (const p of ['/', '/about', '/siid-blog', '/siidx', '/SIID', '/foo/siid', '/privacy-policy']) {
      assert.equal(isSiidPath(p), false, p);
    }
  });
});

describe('振り分け', () => {
  it('/siid 配下は Vercel へ同じパスとクエリで転送する', async () => {
    await worker.fetch(new Request('https://bug-fix.org/siid/career-path/2?utm_source=ad&x=1'));
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, `${VERCEL_ORIGIN}/siid/career-path/2?utm_source=ad&x=1`);
  });

  it('/siid ちょうどでも転送する', async () => {
    await worker.fetch(new Request('https://bug-fix.org/siid'));
    assert.equal(calls[0].url, `${VERCEL_ORIGIN}/siid`);
  });

  it('bug-fix.org 以外のホスト（workers.dev など）ではプロキシしない', async () => {
    for (const origin of ['https://siid-router.example.workers.dev', 'https://www.bug-fix.org', 'https://blog.bug-fix.org']) {
      mockFetch(() => new Response('pass'));
      const req = new Request(`${origin}/siid/career-path/1`);
      await worker.fetch(req);
      assert.equal(calls.length, 1, origin);
      assert.equal(calls[0].input, req, `${origin}: Vercel へ送らずそのまま通す`);
    }
  });

  it('コーポレートのパスはオリジンへそのまま通す（Vercel へは送らない）', async () => {
    for (const path of ['/', '/company/', '/siid-blog/post', '/privacy-policy']) {
      mockFetch(() => new Response('corp'));
      const req = new Request(`https://bug-fix.org${path}`);
      const res = await worker.fetch(req);
      assert.equal(calls.length, 1, path);
      assert.equal(calls[0].input, req, `${path}: 受け取ったリクエストをそのまま渡す`);
      assert.equal(await res.text(), 'corp');
    }
  });
});

describe('コーポレート側の 404(Issue #131)', () => {
  const HTML = { accept: 'text/html,application/xhtml+xml,*/*;q=0.8' };

  // オリジン(GitHub Pages)は 404、新アプリは 404 ページを返す状況を作る
  function mockCorp404(vercelRespond = () => new Response('<html>dino</html>', {
    status: 404,
    headers: { 'Content-Type': 'text/html', 'X-Robots-Tag': 'noindex', 'x-vercel-id': 'hnd1::x' },
  })) {
    mockFetch((req) => (req.url.startsWith(VERCEL_ORIGIN) ? vercelRespond(req) : new Response('gh 404', { status: 404 })));
  }

  it('wantsHtmlPage は GET で HTML を受け入れるリクエストだけ true', () => {
    assert.equal(wantsHtmlPage(new Request('https://bug-fix.org/x', { headers: HTML })), true);
    assert.equal(wantsHtmlPage(new Request('https://bug-fix.org/x', { headers: { accept: 'image/avif,image/webp,*/*' } })), false);
    assert.equal(wantsHtmlPage(new Request('https://bug-fix.org/x')), false);
    assert.equal(wantsHtmlPage(new Request('https://bug-fix.org/x', { method: 'HEAD', headers: HTML })), false);
    assert.equal(wantsHtmlPage(new Request('https://bug-fix.org/x', { method: 'POST', headers: HTML, body: 'a' })), false);
  });

  it('404 ページのパスは Next が予約する /404 ではなく catch-all に届くものにする', () => {
    assert.equal(NOT_FOUND_PATH.startsWith('/siid/'), true);
    assert.notEqual(NOT_FOUND_PATH, '/siid/404');
  });

  it('ページ表示が 404 なら新アプリの 404 ページを 404 のまま返す(ヘッダー処理も適用)', async () => {
    mockCorp404();
    const req = new Request('https://bug-fix.org/this-page-does-not-exist', { headers: { ...HTML, host: 'bug-fix.org', 'accept-language': 'ja' } });
    const res = await worker.fetch(req);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].input, req, 'まずオリジンへそのまま通す');
    assert.equal(calls[1].url, `${VERCEL_ORIGIN}${NOT_FOUND_PATH}`);
    assert.equal(calls[1].headers.get('host'), null);
    assert.equal(calls[1].headers.get('accept-language'), 'ja');
    assert.equal(res.status, 404);
    assert.equal(await res.text(), '<html>dino</html>');
    assert.equal(res.headers.get('X-Robots-Tag'), null);
    assert.equal(res.headers.get('x-vercel-id'), null);
  });

  it('条件付き・Range ヘッダーは 404 ページの取得には送らない(304 / 206 で差し替えに失敗しないように)', async () => {
    mockCorp404();
    await worker.fetch(new Request('https://bug-fix.org/nope', {
      headers: { ...HTML, 'If-None-Match': '"abc"', 'If-Modified-Since': 'Tue, 01 Jan 2030 00:00:00 GMT', Range: 'bytes=0-10' },
    }));
    const h = calls[1].headers;
    assert.equal(h.get('if-none-match'), null);
    assert.equal(h.get('if-modified-since'), null);
    assert.equal(h.get('range'), null);
    assert.equal(h.get('accept'), HTML.accept);
  });

  it('オリジンが 404 以外ならそのまま返し、新アプリへは問い合わせない', async () => {
    mockFetch(() => new Response('corp', { status: 200 }));
    const res = await worker.fetch(new Request('https://bug-fix.org/company/', { headers: HTML }));
    assert.equal(calls.length, 1);
    assert.equal(await res.text(), 'corp');
  });

  it('画像など HTML を求めないリクエストや HEAD の 404 はオリジンのまま返す', async () => {
    for (const init of [
      { headers: { accept: 'image/avif,image/webp,*/*' } },
      {},
      { method: 'HEAD', headers: HTML },
    ]) {
      mockCorp404();
      const res = await worker.fetch(new Request('https://bug-fix.org/images/missing.png', init));
      assert.equal(calls.length, 1, JSON.stringify(init));
      assert.equal(res.status, 404);
    }
  });

  it('新アプリが 404 以外(障害時の 5xx やリダイレクト)を返したらオリジンの 404 を返す', async () => {
    for (const status of [500, 308, 200]) {
      mockCorp404(() => new Response('unexpected', { status, headers: status === 308 ? { Location: '/siid' } : {} }));
      const res = await worker.fetch(new Request('https://bug-fix.org/nope', { headers: HTML }));
      assert.equal(res.status, 404, String(status));
      assert.equal(await res.text(), 'gh 404', String(status));
    }
  });

  it('新アプリの取得に失敗したらオリジンの 404 を返す(fail open)', async () => {
    mockCorp404(() => { throw new Error('network'); });
    const res = await worker.fetch(new Request('https://bug-fix.org/nope', { headers: HTML }));
    assert.equal(res.status, 404);
    assert.equal(await res.text(), 'gh 404');
  });
});

describe('プロキシ応答', () => {
  it('X-Robots-Tag を必ず削除し、他のヘッダーは残す', async () => {
    mockFetch(() => new Response('<html>', {
      status: 200,
      headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 's-maxage=600', 'Content-Type': 'text/html' },
    }));
    const res = await worker.fetch(new Request('https://bug-fix.org/siid'));
    assert.equal(res.headers.get('X-Robots-Tag'), null);
    assert.equal(res.headers.get('Cache-Control'), 's-maxage=600');
    assert.equal(res.headers.get('Content-Type'), 'text/html');
    assert.equal(await res.text(), '<html>');
  });

  it('HSTS と x-vercel-* も削除する（HSTS はドメイン全体に 2 年効くため Worker が付けない）', async () => {
    mockFetch(() => new Response('<html>', {
      headers: {
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'x-vercel-cache': 'HIT',
        'x-vercel-id': 'hnd1::abc',
        'Content-Type': 'text/html',
      },
    }));
    const res = await worker.fetch(new Request('https://bug-fix.org/siid'));
    assert.equal(res.headers.get('Strict-Transport-Security'), null);
    assert.equal(res.headers.get('x-vercel-cache'), null);
    assert.equal(res.headers.get('x-vercel-id'), null);
    assert.equal(res.headers.get('Content-Type'), 'text/html');
  });

  it('新アプリの 301 は追従せず、そのまま利用者へ返す', async () => {
    mockFetch(() => new Response(null, { status: 301, headers: { Location: '/siid/lp-career' } }));
    const res = await worker.fetch(new Request('https://bug-fix.org/siid/lp-1'));
    assert.equal(calls[0].redirect, 'manual');
    assert.equal(res.status, 301);
    assert.equal(res.headers.get('Location'), '/siid/lp-career');
  });

  it('vercel.app を指す絶対 URL のリダイレクトは bug-fix.org に書き換える', async () => {
    mockFetch(() => new Response(null, { status: 308, headers: { Location: `${VERCEL_ORIGIN}/siid/career?x=1` } }));
    const res = await worker.fetch(new Request('https://bug-fix.org/siid/career/?x=1'));
    assert.equal(res.headers.get('Location'), 'https://bug-fix.org/siid/career?x=1');
  });

  it('他ドメインへのリダイレクトは書き換えない', async () => {
    mockFetch(() => new Response(null, { status: 302, headers: { Location: 'https://www.jicoo.com/x' } }));
    const res = await worker.fetch(new Request('https://bug-fix.org/siid/counseling'));
    assert.equal(res.headers.get('Location'), 'https://www.jicoo.com/x');
  });

  it('404 などのステータスもそのまま返す', async () => {
    mockFetch(() => new Response('nf', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } }));
    const res = await worker.fetch(new Request('https://bug-fix.org/siid/nope'));
    assert.equal(res.status, 404);
    assert.equal(res.headers.get('X-Robots-Tag'), null);
  });
});

describe('転送するリクエスト', () => {
  it('Host は送らず、その他のヘッダーは引き継ぐ', async () => {
    await worker.fetch(new Request('https://bug-fix.org/siid', {
      headers: { 'Accept-Language': 'ja', 'User-Agent': 'Googlebot', Cookie: 'lp-career-cookie-consent=accepted' },
    }));
    const h = calls[0].headers;
    assert.equal(new URL(calls[0].url).host, new URL(VERCEL_ORIGIN).host);
    assert.equal(h.get('host'), null);
    assert.equal(h.get('accept-language'), 'ja');
    assert.equal(h.get('user-agent'), 'Googlebot');
    assert.equal(h.get('cookie'), 'lp-career-cookie-consent=accepted');
  });

  it('HEAD / GET には本文を付けず、POST は本文を引き継ぐ', async () => {
    await worker.fetch(new Request('https://bug-fix.org/siid', { method: 'HEAD' }));
    assert.equal(calls[0].method, 'HEAD');
    assert.equal(calls[0].body, undefined);

    await worker.fetch(new Request('https://bug-fix.org/siid/api', { method: 'POST', body: 'a=1', duplex: 'half' }));
    assert.equal(calls[1].method, 'POST');
    assert.notEqual(calls[1].body, undefined);
  });
});
