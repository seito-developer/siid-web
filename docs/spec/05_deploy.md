# 05. デプロイ・公開計画(Vercel)

ホスティングは **Vercel** に確定(2026-07 ヒアリング)。期限制約なし・品質優先。

## 環境構成

| 環境 | ブランチ | URL |
|------|---------|-----|
| Production | `develop`(現デフォルト) | 本番ドメイン(未確定) |
| Preview | 各 feature ブランチ / PR | Vercel が自動発行 |

> `main` ブランチを別途作って Production に割り当てる運用も可能だが、現状はブランチ数を増やさず `develop` = Production とする。リリース頻度が上がったら見直す。

## セットアップ手順(M3 で実施)

1. Vercel アカウントに GitHub リポジトリ `seito-developer/siid-web` を Import
2. Framework Preset: Next.js(設定は自動検出)
3. Environment Variables に計測タグ ID を登録(下記「計測タグ(アナリティクス)」参照)
4. PR ごとの Preview Deploy を有効化 → 以降の PR はプレビュー URL で動作確認できる
5. 本番ドメインの割り当て(ドメイン未確定 → ユーザーに確認)
6. `next.config.ts` の `remotePatterns`(img.youtube.com)が本番でも機能することを確認

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

## 公開前チェックリスト

- [ ] OGP 画像 / favicon / apple-touch-icon の設定(Figma 4265:8754 / 4265:8761 / 4265:8766 から書き出し)
- [ ] `metadata`(title / description / OGP)が全ページ設定済み
- [ ] 404 ページ実装済み
- [ ] ナビ・フッターの全リンクが 404 にならない(`/after-support`, `/contact` 実装完了が前提)
- [ ] Lighthouse(モバイル)Performance 80+ / SEO 90+ / Accessibility 90+
- [ ] 検索インデックス方針の確認(公開前に noindex が必要な期間はあるか → ユーザー確認)
- [ ] 計測タグ(GA4 / GTM / UserHeat)の環境変数を Vercel に登録済み(「計測タグ(アナリティクス)」参照)
- [ ] Google Search Console の登録要否(→ ユーザー確認)

## 未確定事項

- 本番ドメイン(現行の https://bug-fix.org/siid からの移行・リダイレクト要否も含む)
- Google Search Console 導入の要否(Analytics タグは Issue #19 で引き継ぎ済み)
