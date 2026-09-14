# CLAUDE.md — SiiD Web プロジェクト向け Claude Code ガイド

ITエンジニア転職 × 生成AI特化プログラミングスクール「SiiD」の Web サイトリポジトリです。

---

## 仕様書・開発ワークフロー（最重要）

**実装に着手する前に `docs/README.md` から該当する仕様書を必ず読むこと。**

- `docs/spec/01_project-overview.md` — 技術選定（GSAP / Vercel / 外部フォーム）・ページ実装状況・**Figma ノード ID 対応表とレート制限の注意**
- `docs/spec/02_opening-animation.md` — オープニング演出（ローディング→FV）の詳細仕様
- `docs/spec/03_pages.md` — 各下層ページ（courses / service / counseling / line ほか）の実装仕様
- `docs/spec/04_workflow.md` — Issue 駆動開発のルール（下記サマリ）
- `docs/spec/05_deploy.md` — Vercel デプロイ計画・公開前チェックリスト
- `docs/spec/06_migration.md` — 旧 `bug-fix.org/siid` からの移行・Cloudflare 前段方式のリリース計画
- `docs/spec/07_lp-career-renewal.md` — 広告流入用 LP（`/lp-career`）の実装仕様・入稿データ対応・Jicoo 予約フォーム連携
- `docs/spec/08_career-path-interviews.md` — 卒業生の進路（TOP スライダー・`/career-path`）の SiiD BLOG インタビュー記事連携

**ワークフローのサマリ**: GitHub Issue 起票 → develop から `feature/{issue番号}-{slug}` ブランチ → 実装 → lint+typecheck → develop 向け PR（`Closes #N`）→ `/code-review` でセルフレビュー・修正 → **マージはユーザーが行う**。main / develop への直接コミット禁止。実装タスクは `/feature-work` スキルに従う。

**ブランチ**: `main` = 本番（Vercel の Production Branch。develop からのリリース PR のみ受ける）/ `develop` = デフォルトブランチ・日常の PR マージ先。feature ブランチから直接 main へ PR を出さない。

仕様変更・ヒアリングでの決定事項は、実装 PR と同じ PR 内で該当仕様書に反映すること。

### 作業開始時の前提確認（毎セッション）

このリポジトリは複数のワークツリー（`~/orca/workspaces/*`・`.claude/worktrees/*` など）で並行作業しており、ローカルのブランチは `develop` より遅れていることが多い。**基準は常に `origin/develop`。** ローカルの `develop` へ switch / pull する手順は取らない（別のワークツリーが `develop` をチェックアウトしていると `already used by worktree` で失敗し、作業中の feature ブランチからも外れてしまうため）。

```bash
git fetch origin -q
git rev-list --left-right --count origin/main...origin/develop  # main と develop の乖離（リリース待ちのコミット数）
git log --oneline HEAD..origin/develop | head                   # 今いるブランチが develop から遅れている分
git switch -c feature/<N>-<slug> origin/develop                  # 新しい作業は origin/develop から直接切る
```

`git pull` だけを実行して「最新化した」と判断しないこと（今いるブランチが `develop` でなければ develop の変更は入らない）。

### ドキュメントとコードが食い違ったときの優先順位

**コードが正**。この CLAUDE.md や `docs/spec/` の記述と実装が矛盾していたら、コードを信じて作業を進め、**気付いた食い違いはその PR 内でドキュメント側を直す**（推測で実装を変えない）。特に次の情報は「コードが唯一の情報源」で、ドキュメントは要約に過ぎない：

| 情報 | 唯一の情報源 |
|------|------------|
| ページ URL / メタデータ | `src/constants/meta.ts` |
| ナビ・フッターのメニュー構成 | `src/constants/menuItems.ts` |
| SNS リンク | `src/constants/snsItems.ts` |
| ルーティング（実在するページ） | `src/app/` のディレクトリ構成 |

### 現況・残タスクの調べ方

「今どこまで進んでいる？」「残タスクは？」「クローズしてよい Issue は？」といった棚卸し系の依頼は `/project-status` スキル（`.claude/skills/project-status/`）の手順に従う。毎回ゼロから探索せず、1 バッチのコマンドで状況を取る。

---

## 開発コマンド

```bash
npm run dev        # 開発サーバー起動（Turbopack使用）
npm run build      # 本番ビルド
npm start          # 本番サーバー起動
npm run lint       # ESLint チェック
npm run typecheck  # TypeScript 型チェック（tsc --noEmit）
```

**コミット前に必ず実行：**
```bash
npm run lint && npm run typecheck
```

---

## 技術スタック

| 項目 | 詳細 |
|------|------|
| Framework | Next.js 15（App Router） |
| Language | TypeScript 5 |
| Styling | CSS Modules + CSS Custom Properties |
| Animation | GSAP 3.15（オープニング演出・スクロール演出） |
| CMS | microCMS（`microcms-js-sdk`。SiiD BLOG の「コラム」記事を TOP の News に、「受講生様インタビュー」記事を卒業生の進路に表示） |
| Game | Phaser 3.90（404ページのミニゲーム専用。`next/dynamic` + `ssr: false` で404ページ限定ロード） |
| Slider | Swiper 12 |
| CSS Reset | sanitize.css |
| Font | Google Fonts (Noto Sans JP, Poppins) + カスタムフォント (Bagor) |
| Lint | ESLint 9 (Flat Config) |
| Node.js | 18.17+ 推奨 20.x |

---

## ディレクトリ構造

**`src/app/` は `(Main)` と `(Lp)` の 2 つのルートグループに分かれており、それぞれが独立した root layout（`html`/`body`）を持つ。** 共通クロームを持つ通常ページは `(Main)`、広告流入用の独立 LP（`lp-career`）は `(Lp)`。

```
src/
├── app/                                  # Next.js App Router
│   ├── (Main)/                           # 通常ページ群（共通クロームあり）
│   │   ├── layout.tsx                    # root layout（html/body・GtmNoScript・Analytics・Icons・NavigationSp・Footer）
│   │   ├── page.tsx                      # TOPページ（Opening / Hero / News ほか。revalidate = 600）
│   │   ├── not-found.tsx                 # 404ページ（dino風ミニゲーム付き）
│   │   ├── [...notFound]/page.tsx        # どのグループにも一致しない URL を (Main) の 404 へ落とす catch-all
│   │   ├── Home.module.css
│   │   └── (LowerPages)/                 # 下層ページ（Header なし、NavigationPcLower あり）
│   │       ├── layout.tsx
│   │       ├── career-path/              # 卒業生の進路（page.tsx → /career-path/1 へリダイレクト、[page]/ が本体）
│   │       ├── community/                # SiiDコミュニティ
│   │       ├── counseling/               # 無料カウンセリング（complete/ = 予約完了・CV計測）
│   │       ├── counseling-complete/      # 旧 URL 互換の申込完了ページ
│   │       ├── courses/                  # コース一覧（比較表・プラン）
│   │       ├── line/                     # LINE 登録
│   │       ├── service/                  # サービス一覧（after-support の実体もここ）
│   │       └── white-paper/              # 資料請求
│   ├── (Lp)/                             # 広告流入用の独立LP（共通クローム・globals.css を持ち込まない）
│   │   ├── layout.tsx                    # LP 専用 root layout（Analytics・lp-base.css）
│   │   ├── fonts.ts / lp-base.css        # LP 用フォント・(Lp) 共通の基本スタイル（リセット・body。globals.css の代わり）
│   │   └── lp-career/                    # 広告流入用 LP（page.tsx・complete/・lp-career-tokens.css）
│   ├── sitemap.ts                        # sitemap.xml（career-path の全ページ番号を microCMS の件数から生成。robots.txt はルートドメイン側の別プロジェクトで対応）
│   ├── manifest.ts                       # Web App Manifest
│   ├── apple-icon.png                    # apple-touch-icon（Next.js ファイル規約で自動配線）
│   └── favicon.ico
├── components/                           # 再利用可能 UI コンポーネント（Opening / Hero / News / CareerPath / Courses / Counseling ほか。LP 用は LpCareer/）
├── constants/
│   ├── common.ts                         # BREAK_POINT(1280)、Google Fonts 設定
│   ├── meta.ts                           # ページメタデータ・URL 定数（commonTitle、pages、SITE_URL、buildPageMetadata()）
│   ├── menuItems.ts                      # ナビメニュー項目
│   ├── snsItems.ts                       # SNSリンク（snsItems / snsFooterItems）
│   ├── conversionFocusedPages.ts         # CV 重視ページの判定
│   ├── courseData.ts / coursePlans.ts    # コース一覧の表示データ
│   └── lpCareer*.ts                      # /lp-career 各セクションの原稿・アセット定義（lpCareerAssets.ts ほか）
├── data/                                 # 静的 JSON データ
│   └── books.json / coursePlans.json / linePresents.json / subSupporters.json
├── hooks/
│   ├── useIsPc.ts                        # PC/SP 判定（BREAK_POINT=1280px 基準）
│   └── useScroll.ts                      # スクロール量取得
├── lib/                                  # データ取得ロジック
│   ├── getBooks.ts / getCoursePlans.ts / getLinePresents.ts / getSubSupporters.ts  # data/*.json の読み込み
│   ├── getInterviews.ts                  # microCMS からインタビュー記事を取得（卒業生の進路。サーバー側実行）
│   └── getNews.ts                        # microCMS から News を取得（サーバー側実行）
├── styles/
│   └── globals.css                       # グローバルスタイル・CSS変数・カスタムフォント定義
├── types/                                # interview.ts / news.ts / pagination.ts / global.d.ts
└── utils/
    ├── date.ts                           # formatPublishedDate()：公開日を yyyy/mm/dd（Asia/Tokyo 固定）に整形
    ├── helper.ts                         # handleStringHTML()：description の <br> タグ処理
    ├── interview.ts                      # extractProfileTags()：記事タイトルからプロフィールタグを抽出
    └── pagination.ts                     # getTotalPages() などページネーション計算
```

---

## レイアウト構造

**root layout は 2 つある**（ルートグループごとに独立。`src/app/layout.tsx` は存在しない）。

- **`src/app/(Main)/layout.tsx`** — 通常ページ用の root layout。`html`/`body`・`GtmNoScript`・`Analytics`・`Icons`（SVGスプライト）・`NavigationSp`（SP用ハンバーガーメニュー）・`Footer`・フォント変数、`globals.css` / sanitize.css を提供
- **`src/app/(Main)/(LowerPages)/layout.tsx`** — 下層ページ用。`NavigationPcLower` のみ追加
- **`src/app/(Lp)/layout.tsx`** — 独立LP（`lp-career`）用の root layout。共通クロームと `globals.css` を持ち込まず、`(Main)` と完全に隔離する（Issue #40）。リセットと body の基本スタイルは `(Lp)/lp-base.css`、フォントは `(Lp)/fonts.ts`。`lp-career` 専用のトークン・サブセットフォントは `lp-career/page.tsx` が `lp-career-tokens.css` を読み込んで適用する
- TOPページの `Header` は `src/app/(Main)/page.tsx` 内で使用

※ グループ分割により「どのグループにも属さない URL」が 404 に落ちなくなるため、`src/app/(Main)/[...notFound]/page.tsx` の catch-all で `notFound()` を呼んで `(Main)` の 404 に着地させている。新しいルートグループを追加する場合はこの経路を壊していないか確認すること。
※ 2026-07（Issue #24）まで root layout が無い変則構成（`homeLayout.tsx` が html/body を持つ）だったが、`npm run build` が失敗するため統合済み。

---

## CSS 設計

### CSS Custom Properties（globals.css）

```css
:root {
  --background: #f1f1f1;
  --main: #567eb4;
  --text: #342525;
  --maxZ: 999;
  --font-bagor: 'Bagor', sans-serif;
}
```

フォント変数（`--font-noto-sans-jp`、`--font-poppins`）は `constants/common.ts` で Next.js Font Optimization を使って定義し、`body` の `className` に付与しています。

### レスポンシブデザイン

- ブレイクポイント: **1280px**（`BREAK_POINT` 定数）
- スマホファースト。PC スタイルは `@media screen and (min-width: 1280px)` で記述。

### CSS Modules 命名規則

- コンポーネント名: PascalCase（例: `Header`、`LoadingScreen`）
- 要素: BEM 風（例: `Header__Logo`）
- 状態修飾子: `isXxx`（例: `NavigationSp.isActive`、`NavigationPcLower.isScrolling`）

---

## コンポーネント設計

### ディレクトリ構造

```
components/ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
└── SubComponent/              # 必要に応じて
```

### Client / Server Components

- デフォルト: **Server Component**（インタラクション不要なら `'use client'` を付けない）
- `'use client'` が必要なケース: `useState`・`useEffect`・イベントハンドラ・`useScroll`・`useIsPc` を使う場合

### PC/SP 判定

```typescript
import useIsPc from '@/hooks/useIsPc';

// isPc が true → PC レイアウト、false → SP レイアウト
const isPc = useIsPc();
```

一部コンポーネントは PC/SP で別コンポーネントを用意（例: `HeroMainCopy` / `HeroMainCopyPc`）。

---

## 定数・メタデータ管理

### ページメタデータ（`constants/meta.ts`）

URL、ページ名（ja/en）、description をここで一元管理。ページの `metadata` export は必ず `buildPageMetadata()` で生成する（title / description / canonical / OGP / Twitter Card を一括出力）：

```typescript
import { buildPageMetadata, pages } from '@/constants/meta';

// 通常ページ
export const metadata: Metadata = buildPageMetadata(pages.xxx);

// noindex にしたいページ（例: サンクスページ）
export const metadata: Metadata = buildPageMetadata(pages.xxx, { noindex: true });

// 実URLが pages.url と異なる場合（例: ページネーション）は canonicalPath を指定
buildPageMetadata(pages.careerPath, { canonicalPath: `${pages.careerPath.url}/${page}` });
```

- SEO 用の説明文を画面表示用の `description` と分けたい場合は `pages.xxx.metaDescription` を定義する（`buildPageMetadata` が優先使用）
- canonical / OGP の絶対 URL は `SITE_URL`（環境変数 `NEXT_PUBLIC_SITE_URL`、デフォルト `https://bug-fix.org/siid`）起点で生成される

`description` は `<br />` タグを含む HTML 文字列のため、JSX 表示用には `handleStringHTML()` で変換して使用：

```typescript
import { handleStringHTML } from '@/utils/helper';

// JSX 表示用 → <br> そのまま（dangerouslySetInnerHTML で使用）
handleStringHTML(pages.xxx.description, true)
```

### メニュー項目（`constants/menuItems.ts`）

ナビゲーション・フッターで共用。`subItems` を持つ場合はドロップダウン表示。

---

## ページルーティング

パスは `src/app/` からの相対。`(Main)` 配下は共通クロームあり、`(Lp)` 配下は独立LP。

| URL | ファイル | 備考 |
|-----|---------|------|
| `/` | `(Main)/page.tsx` | TOPページ。`revalidate = 600`（News・卒業生の進路の ISR） |
| `/career-path` | `(Main)/(LowerPages)/career-path/page.tsx` | `/career-path/1` へリダイレクト |
| `/career-path/[page]` | `(Main)/(LowerPages)/career-path/[page]/page.tsx` | SiiD BLOG のインタビュー記事の一覧（SSG + 10 分 ISR）。記事へ別タブで遷移（`docs/spec/08_career-path-interviews.md`） |
| `/courses` | `(Main)/(LowerPages)/courses/page.tsx` | 比較表・プラン。プラン別アンカーは `COURSE_PLAN_ANCHOR_IDS` |
| `/community` | `(Main)/(LowerPages)/community/page.tsx` | |
| `/service` | `(Main)/(LowerPages)/service/page.tsx` | `after-support` の実体（`Support` セクション）もここ |
| `/counseling` | `(Main)/(LowerPages)/counseling/page.tsx` | `ContactButton` のリンク先（`/contact` は存在しない） |
| `/counseling/complete` | `(Main)/(LowerPages)/counseling/complete/page.tsx` | 予約完了・CV 計測（noindex） |
| `/counseling-complete` | `(Main)/(LowerPages)/counseling-complete/page.tsx` | 旧 URL 互換（noindex） |
| `/line` | `(Main)/(LowerPages)/line/page.tsx` | LINE 登録 |
| `/white-paper` | `(Main)/(LowerPages)/white-paper/page.tsx` | 資料請求（公式LINE誘導） |
| `/lp-career` | `(Lp)/lp-career/page.tsx` | 広告流入用の LP（index 対象。`docs/spec/07_lp-career-renewal.md`） |
| `/lp-career/complete` | `(Lp)/lp-career/complete/page.tsx` | lp-career の予約完了（noindex） |
| 404 | `(Main)/not-found.tsx` + `(Main)/[...notFound]/page.tsx` | dino風ミニゲーム付き |

※ `/contact` と `/after-support` は**ルートとして存在しない**（それぞれ `/counseling` と `/service` が実体）。ナビ構成の実際の値は `src/constants/menuItems.ts` を見ること。
※ 旧サイトの URL（`/career`・`/tuition`・`/voices`・`/lp-1`・`/lp-2`・`/counseling-complete-lp-1`）は `next.config.ts` の `redirects()` で 301。一覧は `docs/spec/06_migration.md` §4。

---

## インポート順序（ESLint で強制）

```typescript
// 1. React 関連
import React, { useState } from 'react';

// 2. Next.js 関連
import Link from 'next/link';
import { Metadata } from 'next';

// 3. 外部ライブラリ
import { Swiper } from 'swiper/react';

// 4. 内部モジュール（@/ エイリアス）
import Component from '@/components/Component/Component';
import { CONSTANT } from '@/constants/common';

// 5. 同階層・親階層
import SubComponent from './SubComponent/SubComponent';

// 6. CSS Modules（最後）
import styles from './Component.module.css';
```

---

## ESLint / TypeScript ルール（主要）

- `import/order`: 上記インポート順を強制
- `@typescript-eslint/naming-convention`: コンポーネントは PascalCase、フックは `useXxx`
- `@typescript-eslint/no-unused-vars`: 未使用変数はエラー（`_` プレフィックスは許容）
- `@next/next/no-img-element`: `<img>` タグ禁止 → `next/image` の `<Image>` を使う
- `react/function-component-definition`: `function` 宣言スタイルを強制
- `prefer-const`: `let` より `const` を優先

---

## 画像・アセット

- 画像は `public/` 直下または `public/images/` 配下に配置（LP 用は `public/{images,fonts,videos}/lp-career/`）
- Next.js `<Image>` コンポーネントを使う（`<img>` タグは ESLint エラー）
- 外部画像は `next.config.ts` の `remotePatterns` で許可する。現在は `images.microcms-assets.io`（SiiD BLOG のアイキャッチ）と `img.youtube.com`

### basePath（`/siid`）に注意

`next.config.ts` で `basePath: '/siid'` を設定している（`bug-fix.org/siid` 配下で配信するため。`docs/spec/06_migration.md` §3.3）。

- **自動で `/siid` が付く**: `<Link href>`・`redirect()`・`router.push()`・Next.js が出力する `_next/*`
- **自動では付かない（`/siid` を自分で書く）**: `<Image src>` の文字列パス、CSS の `url()`、`<video>` / `<source>`、Phaser 等のライブラリに渡すパス。例: `src="/siid/images/courses/xxx.svg"`、`url('/siid/fonts/lp-career/xxx.woff2')`。lp-career は `lpCareerAsset()`（`constants/lpCareerAssets.ts`）経由で付与している
- 付け忘れはローカルでも 404 になるため、画像・フォント追加時は DevTools の Network で 404 が無いことを確認する

---

## 外部リンク

| 用途 | URL |
|------|-----|
| YouTube | https://www.youtube.com/@programming-siid |
| X (Twitter) | https://x.com/seito_horiguchi |
| TikTok | https://www.tiktok.com/@seito2020 |
| Instagram | https://www.instagram.com/seito.ai_engineer/ |
| Threads | https://www.threads.com/@seito.ai_engineer |
| プライバシーポリシー | https://bug-fix.org/privacy-policy |
| 運営会社 | https://bug-fix.org |
| リスキル講座（経産省） | https://www.meti.go.jp/policy/economy/jinzai/reskillprograms/index.html |
