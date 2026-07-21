# CLAUDE.md — SiiD Web プロジェクト向け Claude Code ガイド

ITエンジニア転職 × 生成AI特化プログラミングスクール「SiiD」の Web サイトリポジトリです。

---

## 仕様書・開発ワークフロー（最重要）

**実装に着手する前に `docs/README.md` から該当する仕様書を必ず読むこと。**

- `docs/spec/01_project-overview.md` — 技術選定（GSAP / Vercel / 外部フォーム）・ページ実装状況・**Figma ノード ID 対応表とレート制限の注意**
- `docs/spec/02_opening-animation.md` — オープニング演出（ローディング→FV）の詳細仕様
- `docs/spec/03_pages.md` — 未実装ページ（courses / after-support / contact / 404）の仕様
- `docs/spec/04_workflow.md` — Issue 駆動開発のルール（下記サマリ）
- `docs/spec/05_deploy.md` — Vercel デプロイ計画・公開前チェックリスト

**ワークフローのサマリ**: GitHub Issue 起票 → develop から `feature/{issue番号}-{slug}` ブランチ → 実装 → lint+typecheck → develop 向け PR（`Closes #N`）→ `/code-review` でセルフレビュー・修正 → **マージはユーザーが行う**。develop への直接コミット禁止。実装タスクは `/feature-work` スキルに従う。

仕様変更・ヒアリングでの決定事項は、実装 PR と同じ PR 内で該当仕様書に反映すること。

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
| Slider | Swiper 12 |
| CSS Reset | sanitize.css |
| Font | Google Fonts (Noto Sans JP, Poppins) + カスタムフォント (Bagor) |
| Lint | ESLint 9 (Flat Config) |
| Node.js | 18.17+ 推奨 20.x |

---

## ディレクトリ構造

```
src/
├── app/                         # Next.js App Router
│   ├── (LowerPages)/            # 下層ページ（ルートグループ）
│   │   ├── layout.tsx           # 下層ページ共通レイアウト（Header なし、NavigationPcLower あり）
│   │   ├── career-path/         # 卒業生の進路ページ
│   │   │   ├── page.tsx         # /career-path → /career-path/1 へリダイレクト
│   │   │   └── [page]/page.tsx  # ページネーション付きリスト
│   │   ├── community/page.tsx   # SiiDコミュニティページ
│   │   ├── courses/page.tsx     # コース一覧ページ（※コンテンツ未実装）
│   │   └── service/page.tsx     # サービスページ
│   ├── layout.tsx               # ルートレイアウト（html/body・Icons・NavigationSp・Footer）
│   ├── page.tsx                 # ホームページ（TOPページ）
│   ├── not-found.tsx            # 404ページ（dino風ミニゲーム付き）
│   └── Home.module.css
├── components/                  # 再利用可能 UI コンポーネント
├── constants/
│   ├── common.ts                # BREAK_POINT(1280)、Google Fonts 設定
│   ├── meta.ts                  # ページメタデータ・URL 定数（commonTitle、pages）
│   ├── menuItems.ts             # ナビメニュー項目
│   └── snsItems.ts              # SNSリンク（snsItems / snsFooterItems）
├── data/                        # 静的 JSON データ
│   ├── books.json
│   ├── graduates/               # 卒業生データ（student-1.json 〜 student-7.json）
│   └── subSupporters.json
├── hooks/
│   ├── useIsPc.ts               # PC/SP 判定（BREAK_POINT=1280px 基準）
│   └── useScroll.ts             # スクロール量取得
├── lib/                         # データ取得ロジック
│   ├── getBooks.ts
│   ├── getCareerPathData.ts
│   └── getSubSupporters.ts
├── styles/
│   └── globals.css              # グローバルスタイル・CSS変数・カスタムフォント定義
├── types/
│   ├── career.ts
│   └── pagination.ts
└── utils/
    ├── helper.ts                # handleStringHTML()：description の <br> タグ処理
    ├── pagination.ts            # getTotalPages() などページネーション計算
    └── youtube.ts
```

---

## レイアウト構造

- **`src/app/layout.tsx`** — ルートレイアウト（唯一 `html`/`body` を持つ）。`Icons`（SVGスプライト）・`NavigationSp`（SP用ハンバーガーメニュー）・`Footer`・フォント変数を全ページ共通で提供
- **`src/app/(LowerPages)/layout.tsx`** — 下層ページ用。`NavigationPcLower` のみ追加
- TOPページの `Header` は `src/app/page.tsx` 内で使用

※ 2026-07（Issue #24）まで root layout が無い変則構成（`homeLayout.tsx` が html/body を持つ）だったが、`npm run build` が失敗するため現構成に統合済み。

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

URL、ページ名（ja/en）、description をここで一元管理。`description` は `<br />` タグを含む HTML 文字列のため、用途に応じて `handleStringHTML()` で変換して使用：

```typescript
import { handleStringHTML } from '@/utils/helper';

// Metadata（SEO）用 → HTMLタグ除去
description: handleStringHTML(pages.xxx.description, false)

// JSX 表示用 → <br> そのまま（dangerouslySetInnerHTML で使用）
handleStringHTML(pages.xxx.description, true)
```

### メニュー項目（`constants/menuItems.ts`）

ナビゲーション・フッターで共用。`subItems` を持つ場合はドロップダウン表示。

---

## ページルーティング

| URL | ファイル | 備考 |
|-----|---------|------|
| `/` | `src/app/page.tsx` | TOPページ |
| `/career-path` | `src/app/(LowerPages)/career-path/page.tsx` | `/career-path/1` へリダイレクト |
| `/career-path/[page]` | `src/app/(LowerPages)/career-path/[page]/page.tsx` | ページネーション、`?id=` でモーダル表示 |
| `/courses` | `src/app/(LowerPages)/courses/page.tsx` | コンテンツ未実装（プレースホルダーあり） |
| `/community` | `src/app/(LowerPages)/community/page.tsx` | |
| `/service` | `src/app/(LowerPages)/service/page.tsx` | |
| `/contact` | **未実装** | `ContactButton` リンク先 |
| `/after-support` | **未実装** | `menuItems.ts` に記載あり |

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

- 画像は `public/` 直下または `public/images/` 配下に配置
- Next.js `<Image>` コンポーネントを使う（`<img>` タグは ESLint エラー）
- YouTube サムネイルは `next.config.ts` で `img.youtube.com` を `remotePatterns` に許可済み

---

## 外部リンク

| 用途 | URL |
|------|-----|
| YouTube | https://www.youtube.com/@programming-siid |
| X (Twitter) | https://x.com/seito_horiguchi |
| TikTok | https://www.tiktok.com/@seito_horiguchi |
| Instagram | https://www.instagram.com/seito_horiguchi/ |
| プライバシーポリシー | https://bug-fix.org/privacy-policy |
| 運営会社 | https://bug-fix.org |
| リスキル講座（経産省） | https://www.meti.go.jp/policy/economy/jinzai/reskillprograms/index.html |
