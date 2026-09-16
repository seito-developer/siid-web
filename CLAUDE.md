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
- `docs/spec/09_site-facts.md` — **文言を書くときの必読**。サイト内で統一する数値・条件（Zoom 時間・アクセス期限・実績数値・コース名）と表記ルール。価格は未決定事項

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

**コミット前に必ず実行：**
```bash
npm run lint && npm run typecheck && npm run check:fonts
```

`check:fonts` は自前サブセットの収録漏れ検査（Issue #100 / #132）。日本語の文言を追加・変更したときだけ落ちる。

---

## ディレクトリ構造

**`src/app/` は `(Main)` と `(Lp)` の 2 つのルートグループに分かれており、それぞれが独立した root layout（`html`/`body`）を持つ。** 共通クロームを持つ通常ページは `(Main)`、広告流入用の独立 LP（`lp-career`）は `(Lp)`。

- microCMS: SiiD BLOG の「コラム」記事を TOP の News に、「受講生様インタビュー」記事を卒業生の進路に表示（`src/lib/getNews.ts` / `getInterviews.ts`、サーバー側実行）
- Phaser は 404 ページのミニゲーム専用（`next/dynamic` + `ssr: false` で 404 ページ限定ロード）
- `workers/siid-router/` は bug-fix.org/siid 配下を Vercel へプロキシする Cloudflare Worker（テストは `npm run test:worker`）

---

## レイアウト構造

**root layout は 2 つある**（ルートグループごとに独立。`src/app/layout.tsx` は存在しない）。

- **`src/app/(Main)/layout.tsx`** — 通常ページ用の root layout。`html`/`body`・`GtmNoScript`・`Analytics`・`Icons`（SVGスプライト）・`NavigationSp`（SP用ハンバーガーメニュー）・`Footer`・フォント変数、`globals.css` / sanitize.css を提供
- **`src/app/(Main)/(LowerPages)/layout.tsx`** — 下層ページ用。`NavigationPcLower` のみ追加。同階層の `template.tsx` が `PageTransition` でページを包み、クライアント遷移のたびにフェードインさせて組み上がり中のレイアウト崩れを隠す（Issue #131。TOP は `Opening` が覆うので対象外）
- **`src/app/(Lp)/layout.tsx`** — 独立LP（`lp-career`）用の root layout。共通クロームと `globals.css` を持ち込まず、`(Main)` と完全に隔離する（Issue #40）。リセットと body の基本スタイルは `(Lp)/lp-base.css`、フォントは `(Lp)/fonts.ts`。`lp-career` 専用のトークン・サブセットフォントは `lp-career/page.tsx` が `lp-career-tokens.css` を読み込んで適用する
- TOPページの `Header` は `src/app/(Main)/page.tsx` 内で使用

※ グループ分割により「どのグループにも属さない URL」が 404 に落ちなくなるため、`src/app/(Main)/[...notFound]/page.tsx` の catch-all で `notFound()` を呼んで `(Main)` の 404 に着地させている。新しいルートグループを追加する場合はこの経路を壊していないか確認すること。
※ 2026-07（Issue #24）まで root layout が無い変則構成（`homeLayout.tsx` が html/body を持つ）だったが、`npm run build` が失敗するため統合済み。

---

## CSS 設計

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

- `description` は画面表示と meta description を兼ねる**単一のフィールド**（Issue #112）。検索結果で効く文面を優先する
- **70 字を超える説明文に `<br />` を入れない**（Issue #115）。自動折り返しと強制改行が二重にかかり、2〜3 文字だけの行ができる。`<br />` は 404 や予約完了ページのような**短い 2 行のコピー**にだけ使う
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

## 画像・アセット

- 画像は `public/` 直下または `public/images/` 配下に配置（LP 用は `public/{images,fonts,videos}/lp-career/`）
- Next.js `<Image>` コンポーネントを使う（`<img>` タグは ESLint エラー）
- 外部画像は `next.config.ts` の `remotePatterns` で許可する。現在は `images.microcms-assets.io`（SiiD BLOG のアイキャッチ）と `img.youtube.com`

### 日本語の文言を追加・変更したら（重要）

日本語フォントは next/font ではなく**自前サブセット**を配信している（Issue #100、`docs/spec/05_deploy.md`）。収録文字が固定されているため、**新しい漢字を含む文言を追加したら charset を作り直す**。

```bash
npm run check:fonts                              # まず漏れの有無を見る
./scripts/fonts/subset-noto-sans-jp.sh           # 漏れていたら作り直す（src/ から拾う）
```

microCMS の記事タイトルなど、ソースに無い文言まで取り込みたいときは実ページを巡回する：

```bash
npm run build && PORT=3005 npm start &
MAIN_FONT_URL=http://localhost:3005/siid \
  ./scripts/fonts/subset-noto-sans-jp.sh --collect
```

作り直さなくても表示は崩れない（JIS 第1水準までは `ext` が肩代わりする）が、**そのページだけ 330KB を余分に取得する**。実際 TOP 刷新（#120）で 13 字、文言修正（#124〜#126）で 28 字が漏れ、TOP が 360KB → 1,007KB になっていた。`src/styles/noto-sans-jp.css` と `public/fonts/noto-sans-jp/` は生成物なので手で編集しない。

### basePath（`/siid`）に注意

`next.config.ts` で `basePath: '/siid'` を設定している（`bug-fix.org/siid` 配下で配信するため。`docs/spec/06_migration.md` §3.3）。

- **自動で `/siid` が付く**: `<Link href>`・`redirect()`・`router.push()`・Next.js が出力する `_next/*`
- **自動では付かない（`/siid` を自分で書く）**: `<Image src>` の文字列パス、CSS の `url()`、`<video>` / `<source>`、Phaser 等のライブラリに渡すパス。例: `src="/siid/images/courses/xxx.svg"`、`url('/siid/fonts/lp-career/xxx.woff2')`。lp-career は `lpCareerAsset()`（`constants/lpCareerAssets.ts`）経由で付与している
- 付け忘れはローカルでも 404 になるため、画像・フォント追加時は DevTools の Network で 404 が無いことを確認する
