# 05. デプロイ・公開計画(Vercel)

ホスティングは **Vercel** に確定(2026-07 ヒアリング)。期限制約なし・品質優先。

## 環境構成

| 環境 | ブランチ | URL |
|------|---------|-----|
| Production | `main` | `https://bug-fix.org/siid`(Cloudflare Worker が Vercel デプロイの `/siid/*` をリバースプロキシする。[06_migration.md](./06_migration.md) 参照。Vercel へのカスタムドメイン割り当ては不要) |
| Staging / Preview | `develop`(デフォルトブランチ)・各 feature ブランチ / PR | Vercel が自動発行 |

> **Production = `main`**(2026-08 変更)。従来は「ブランチ数を増やさない」ため `develop` = Production としていたが、公開後は develop へのマージがそのまま本番反映となり、検証を挟めない。`main` を置くことで「develop で統合・検証 → リリース時に develop → main の PR をマージして本番反映」というリリースゲートを設ける。日常の feature PR のマージ先は従来どおり `develop` のままで変わらない。
>
> Worker は Vercel の既定 URL(`https://<siid-web>.vercel.app`)を叩き、この URL は常に最新の **Production デプロイ**(= `main`)を指す。したがって develop へのマージは本番サイトに影響しない。

## セットアップ手順(M3 で実施)

1. Vercel アカウントに GitHub リポジトリ `seito-developer/siid-web` を Import
2. Framework Preset: Next.js(設定は自動検出)
3. **Production Branch を `main` に設定**(Settings → Git。既定では GitHub のデフォルトブランチ `develop` が選ばれるため必ず変更する)
4. Environment Variables に計測タグ ID を登録(下記「計測タグ(アナリティクス)」参照)
5. PR ごとの Preview Deploy を有効化 → 以降の PR はプレビュー URL で動作確認できる
6. 本番ドメインの割り当ては**不要**(Cloudflare Worker が Vercel の既定 URL `https://<siid-web>.vercel.app/siid/*` をプロキシする方式のため。[06_migration.md](./06_migration.md) §3)
7. `next.config.ts` の `remotePatterns`(img.youtube.com)が本番でも機能することを確認

### vercel.app 直 URL の検索インデックス対策

Vercel の既定 URL(`*.vercel.app`)は公開されるため、本番(`bug-fix.org/siid`)との重複インデックスを防ぐ必要がある。対策は二重:

- 全ページの canonical が `SITE_URL`(= `https://bug-fix.org/siid`)起点で出力される(Issue #36)
- `next.config.ts` の `headers()` で、Host が `*.vercel.app` のリクエストに `X-Robots-Tag: noindex` を付与(Issue #14)

**注意(Worker 側の必須対応)**: Vercel にカスタムドメインを割り当てないため、Cloudflare Worker のプロキシ fetch も Host は `*.vercel.app` となり、**本番向けレスポンスにもこのヘッダーが付く**。Worker は `bug-fix.org` へ中継する応答から `X-Robots-Tag` を必ず除去すること([06_migration.md](./06_migration.md) §3.2、Issue #47 の実装要件)。除去し忘れると本番サイト全体が noindex になる。

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

## 公開前チェックリスト

- [x] OGP 画像 / favicon / apple-touch-icon の設定(Figma 4265:8754 / 4265:8761 / 4265:8766 から書き出し)(Issue #36)
- [x] `metadata`(title / description / OGP)が全ページ設定済み(Issue #36)
- [x] 404 ページ実装済み(`src/app/not-found.tsx` + `(Main)/[...notFound]`)
- [x] ナビ・フッターの全リンクが 404 にならない(現ナビは実装済みページのみ参照。コース系リンクは `/` へのプレースホルダー)
- [ ] Lighthouse(モバイル)Performance 80+ / SEO 90+ / Accessibility 90+
- [ ] 検索インデックス方針の確認(公開前に noindex が必要な期間はあるか → ユーザー確認)
- [ ] 計測タグ(GA4 / GTM / UserHeat)の環境変数を Vercel に登録済み(「計測タグ(アナリティクス)」参照)
- [ ] Google Search Console の登録要否(→ ユーザー確認)

## 未確定事項

- Google Search Console 導入の要否(Analytics タグは Issue #19 で引き継ぎ済み)

> 本番ドメインは `https://bug-fix.org/siid`(Cloudflare Worker プロキシ方式)で確定済み。旧 URL からのリダイレクトは [06_migration.md](./06_migration.md) §4(Issue #48)で扱う。
