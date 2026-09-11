// Node の組み込みテストランナーで Worker の分岐とヘッダー処理を検証する。
//   cd workers/siid-router && npm test
// fetch を差し替え、Worker が「どこへ・何を」送ったかと、利用者へ何を返したかを確認する。
import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import worker, { VERCEL_ORIGIN, isSiidPath } from '../src/index.js';

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
