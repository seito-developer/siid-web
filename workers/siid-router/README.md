# siid-router(Cloudflare Worker)

`bug-fix.org` の前段で **`/siid` 配下だけを Vercel の新アプリへリバースプロキシする** Worker(Issue #47)。
URL は `bug-fix.org/siid/...` のまま、中身を `https://siid-web-theta.vercel.app` から返す。
それ以外のパス(コーポレートサイト)はオリジン(GitHub Pages)へそのまま通す。

設計の根拠は [docs/spec/06_migration.md](../../docs/spec/06_migration.md) §3.2・§5・§6。

## 振り分け

| リクエストのパス | 行き先 |
|---|---|
| ホストが `bug-fix.org` で、パスが `/siid` と完全一致または `/siid/` で始まる | Vercel の新アプリ(同じパス・クエリ) |
| それ以外(`/`・`/siid-xxx`・`workers.dev` など別ホスト) | オリジンへそのまま |

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
2. Zone: `bug-fix.org`、Route: `bug-fix.org/siid*` を追加
3. 06 §8 のチェックリストで確認する。最低限:

```bash
curl -sI https://bug-fix.org/ | grep -i '^server'                    # GitHub.com のまま(コーポレート無傷)
curl -sI https://bug-fix.org/siid | grep -iE '^server|^x-robots-tag|^strict-transport'  # Vercel、かつ x-robots-tag と HSTS が出ないこと
curl -sI https://bug-fix.org/siid/lp-1 | grep -iE '^HTTP|^location'  # 301 → /siid/lp-career
curl -sI https://siid-web-theta.vercel.app/siid | grep -i '^x-robots-tag'  # 直 URL は noindex のまま
```

`www.bug-fix.org` はルートに含めない。`www` は GitHub Pages が `bug-fix.org` へ転送するため、転送後のリクエストが上記ルートに乗る。

### 4. ロールバック

**手順 3 で追加したルートを削除するだけ**で、即座に現行サイト(GitHub Pages)へ戻る。DNS には触らない(06 §6)。
