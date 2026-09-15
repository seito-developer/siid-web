# 05. デプロイ・公開計画(Vercel)

ホスティングは **Vercel** に確定(2026-07 ヒアリング)。期限制約なし・品質優先。

## 環境構成

| 環境 | ブランチ | URL |
|------|---------|-----|
| Production | `main` | `https://bug-fix.org/siid`(Cloudflare Worker が Vercel デプロイの `/siid/*` をリバースプロキシする。[06_migration.md](./06_migration.md) 参照。Vercel へのカスタムドメイン割り当ては不要) |
| Staging / Preview | `develop`(デフォルトブランチ)・各 feature ブランチ / PR | Vercel が自動発行 |

> **Production = `main`**(2026-08 変更)。従来は「ブランチ数を増やさない」ため `develop` = Production としていたが、公開後は develop へのマージがそのまま本番反映となり、検証を挟めない。`main` を置くことで「develop で統合・検証 → リリース時に develop → main の PR をマージして本番反映」というリリースゲートを設ける。日常の feature PR のマージ先は従来どおり `develop` のままで変わらない。
>
> Worker は Vercel の既定 URL(`https://siid-web-theta.vercel.app`)を叩き、この URL は常に最新の **Production デプロイ**(= `main`)を指す。したがって develop へのマージは本番サイトに影響しない。

## セットアップ手順(M3 で実施)

1. Vercel アカウントに GitHub リポジトリ `seito-developer/siid-web` を Import
2. Framework Preset: Next.js(設定は自動検出)
3. **Production Branch を `main` に設定**(Settings → Git。既定では GitHub のデフォルトブランチ `develop` が選ばれるため必ず変更する)
4. Environment Variables に計測タグ ID と microCMS の接続情報を登録(下記「計測タグ(アナリティクス)」「microCMS(SiiD BLOG 連携)」参照)
5. PR ごとの Preview Deploy を有効化 → 以降の PR はプレビュー URL で動作確認できる
6. 本番ドメインの割り当ては**不要**(Cloudflare Worker が Vercel の既定 URL `https://siid-web-theta.vercel.app/siid/*` をプロキシする方式のため。[06_migration.md](./06_migration.md) §3)
7. `next.config.ts` の `remotePatterns`(`images.microcms-assets.io` / `img.youtube.com`)が本番でも機能することを確認

### vercel.app 直 URL の検索インデックス対策

Vercel の既定 URL(`*.vercel.app`)は公開されるため、本番(`bug-fix.org/siid`)との重複インデックスを防ぐ必要がある。対策は二重:

- 全ページの canonical が `SITE_URL`(= `https://bug-fix.org/siid`)起点で出力される(Issue #36)
- `next.config.ts` の `headers()` で、Host が `*.vercel.app` のリクエストに `X-Robots-Tag: noindex` を付与(Issue #14)

**注意(Worker 側の必須対応)**: Vercel にカスタムドメインを割り当てないため、Cloudflare Worker のプロキシ fetch も Host は `*.vercel.app` となり、**本番向けレスポンスにもこのヘッダーが付く**。Worker は `bug-fix.org` へ中継する応答から `X-Robots-Tag` を必ず除去すること([06_migration.md](./06_migration.md) §3.2、Issue #47 の実装要件)。除去し忘れると本番サイト全体が noindex になる。

## microCMS(SiiD BLOG 連携)

TOP の News(「コラム」記事)と卒業生の進路(「受講生様インタビュー」記事。TOP スライダー・`/career-path`)は、ビルド時・ISR 再検証時にサーバー側で microCMS から取得する(`src/lib/getNews.ts` / `getInterviews.ts`)。

| 環境変数 | 値 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | `https://XXXX.microcms.io` の XXXX |
| `MICROCMS_API_KEY` | 読み取り(GET)用 API キー |

- いずれもサーバー専用(`NEXT_PUBLIC_` を付けない)。値は microCMS 管理画面から取得する。
- **Production と Preview の両方にチェックを入れる。** Preview に無いと、`develop` や PR のプレビューで News が空になり、`/career-path` が「インタビュー記事を読み込めませんでした」になる(2026-09-11、PR #78 のプレビューで発生)。リリース前の検証がプレビューで行えなくなるため必須。
- 環境変数の追加・変更は**既存デプロイには反映されない**。追加後は該当デプロイを Redeploy する。

## 計測タグ(アナリティクス)

現行サイト(https://bug-fix.org/siid)の計測タグを**全て**引き継ぐ(Issue #19)。ID は `NEXT_PUBLIC_*` 環境変数で管理し、`src/components/Analytics/`(`Analytics` / `GtmNoScript` / `analyticsConfig`)が両ルートレイアウトで出力する。ローカルは `.env.local`、本番は Vercel の Environment Variables に同名で登録する(`.env.example` 参照)。

| 種別 | ツール | 環境変数 | 値 |
|------|--------|----------|-----|
| Google Analytics | GA4(gtag.js) | `NEXT_PUBLIC_GA_ID` | `G-54L1JQ7Q7V` |
| Google Tag Manager | GTM(複数コンテナ・カンマ区切り) | `NEXT_PUBLIC_GTM_IDS` | `GTM-58D75LLL,GTM-PCDDS7MV,GTM-NWT5NTNS` |
| ヒートマップ | UserHeat | `NEXT_PUBLIC_USERHEAT_ID` | `uhR7AfnJKz` |
| CX / 行動計測 | KARTE | `NEXT_PUBLIC_KARTE_ID` | `81f5dc95580fe42385d93c4da40b387e` |
| 広告計測 | OpenAI Ads ピクセル | `NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID` | `DNSeeLpdRTGGyfec5wUced` |

> 現行サイトでは同一 GTM コンテナが重複読み込みされていたため、新サイトではコンテナごとに 1 回に集約した。`GTM-NWT5NTNS` は現行サイトでは noscript のみの部分的な設置だったが、計測漏れを避けるため script/noscript とも正式に読み込む(不要なら env から外す)。OpenAI Ads の `__bugfixTrackOpenAIAds` は基盤ピクセルのみ移植し、旧サイト固有のボタンイベント計測は新サイトの DOM に合わせて別途配線が必要。Search Console の登録要否は別途ユーザー確認。

## SEO 実装(Issue #36)

現行サイトへの SEO コンサル指摘のうち本リポジトリに該当する項目を Issue #36 で対応済み。

- **サイト URL**: `NEXT_PUBLIC_SITE_URL`(未設定時は `https://bug-fix.org/siid`)を `src/constants/meta.ts` の `SITE_URL` で参照。canonical・OGP・sitemap の絶対 URL 生成に使用
- **metadata**: `buildPageMetadata()`(`src/constants/meta.ts`)が title / description / canonical / openGraph / twitter を一括生成。全ページで使用。`/counseling/complete` は noindex
- **OGP 画像**: `public/ogp.png`(1200×630、Figma 4265:8754)。favicon は `src/app/favicon.ico`(16/32/48px、Figma 4265:8761)、apple-touch-icon は `src/app/apple-icon.png`(180px、Figma 4265:8766、Next.js のファイル規約で自動配線)
- **sitemap**: `src/app/sitemap.ts`(`/sitemap.xml`)。GSC には sitemap URL を直接送信する。**robots.txt はドメインルート(bug-fix.org)でのみ有効なため本リポジトリでは実装せず、別プロジェクト(現行サイト側)で対応する**(PR #37 レビューでの決定)
- **構造化データ**: TOP に Organization の JSON-LD(`src/components/JsonLd/JsonLd.tsx`)
- **画像**: 300KB 超の PNG/JPG を WebP 化(`courses/langs/` はディレクトリごと変換)。意味のある画像の空 alt を解消(装飾 SVG は空 alt を維持)。**例外**: `strengthcard/*.png` は APNG(アニメーション付き)のため WebP 変換対象外(変換するとアニメーションが失われる)

## 見出し構造(2026-09-15・Issue #95)

SEO コンサルのレポート No.14(本文の章見出しに h1)と同種の問題が本体側にもあったため、次の方針に統一した。

- **h1 は 1 ページに 1 つ。日本語でページ内容を表す。**
  - 下層ページ: `Headline` の**日本語**(`subTitle`)が h1。英語(`title`)は飾りのラベルなので `span`
  - TOP: FV のメインコピーが h1。SVG でテキストとして読めないため、同じ文言(`人生を切り開く、あなたらしい学びと進み方を見つける`)を視覚的非表示で入れ、SVG 側は `aria-hidden` で装飾扱いにしている
- セクション見出しは h2 以下。`News` の `</ News >` は h2
- **タグを入れ替えても見た目を変えないこと。** 入れ替えで行ボックスが変わるため、`Headline__SubTitle` は `display: inline`、`Headline__Title` は `display: block` を明示している(この指定を外すと下層ページの高さが 6px ずれる)

---

## 公開前チェックリスト

- [x] OGP 画像 / favicon / apple-touch-icon の設定(Figma 4265:8754 / 4265:8761 / 4265:8766 から書き出し)(Issue #36)
- [x] `metadata`(title / description / OGP)が全ページ設定済み(Issue #36)
- [x] 404 ページ実装済み(`src/app/not-found.tsx` + `(Main)/[...notFound]`)
- [x] ナビ・フッターの全リンクが 404 にならない(現ナビは実装済みページのみ参照。コース系リンクは `/` へのプレースホルダー)
- [ ] Lighthouse(モバイル)Performance 80+ / SEO 90+ / Accessibility 90+ → **2026-09-15 計測: Performance 47 / Accessibility 82 / Best Practices 79 / SEO 100 相当**(計測値は 66 だが、落ちているのは Vercel 直 URL の noindex のみで本番では該当しない)。現行サイトは Performance 55 / A11y 80 で、転送量(3,159KB → 2,717KB)と FCP(11.1s → 9.1s)は改善。未達分は公開後対応として Issue #84(A11y)・#85(Performance)を起票済み
- [x] 検索インデックス方針: noindex 期間は設けず、公開と同時に index 可とした(2026-09-15)
- [x] 計測タグの環境変数を Vercel に登録済み。本番 HTML に GA4・GTM 3 本・UserHeat・KARTE・OpenAI Ads がすべて出力されることを確認(2026-09-15)
- [x] Google Search Console: `bug-fix.org` のプロパティは既存(運用中)。`https://bug-fix.org/siid/sitemap.xml` を送信し「成功しました / 検出されたページ数 12」を確認(2026-09-15)。公開 1〜2 週間後に「ページ(インデックス作成)」で 404 の急増が無いか確認すること

## 未確定事項

- なし(2026-09-15 時点)

> 本番ドメインは `https://bug-fix.org/siid`(Cloudflare Worker プロキシ方式)で確定済み。旧 URL からのリダイレクトは [06_migration.md](./06_migration.md) §4(Issue #48)で扱う。
