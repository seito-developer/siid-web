# SiiD Web - 開発者ドキュメント

IT エンジニア転職 × 生成 AI 特化のプログラミングスクール「SiiD」の Web サイト開発ドキュメントです。

## デザインデータ

### 全体図イメージ

<img width="951" height="628" alt="Screenshot 2025-11-22 at 13 07 35" src="https://github.com/user-attachments/assets/d7e93a09-3250-4fe5-ba83-700f246e3da8" />

### Figma

https://www.figma.com/design/VSf9GA17S6gkc6rq4dfzpu/%E5%90%88%E5%90%8C%E4%BC%9A%E7%A4%BEBugFix%E6%A7%98_%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%82%B5%E3%82%A4%E3%83%88%E5%88%B6%E4%BD%9C--Copy-?node-id=1-2&p=f&t=iQ1DUi5Rihu20eul-0

※要アクセスリクエスト

## 🛠️ 環境構築

### 必要な環境

- **Node.js**: 18.17.0 以上（推奨: 20.x 以上）
- **npm**: 9.x 以上（Node.js に同梱）
- **Git**: 最新版

### Node.js のインストール

#### macOS / Linux (nvm 推奨)

```bash
# nvmがインストールされていない場合
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# ターミナルを再起動後、Node.js 20をインストール
nvm install 20
nvm use 20
nvm alias default 20
```

#### Windows

[Node.js 公式サイト](https://nodejs.org/)から LTS 版をダウンロードしてインストールしてください。

#### バージョン確認

```bash
node --version  # v20.x.x 以上であることを確認
npm --version   # 9.x.x 以上であることを確認
```

### プロジェクトのセットアップ

1. **リポジトリのクローン**

```bash
git clone <repository-url>
cd siid-web
```

2. **依存関係のインストール**

```bash
npm install
```

3. **開発サーバーの起動**

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて動作確認してください。

### 初回セットアップ後の確認事項

```bash
# Lintチェック（エラーがないことを確認）
npm run lint

# TypeScript型チェック（エラーがないことを確認）
npm run typecheck

# ビルドテスト（正常にビルドできることを確認）
npm run build
```

### トラブルシューティング

#### 依存関係のインストールエラー

```bash
# node_modulesとpackage-lock.jsonを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

#### ポート 3000 が既に使用されている場合

```bash
# 別のポートで起動
npm run dev -- -p 3001
```

#### TypeScript エラーが発生する場合

```bash
# TypeScriptの型定義を再生成
npm run typecheck
```

## 🚀 プロジェクト概要

Next.js 15.4.5 + TypeScript + CSS Modules を使用したモダンな Web アプリケーションです。

### 技術スタック

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: CSS Modules + CSS Custom Properties
- **Animation**: Framer Motion
- **Font**: Google Fonts (Noto Sans JP, Poppins) + Custom Font (Bagor)
- **Lint**: ESLint
- **Package Manager**: npm

## 📁 主要ディレクトリ構造

```
src/
├── app/                      # Next.js App Router
│   ├── (LowerPages)/        # 下層ページのルートグループ
│   │   ├── layout.tsx       # 下層ページ共通レイアウト
│   │   └── [page]/         # 動的ルート
│   ├── page.tsx            # ホームページ
│   ├── homeLayout.tsx      # ホームページ専用レイアウト
│   └── Home.module.css     # ホームページスタイル
├── components/             # 再利用可能なUIコンポーネント
│   ├── Header/
│   ├── Hero/
│   ├── LoadingScreen/
│   └── ...
├── constants/             # アプリケーション定数
│   ├── common.ts          # 共通定数
│   ├── meta.ts           # メタデータ定数
│   ├── menuItems.ts      # メニュー項目
│   └── snsItems.ts       # SNSリンク
├── hooks/                # カスタムReactフック
│   ├── useIsPc.ts        # PC判定フック
│   └── useNews.ts        # ニュース関連フック
├── styles/               # グローバルスタイル
│   └── globals.css       # グローバルCSS
├── types/               # TypeScript型定義（将来用）
└── utils/              # ユーティリティ関数
    └── helper.ts       # ヘルパー関数
```

## 🎨 スタイリング規約

### CSS Modules

全てのコンポーネントで CSS Modules を使用しています。

```typescript
// コンポーネント例
import styles from "./ComponentName.module.css";

export default function ComponentName() {
  return (
    <div className={styles.ComponentName}>
      <div className={styles.ComponentName__Element}>{/* コンテンツ */}</div>
    </div>
  );
}
```

### CSS 命名規則

- **コンポーネント名**: パスカルケース (例: `Header`, `LoadingScreen`)
- **要素**: BEM 風の命名 (例: `ComponentName__Element`)
- **修飾子**: BEM 風の命名 (例: `ComponentName.isModifier`)

### CSS 共通変数（カラーコード、フォントなど）

```css
:root {
  --background: #f1f1f1;
  --main: #567eb4;
  --text: #342525;
  --maxZ: 999;
  --font-bagor: "Bagor", sans-serif;
  --font-noto: "Noto Sans JP", sans-serif;
  --font-poppins: "Poppins", sans-serif;
}
```

### レスポンシブデザイン

ブレイクポイントは 1280px。スマホファーストでコーディングしつつ、PC のスタイルを次のように記述する。

```typescript
// 定数定義
export const BREAK_POINT = 1280; // PC/SPの境界値

// CSS例
@media screen and (min-width: 1280px) {
  /* PC用スタイル */
}
```

## 🧩 コンポーネント設計規約

### ディレクトリ構造

```
components/
└── ComponentName/
    ├── ComponentName.tsx      # メインコンポーネント
    ├── ComponentName.module.css  # スタイル
    └── (SubComponent)/        # サブコンポーネント（必要に応じて）
```

### コンポーネントテンプレート

```typescript
import React from "react";
import styles from "./ComponentName.module.css";

interface ComponentNameProps {
  // プロパティ定義
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <div className={styles.ComponentName}>{/* コンポーネントの内容 */}</div>
  );
}
```

### Client/Server Components

```typescript
// クライアントコンポーネント（インタラクティブな機能が必要な場合）
"use client";
import React, { useState } from "react";

// サーバーコンポーネント（デフォルト、静的コンテンツ）
import React from "react";
```

## 📱 レスポンシブ対応

### PC/モバイル判定

```typescript
import useIsPc from "@/hooks/useIsPc";

export default function Component() {
  const isPc = useIsPc();

<<<<<<< Updated upstream
  return (
    <div>
      {isPc ? <PCVersion /> : <MobileVersion />}
    </div>
  );
=======
  return <div>{isPc ? <PCVersion /> : <MobileVersion />}</div>;
>>>>>>> Stashed changes
}
```

### デバイス別コンポーネント

一部のコンポーネントは PC/モバイルで別々のコンポーネントを用意：

```
Hero/
├── Hero.tsx                 # メインコンポーネント（デバイス判定）
├── HeroMainCopy/           # モバイル版
└── HeroMainCopyPc/         # PC版
```

## 🔧 TypeScript 規約

### インポート順序

```typescript
// 1. React関連
import React, { useState, useEffect } from "react";

// 2. Next.js関連
import Link from "next/link";
import { Metadata } from "next";

// 3. 外部ライブラリ
import { motion } from "framer-motion";

// 4. 内部インポート（絶対パス）
import Component from "@/components/Component/Component";
import { CONSTANT } from "@/constants/common";
import useHook from "@/hooks/useHook";

// 5. CSS Modules（最後）
import styles from "./Component.module.css";
```

### 型定義

```typescript
// インターフェース（コンポーネントProps）
interface ComponentProps {
  title: string;
  isVisible?: boolean;
  onClick: () => void;
}

// 列挙型
export enum CornerPosition {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

// 型エクスポート
export type { ComponentProps };
```

## 🗂️ ファイル命名規約

### ファイル・ディレクトリ命名

- **コンポーネント**: PascalCase (例: `Header.tsx`, `LoadingScreen.tsx`)
- **フック**: camelCase + use プレフィックス (例: `useIsPc.ts`)
- **定数**: camelCase (例: `menuItems.ts`, `common.ts`)
- **ユーティリティ**: camelCase (例: `helper.ts`)
- **CSS Modules**: `.module.css`拡張子

### エクスポート規約

```typescript
// デフォルトエクスポート（コンポーネント）
export default function Component() { ... }

// 名前付きエクスポート（定数、型、ユーティリティ）
export const CONSTANT = 'value';
export type ComponentProps = { ... };
export { utilityFunction };
```

## 🔗 定数管理

### メタデータ

```typescript
// constants/meta.ts
export const commonTitle =
  "ITエンジニア転職 × 生成AI特化のプログラミングスクール - SiiD";

export const pages = {
  index: {
    description: "SiiDは、ITエンジニア転職と生成AI...",
  },
} as const;
```

### 共通定数

```typescript
// constants/common.ts
export const BREAK_POINT = 1280;
export const ANIMATION_DURATION = 300;
```

## 🚀 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# Lint実行
npm run lint

# TypeScriptチェック
npm run typecheck
```

## ⚠️ 開発時の必須チェック

**develop または main ブランチにマージする前に必ず Lint と TypeScript チェックを実行してください。**

```bash
# 必須: コミット前にLintチェック
npm run lint

# 必須: コミット前にTypeScriptチェック
npm run typecheck
```

### GitHub Actions による自動チェック

- develop または main ブランチへの PR 時に自動的に Lint と TypeScript チェックが実行されます
- **Lint エラーがある場合、PR マージが自動的に拒否されます**
- 事前にローカルでチェックを行い、エラーを修正してから PR を作成してください

### Lint エラーの修正方法

```bash
# 自動修正可能なエラーを修正
npm run lint -- --fix

# 修正できないエラーは手動で対応が必要です
```

## 📋 開発時の注意点

### パフォーマンス

- **Server Components**をデフォルトで使用
- **Client Components**は必要な場合のみ使用
- **CSS Modules**によるスタイルの最適化
- **Next.js Font Optimization**の活用

### アクセシビリティ

- セマンティック HTML の使用
- 適切な ARIA ラベルの設定
- キーボードナビゲーションの考慮

### SEO

- **Metadata API**の活用
- 構造化データの実装
- 適切な Heading 階層の維持

---

## 🤝 コントリビューション

このプロジェクトに貢献する際は、上記の規約に従って開発を行ってください。不明な点がある場合は、既存のコードを参考にするか、チームメンバーに相談してください。
