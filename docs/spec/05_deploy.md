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
2. Framework Preset: Next.js(設定は自動検出。環境変数は現状なし)
3. PR ごとの Preview Deploy を有効化 → 以降の PR はプレビュー URL で動作確認できる
4. 本番ドメインの割り当て(ドメイン未確定 → ユーザーに確認)
5. `next.config.ts` の `remotePatterns`(img.youtube.com)が本番でも機能することを確認

## 公開前チェックリスト

- [ ] OGP 画像 / favicon / apple-touch-icon の設定(Figma 4265:8754 / 4265:8761 / 4265:8766 から書き出し)
- [ ] `metadata`(title / description / OGP)が全ページ設定済み
- [ ] 404 ページ実装済み
- [ ] ナビ・フッターの全リンクが 404 にならない(`/after-support`, `/contact` 実装完了が前提)
- [ ] Lighthouse(モバイル)Performance 80+ / SEO 90+ / Accessibility 90+
- [ ] 検索インデックス方針の確認(公開前に noindex が必要な期間はあるか → ユーザー確認)
- [ ] Google Search Console / Analytics の要否(→ ユーザー確認)

## 未確定事項

- 本番ドメイン(現行の https://bug-fix.org/siid からの移行・リダイレクト要否も含む)
- Analytics / Search Console 導入の要否
