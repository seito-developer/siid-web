# SiiD Web - 開発者ドキュメント

ITエンジニア転職 × 生成AI特化のプログラミングスクール「SiiD」のWebサイト開発ドキュメントです。

## 🚀 プロジェクト概要

Next.js 15.4.5 + TypeScript + CSS Modulesを使用したモダンなWebアプリケーションです。

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

全てのコンポーネントでCSS Modulesを使用しています。

```typescript
// コンポーネント例
import styles from './ComponentName.module.css'

export default function ComponentName() {
  return (
    <div className={styles.ComponentName}>
      <div className={styles.ComponentName__Element}>
        {/* コンテンツ */}
      </div>
    </div>
  )
}
```

### CSS命名規則

- **コンポーネント名**: パスカルケース (例: `Header`, `LoadingScreen`)
- **要素**: BEM風の命名 (例: `ComponentName__Element`)
- **修飾子**: BEM風の命名 (例: `ComponentName.isModifier`)

### CSS 共通変数（カラーコード、フォントなど）

```css
:root {
  --background: #F1F1F1;
  --main: #567EB4;
  --text: #342525;
  --maxZ: 999;
  --font-bagor: 'Bagor', sans-serif;
  --font-noto: 'Noto Sans JP', sans-serif;
  --font-poppins: 'Poppins', sans-serif;
}
```

### レスポンシブデザイン

ブレイクポイントは1280px。スマホファーストでコーディングしつつ、PCのスタイルを次のように記述する。

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
import React from 'react';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // プロパティ定義
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <div className={styles.ComponentName}>
      {/* コンポーネントの内容 */}
    </div>
  );
}
```

### Client/Server Components

```typescript
// クライアントコンポーネント（インタラクティブな機能が必要な場合）
"use client";
import React, { useState } from 'react';

// サーバーコンポーネント（デフォルト、静的コンテンツ）
import React from 'react';
```

## 📱 レスポンシブ対応

### PC/モバイル判定

```typescript
import useIsPc from '@/hooks/useIsPc';

export default function Component() {
  const isPc = useIsPc();
  
  return (
    <div>
      {isPc ? <PCVersion /> : <MobileVersion />}
    </div>
  );
}
```

### デバイス別コンポーネント

一部のコンポーネントはPC/モバイルで別々のコンポーネントを用意：

```
Hero/
├── Hero.tsx                 # メインコンポーネント（デバイス判定）
├── HeroMainCopy/           # モバイル版
└── HeroMainCopyPc/         # PC版
```

## 🔧 TypeScript規約

### インポート順序

```typescript
// 1. React関連
import React, { useState, useEffect } from 'react';

// 2. Next.js関連
import Link from 'next/link';
import { Metadata } from 'next';

// 3. 外部ライブラリ
import { motion } from 'framer-motion';

// 4. 内部インポート（絶対パス）
import Component from '@/components/Component/Component';
import { CONSTANT } from '@/constants/common';
import useHook from '@/hooks/useHook';

// 5. CSS Modules（最後）
import styles from './Component.module.css';
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
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

// 型エクスポート
export type { ComponentProps };
```

## 🗂️ ファイル命名規約

### ファイル・ディレクトリ命名

- **コンポーネント**: PascalCase (例: `Header.tsx`, `LoadingScreen.tsx`)
- **フック**: camelCase + useプレフィックス (例: `useIsPc.ts`)
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
export const commonTitle = "ITエンジニア転職 × 生成AI特化のプログラミングスクール - SiiD";

export const pages = {
  index: {
    description: "SiiDは、ITエンジニア転職と生成AI..."
  }
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
```

## 📋 開発時の注意点

### パフォーマンス

- **Server Components**をデフォルトで使用
- **Client Components**は必要な場合のみ使用
- **CSS Modules**によるスタイルの最適化
- **Next.js Font Optimization**の活用

### アクセシビリティ

- セマンティックHTMLの使用
- 適切なARIAラベルの設定
- キーボードナビゲーションの考慮

### SEO

- **Metadata API**の活用
- 構造化データの実装
- 適切なHeading階層の維持

---

## 🤝 コントリビューション

このプロジェクトに貢献する際は、上記の規約に従って開発を行ってください。不明な点がある場合は、既存のコードを参考にするか、チームメンバーに相談してください。