# 03. 未実装ページ仕様

各ページは 1 Issue = 1 feature ブランチ = 1 PR で実装する([04_workflow.md](./04_workflow.md))。
実装時は必ず Figma の該当ノードを `get_design_context` で取得し、既存の下層ページ(`/service`, `/community`)の実装パターン(Headline / Breadcrumb / ContentsArea 構成、CSS Modules 命名)を踏襲する。

## 3-1. `/courses` コース一覧【実装済み 2026-07】

- Figma: `B-1 コース一覧` PC (3506:9919) / SP (3506:6335)
- 構成: コース紹介(3カード) → リスキルバナー → コースによる違い(比較表) → コース選びアドバイス → LINE バナー
- データ: `src/data/coursePlans.json` + `src/lib/getCoursePlans.ts`。コンポーネントは `src/components/Courses/` 配下
- アセット: `public/images/courses/`(Figma から書き出した SVG / 言語ロゴ PNG。SVG は `var(--fill-0)` を実色に置換済み — img 参照では CSS 変数が解決されないため)
- **実装時判断・デザイン側への確認事項**:
  - 比較表「実施内容」の行ラベルと値の対応は Figma の見た目どおりに実装したが、内容的に 1 行ズレている疑いあり(チャット=初回のみ 等)→ デザイナー確認待ち
  - アドバイス欄の悩みバッジ番号が Figma では 01/03/03 になっている等の番号錯誤 → 01/02/03 に正規化。Career 列の悩み 02 と 03 が同一文言なのは Figma のまま
  - LINE バナーのリンク先 URL 未確定(`LineBanner.tsx` の TODO)
  - 「※Fullsuport,VIP Editionコースのみ」のタイポは原文ママ

## 3-2. アフターサポート【対応済み 2026-07 / Issue #11】

- **結論: 独立した `/after-support` ページは作らない**。アフターサポートの実体は `/service` ページ内の `Support` セクション(見出し「アフターサポート」＋5項目、`src/components/Support/`・`src/components/SupportList/`)であり、デザインは `D-1 サービス一覧`(3506:10951 / SP 3506:7084)に含まれる。
- ナビ/フッターは「アフターサポート」(旧 `comingSoon: true` の無効表示 / リンク先 `/after-support` は実体なし)を廃止し、**「サービス一覧」→ `/service`** に置き換えた(`src/constants/menuItems.ts`)。既存 `Support` セクションへは `/service` 経由で到達する。
- Figma 確認記録: §3-2 が挙げていた H-1 系候補ノードのうち実在するのは `3506:11730` = 「H-1 409」= 404 デザインのみで、アフターサポート専用フレームは存在しなかった。

## 3-2b. `/line` LINE登録で無料体験【実装済み 2026-07】

- Figma: `G-1 LINE登録` PC (3506:11427) / SP (3506:6128)
- ルート: `G-1 LINE登録` は `/contact` 候補フレームだったが、**独立した LINE 登録ランディングページ `/line`** として実装(ユーザー確認済み）
- 構成: 共通下層ヘッダー(Headline / Breadcrumb)→ LINE 登録ヒーロー(スマホモックアップ・QR・友だち追加ボタン)→ 特典グリッド(星バッジ付き 10 枚カード)
- LINE 登録ヒーローは **カード全体が LINE 友だち追加リンク**(クリッカブルエリアを広く確保。PR #25 レビュー反映)。SP でも PC のレイアウト(スマホ左＋本文＋QR/ボタン)を維持し、大きな縦積み組み替えはしない
- データ: `src/data/linePresents.json` + `src/lib/getLinePresents.ts`。コンポーネントは `src/components/Line/`(`LineHero` / `LinePresents` / `Eyebrow`)配下
- アセット: `public/images/line/`(Figma から書き出した QR・スマホ画面・LINE ロゴ、特典カードは各画像グループを 1 枚に flatten したスクリーンショット)
- CTA(友だち追加ボタン)のリンク先: `https://siid.bug-fix.org/line/open/...`(セイト先生公式 LINE の友だち追加 URL。ユーザー提供）
- **デザイン差異・要確認**:
  - PC は「Present / 10つの特典」(10 枚)、SP は「Features / ９つの特典」(9 枚)で不一致 → より完全な **PC 版(10 枚・Present)** を採用。デザイナー確認待ち
  - 特典カードのプレビュー画像は装飾的なコラージュのため、各グループを 1 枚の PNG に flatten して掲載
  - `/line` はまだナビ・フッター・LINE バナー(`LineBanner` の `LINE_URL`)から未リンク。導線の接続方針は要確認

## 3-3. `/contact` 問い合わせ導線

- 現状: 未実装。`ContactButton` のリンク先(現状 404)
- **確定**: フォームのバックエンドは外部フォームサービスを使う(2026-07 ヒアリング)
- **未確定(着手前にユーザー確認)**:
  1. Figma に `G-1 LINE登録` (3506:11427 / SP 3506:6128) はあるが「contact フォーム」のデザインは見つかっていない。`/contact` の実体は (a) フォームページ (b) LINE 登録ページ (c) 外部リンク のどれか
  2. 外部フォームサービスの選定(候補: SSGform=国産・無料枠あり / Formspree / HubSpot Forms)。スパム対策(reCAPTCHA 等)込みで選ぶ
  3. `/counseling`(無料カウンセリング、meta.ts に定義済み)との関係

## 3-4. 404 Not Found

- Figma: `H-1 408` (3506:11639) に 404 デザインあり
- 構成: ヘッダー+「404 NOT FOUND」大見出し+お詫びテキスト+パンくず+ SiiD カードのトランプ風ゲーム要素+フッター
- デザイン内の付箋コメントに「カードにうんちく的な言葉が入ったら面白い」「ぜひこのゲームも検討ください」とあり → **カードめくりのインタラクション**(クリックでフリップして豆知識表示)を実装する。凝りすぎない範囲で 1 日以内の作業量に収める
- 実装: `src/app/not-found.tsx`(App Router 規約)

## 3-5. OGP / favicon(付帯タスク)

- Figma に `ogp` (4265:8754, 1200×630) / `favicon.ico` (4265:8761, 48×48) / `apple-touch-icon` (4265:8766, 180×180) が用意済み
- デプロイ前に書き出して `src/app/` に配置し、`metadata` に設定する([05_deploy.md](./05_deploy.md) の公開チェックリストに含む)

## 未確定事項

- 3-2 のデザイン所在 / 3-3 の 3 点 / `/counseling` の扱い(01 参照)
