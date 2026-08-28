# 01. プロジェクト概要

## サイト概要

ITエンジニア転職 × 生成AI特化プログラミングスクール「SiiD」(運営: 合同会社BugFix)のサービスサイト。
サイトの狙いは **「かっこいい、すごい」と思わせる第一印象** と、無料カウンセリング・LINE 登録へのコンバージョン。

- 想定ユーザー: プログラミングスクールを検討している転職希望者(20〜30代中心)
- デザイントーン: メインカラー `#567eb4`(青)、背景 `#f1f1f1`、テキスト `#342525`(こげ茶)。角丸・カード・ステッカー風の遊びのあるポップさ × テック感

## 技術スタック(確定事項)

| 項目 | 選定 | 備考 |
|------|------|------|
| Framework | Next.js 15 (App Router) | 既存 |
| アニメーション | **GSAP** | 2026-07 ヒアリングで確定。オープニング演出・スクロール演出に使用 |
| ホスティング | **Vercel** | 2026-07 ヒアリングで確定 |
| ブログCMS | **microCMS** | 2026-07 確定(Issue #30)。SiiD BLOG(`blog.bug-fix.org`)のヘッドレスCMS。TOPページ News セクションが `blog` エンドポイントから「コラム」カテゴリ最新記事を取得。`microcms-js-sdk` 使用・サーバー側取得 |
| 問い合わせフォーム | **外部フォームサービス** | サービス選定は未確定([03_pages.md](./03_pages.md) 参照) |
| Styling | CSS Modules + CSS Custom Properties | 既存。Tailwind 等は導入しない |
| Slider | Swiper 12 | 既存 |
| Game | **Phaser 3.90** | 2026-07 確定(Issue #24)。404ページのミニゲーム専用。`next/dynamic` + `ssr: false` で404ページ限定ロード |

## ページ一覧と実装状況

| URL | 状態 | Figma フレーム(主なもの) |
|-----|------|------------------|
| `/` | 実装済み(オープニング演出 `Opening` 実装済み。News は microCMS 連携・`revalidate = 600`) | `TOP_nomal` (3506:8246), `TOP` (3595:9208 / 3600:11840) |
| `/career-path` → `/career-path/[page]` | 実装済み | `C-1 卒業生の進路` (3506:10507), モーダル (3506:10655), SP (3506:5977) |
| `/courses` | 実装済み(比較表・プラン。プラン別アンカーは `COURSE_PLAN_ANCHOR_IDS`) | `B-1 コース一覧` (3506:9919), SP (3506:6335) |
| `/community` | 実装済み | `E-1 コミュニティの雰囲気` (3506:11116), SP (3506:7723) |
| `/service` | 実装済み | `D-1 サービス一覧` (3506:10951), SP (3506:7084) |
| `/after-support` | **独立ページ無し**(Issue #11)。実体は `/service` 内 `Support` セクション。ナビは『サービス一覧』→ /service に変更 | `D-1 サービス一覧` 内(3506:10951) |
| `/line` | 実装済み(2026-07) | `G-1 LINE登録` PC (3506:11427) / SP (3506:6128) |
| `/counseling` | 実装済み。`ContactButton` のリンク先 | 要確認 |
| `/counseling/complete` | 実装済み(予約完了・CV 計測、noindex) | Figma 対応なし |
| `/counseling-complete` | 実装済み(旧 URL 互換、noindex) | Figma 対応なし |
| `/contact` | **ルートとして存在しない**。実体は `/counseling` | — |
| 404 | 実装済み(2026-07 / Issue #24)。dino風ミニゲーム付き。`(Main)/[...notFound]` の catch-all で未知 URL を着地させる | `H-1 409` (3506:11730)。H-1 410〜413 は存在しないことを確認済み(SP はPC縮小構成) |
| `/lp-1` | 実装済み(2026-07 / Issue #40)。旧サイト `bug-fix.org/siid/lp-1` から移植した広告流入用の独立LP。共通クローム無し・noindex。root layout は `(Lp)/layout.tsx` | Figma 対応なし(旧LPの忠実再現) |
| `/counseling-complete-lp-1` | 実装済み(2026-07 / Issue #40)。旧サイトから移植した申込完了ページ(noindex)。OpenAI Ads CV計測 `appointment_scheduled` を発火 | Figma 対応なし |
| `/white-paper` | 実装済み(2026-07 / Issue #40)。旧サイトから移植した資料請求ページ(公式LINE誘導) | Figma 対応なし |

> ルーティングの実体は `src/app/` のディレクトリ構成、URL とメタデータの実体は `src/constants/meta.ts` が唯一の情報源。
> この表と食い違ったらコードが正で、気付いた時点でこの表を直す。

## TOPページ News セクション（microCMS 連携・Issue #30 / #55）

- SiiD BLOG（microCMS）の `blog` エンドポイントから「コラム」カテゴリの最新記事を取得して表示。記事クリックで該当記事（`https://blog.bug-fix.org/blog/{id}`）へ遷移。
- 取得ロジックは `src/lib/getNews.ts`（サーバー側実行）。`categories[contains]column` で絞り込み、`publishedAt` 降順で最大3件。ISR で 600 秒ごとに再検証。カテゴリID `column` は変更予定がないため定数で固定。
- `News.tsx` は props で記事を受け取る Server Component、スワイプ/矢印カルーセルUXは `NewsCarousel.tsx`（Client Component）に分離。取得は `src/app/(Main)/page.tsx` が `getNews()` を呼んで行う。
- 表示形式は **`yyyy/mm/dd | title`**（`NewsPost.tsx`）。`|` は `.NewsPost__date::after` の擬似要素、タイトルは 2 行で省略。
  - 日付は `Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', ... })` で整形する。`publishedAt` は UTC のため、タイムゾーンを固定しないとサーバー（UTC）とクライアント（JST）で表示がズレて Hydration Error になる。
- 「SiiD Techブログ」への導線リンクは Issue #55 で削除済み（再追加しないこと）。
- 環境変数（サーバー専用・`.env.local` / Vercel に設定。`.env.example` 参照）:

  | 変数 | 説明 |
  |------|------|
  | `MICROCMS_SERVICE_DOMAIN` | `XXXX.microcms.io` の XXXX |
  | `MICROCMS_API_KEY` | 読み取り用 API キー |

- `blog` エンドポイントの `categories` は複数参照フィールドのため、絞り込みは `equals` ではなく `contains` を使う。
- 環境変数未設定・取得失敗時は空配列を返し、News は「現在お知らせはありません。」を表示（ページ全体は落とさない）。
- **切り分け方法（Issue #55）**: 失敗ケースは全て同じ「現在お知らせはありません。」になるため、`getNews()` は原因を `console.error` / `console.warn` に出力する。表示されない場合は **Vercel の Runtime Logs** を確認する。
  | ログ | 原因 |
  |------|------|
  | `microCMS の環境変数が未設定` | Vercel の Environment Variables 未登録、または対象環境（Production / Preview）に未設定 |
  | `microCMS から 0 件が返りました` | `filters` の不一致（カテゴリID・フィールド名） |
  | `microCMS からの記事取得に失敗しました` | エンドポイント名の誤り（404）・API キーの権限不足（401）・タイムアウト |
- **環境変数を追加・変更したら再デプロイが必要**（Vercel の環境変数は既存デプロイには反映されない）。
- 再検証は `getNews()` 内の fetch だけでなく、`src/app/(Main)/page.tsx` の `export const revalidate = 600` でもルート単位に指定する。環境変数未設定などで fetch 自体が実行されないとページが完全な静的扱いになり二度と再生成されないため（Issue #55）。

## Figma デザインデータ

- ファイル: [合同会社BugFix様_サービスサイト制作 (Copy)](https://www.figma.com/design/5TmLXYMQDXuXx163rxpGTD/)（2026-07: オーナーの有料アカウントに複製したコピー。**MCP からはこちらを参照する**。ノード ID は元ファイルと共通）
- 元ファイル: [合同会社BugFix様_サービスサイト制作](https://www.figma.com/design/hEk4Ox1q0cTVzzVPoSz5lV/)（View シートのためレート制限が厳しい）
- 実装対象デザインはページ `0:1` 内の canvas `1:3`(name: Design)に集約。「納品デザイン」フレーム (3562:8989) もあり
- 「整理」セクション (3809:8023) にはデザインガイドライン(ロゴ・カラー・フォント・アニメーション方針・KV構成)が含まれる

### ⚠️ Figma MCP 利用上の制約

現在の Figma シートは **View シート(Professional プラン)のため MCP ツールコール数に強いレート制限がある**。実装時は:

1. 必要なノード ID を上表から特定してから最小回数で `get_design_context` / `get_screenshot` を呼ぶ
2. スクリーンショットは URL 経由で curl ダウンロードする(base64 は使わない)
3. 制限に達したら翌日まで待つか、Dev シートへのアップグレードを検討する

### アニメーションに関するデザイナー方針と現在の方向性

Figma 内「アニメーションについて」(3235:2345) にはデザイナー側の初期方針として「過度なアニメーションは避け、さりげない表現(パララックス/ホバー/イーズイン)」とある。
一方、2026-07 のオーナーヒアリングで **オープニング演出は「ダイナミック・大胆」路線に決定**した。方針の優先順位:

1. オープニング(ローディング → FV)は大胆に作り込む([02_opening-animation.md](./02_opening-animation.md))
2. ただしスクロールジャック(マウス制御で縦横に動くスクロール)や WebGL 依存の重い表現は採用しない(デザイナー方針と同じ)
3. FV 以降のページ内アニメーションは従来どおり控えめ(fade-in 等)

## 品質基準

- コミット前に `npm run lint && npm run typecheck` を必ず通す
- アニメーションは `transform` / `opacity` / `clip-path` のみで実装し、レイアウトリフローを起こさない
- `prefers-reduced-motion` を尊重する
- Lighthouse (モバイル) Performance 80 以上を維持する(オープニング演出導入後も LCP を悪化させない)

## 未確定事項

- 問い合わせフォームの外部サービス選定([03_pages.md](./03_pages.md) 参照)
