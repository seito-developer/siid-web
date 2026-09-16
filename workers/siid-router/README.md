# siid-router(Cloudflare Worker)

`bug-fix.org` の前段で **`/siid` 配下だけを Vercel の新アプリへリバースプロキシする** Worker(Issue #47)。
URL は `bug-fix.org/siid/...` のまま、中身を `https://siid-web-theta.vercel.app` から返す。
それ以外のパス(コーポレートサイト)はオリジン(GitHub Pages)へそのまま通す。

設計の根拠は [docs/spec/06_migration.md](../../docs/spec/06_migration.md) §3.2・§5・§6。

## 振り分け

| リクエストのパス | 行き先 |
|---|---|
| ホストが `bug-fix.org` で、パスが `/siid` と完全一致または `/siid/` で始まる | Vercel の新アプリ(同じパス・クエリ) |
| ホストが `bug-fix.org` のそれ以外のパス(`/`・`/siid-xxx` など) | オリジン(GitHub Pages)へそのまま。**ただしオリジンが 404 を返したページ表示(GET で `Accept` に `text/html` を含む)には、新アプリの `/siid/404` を 404 のまま返す**(Issue #131)。画像・API・HEAD の 404、新アプリが 404 以外を返したとき、取得に失敗したときはオリジンの応答をそのまま返す |
| `workers.dev` など別ホスト | オリジンへそのまま |

プロキシした応答には次の処理をする。

- **`X-Robots-Tag` を削除する(必須)**。新アプリは `*.vercel.app` 宛ての応答に `noindex` を付けるため、消さないと本番全体が検索エンジンから外れる
- **`Strict-Transport-Security` を削除する**。Vercel は `max-age=63072000; includeSubDomains; preload` を付けており、流すと `bug-fix.org` の全サブドメインに HTTPS 強制を 2 年間ブラウザに記憶させる(ルートを外すロールバックでも取り消せない)。現行サイトは HSTS を出していない。ドメイン全体の方針は Worker で決めない
- `x-vercel-*`(配信元の内部情報)も削除する
- リダイレクト(301 / 307 / 308)は追従せずそのまま返す。vercel.app を指す絶対 URL の `Location` は `bug-fix.org` に書き換える

## テスト

```bash
cd workers/siid-router
npm test          # Node の組み込みテストランナー。依存パッケージは不要
```

## 運用手順(ダッシュボード操作はユーザーが行う)

### 前提

- DNS が Cloudflare に移管済みであること(Issue #45、06 §10)
- `develop` → `main` のリリース PR がマージされ、Vercel の Production が最新であること(06 §5 Step1)

### 1. デプロイ(この時点では本番に影響しない)

**ダッシュボードで行う場合**

1. Cloudflare ダッシュボード → **Workers & Pages** → **Create** → **Create Worker**
2. 名前を `siid-router` にして **Deploy**(雛形のまま一度作る)
3. **Edit code** を開き、中身を `src/index.js` の全文に置き換えて **Deploy**
4. **Settings → Domains & Routes** で `workers.dev` のサブドメインを **無効** にしておく(公開 URL を増やさないため。Worker 自体も `bug-fix.org` 以外のホストではプロキシしないが、念のため)

**wrangler で行う場合**

```bash
cd workers/siid-router
npx wrangler login
npx wrangler deploy     # wrangler.toml にルートを書いていないので本番は切り替わらない
```

### 2. 動作確認(有効化前)

ダッシュボードの **Edit code** 右側のプレビューで、URL を `https://bug-fix.org/siid` などに変えて確認できる。
`/siid` が新サイト、`/` がコーポレートサイトになること。

### 3. 有効化(カットオーバー = 本番切替)

1. Worker `siid-router` → **Settings → Domains & Routes** → **Add** → **Route**
2. Zone: `bug-fix.org`、Route: `bug-fix.org/*` を追加(コーポレート側の 404 差し替えのため、2026-09 の Issue #131 で `bug-fix.org/siid*` から広げた。コーポレート宛のリクエストも Worker を通るが、404 以外はそのまま通すだけ)
3. 06 §8 のチェックリストで確認する。最低限:

```bash
curl -sI https://bug-fix.org/ | grep -i '^server'                    # GitHub.com のまま(コーポレート無傷)
curl -s -H 'Accept: text/html' -o /dev/null -w '%{http_code}\n' https://bug-fix.org/this-page-does-not-exist  # 404 のまま。本文は新アプリの 404 ページ
curl -sI https://bug-fix.org/this-page-does-not-exist | grep -i '^server'  # HEAD は GitHub.com のまま(差し替え対象外)
curl -sI https://bug-fix.org/siid | grep -iE '^server|^x-robots-tag|^strict-transport'  # Vercel、かつ x-robots-tag と HSTS が出ないこと
curl -sI https://bug-fix.org/siid/lp-1 | grep -iE '^HTTP|^location'  # 301 → /siid/lp-career
curl -sI https://siid-web-theta.vercel.app/siid | grep -i '^x-robots-tag'  # 直 URL は noindex のまま
```

`www.bug-fix.org` はルートに含めない。`www` は GitHub Pages が `bug-fix.org` へ転送するため、転送後のリクエストが上記ルートに乗る。

### 4. コーポレート側 404 の差し替えを有効にする(Issue #131、稼働中の Worker への反映)

1. 手順 1 と同じ方法で `src/index.js` の最新版を Worker に反映する(この時点ではルートが `bug-fix.org/siid*` のままなのでコーポレート側は変わらない)
2. **Settings → Domains & Routes** で既存のルート `bug-fix.org/siid*` を `bug-fix.org/*` に変更する(または `/*` を追加してから `/siid*` を削除)
3. 手順 3 の curl で確認する。`/` が GitHub.com のまま、`/this-page-does-not-exist` が 404 のまま新アプリの 404 ページ(`<title>` が `404 NOT FOUND | AIプログラミングスクール SiiD`)になること

### 5. ロールバック(2 段階。DNS には触らない、06 §6)

| 戻したい範囲 | 操作 | 結果 |
|---|---|---|
| **コーポレート側 404 の差し替えだけ**を止める | ルートを `bug-fix.org/*` → `bug-fix.org/siid*` に戻す | `/siid` は新アプリのまま。`bug-fix.org/*` の 404 は GitHub Pages 既定に戻る。Worker のコードは `/siid` 以外を素通りさせるので戻さなくてよい |
| **`/siid` ごと**旧サイトへ戻す | ルートを削除する | 即座に現行サイト(GitHub Pages)へ戻る。§4 の旧 URL 301 も効かなくなる |

コーポレート側 404 の不具合対応でルートを**削除**しないこと。`/siid` まで旧サイトに戻ってしまう。
