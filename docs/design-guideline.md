# SiiD デザインガイドライン（姉妹サイト向け）

SiiD Web（siid-web リポジトリ）の実装コードから抽出したデザイン仕様書。
姉妹サイトが SiiD のデザインを完全に踏襲するために必要な情報を、このドキュメント単体で完結するようにまとめている。

- 抽出元: `src/styles/globals.css`・全 `src/**/*.module.css`（約90ファイル）・`src/constants/common.ts`・`docs/spec/01_project-overview.md` ほか
- 抽出日: 2026-07-08

---

## 1. デザインコンセプト

- 狙い: **「かっこいい、すごい」と思わせる第一印象**とコンバージョン（CTA）への誘導
- トーン: **角丸・カード・ステッカー風の遊びのあるポップさ × テック感**
- 特徴を一言で: 「青い額縁の中に、面取りされたカードと少し傾いたステッカーが並ぶサイト」

### デザインの5大モチーフ

1. **青枠の額装** — 画面の左右端に幅 8px のメインブルーの縦ラインを常時固定表示し、サイト全体を額縁のように囲う
2. **部分角丸 + Corner 面取り** — 対称な角丸ではなく、片隅だけ 16px の R を付けたり、隅に「削り」を入れる
3. **微小回転のステッカー感** — CTA ボタンなどを `rotate(4.4deg)` 等でわずかに傾けて貼る
4. **影は最小限** — 立体感は box-shadow ではなく太枠・交互背景・重ねレイアウトで出す
5. **3系統フォント** — 装飾英字 = Bagor、英字ラベル = Poppins 900、和文 = Noto Sans JP 400/900

---

## 2. カラー

### 2.1 デザイントークン（CSS Custom Properties）

```css
:root {
  --background: #f1f1f1;          /* ページ背景（薄いグレー） */
  --main:       #567eb4;          /* メインブルー（額縁・見出し帯・ロゴ地） */
  --text:       #342525;          /* 基本テキスト（こげ茶。黒は使わずこれが「黒」） */
  --maxZ:       999;              /* 最前面 z-index（SP固定ナビ等） */
  --plan-career:       #8dc556;   /* プラン別アクセント: Career（緑） */
  --plan-full-support: #e0804c;   /* プラン別アクセント: FullSupport（オレンジ）＝CTA色 */
  --plan-vip:          #924a8f;   /* プラン別アクセント: VIP（紫） */
  --font-bagor: 'Bagor', sans-serif;
}
```

### 2.2 準トークン（頻出ハードコード色）

| 色 | 用途 |
|---|---|
| `#fff` | 濃色背景（青帯・濃紺）上のテキスト、カード地、ナビ地 |
| `#eeefed` | セクションの交互背景・フッター地（`--background` よりわずかに暖色のグレー） |
| `#475499` | 強調セクション（Message）の濃紺背景。メインブルーより一段濃い青 |
| `#8189b8` | 濃紺背景上の「未点灯」テキスト色（文字リビール演出用の淡い青紫） |
| `#e0804c` | CTA ボタン地（オレンジ） |
| `#00b900` | LINE ボタン緑 |
| `rgba(0,0,0,0.7)` | SPナビ展開時の全画面オーバーレイ |

### 2.3 使い方のルール

- グラデーションは装飾に使わない。唯一の例外は破線表現（`linear-gradient(to right, var(--text) 60%, transparent 40%)` を repeat して破線ボーダーの代用にする）
- 「黒」が必要な場面は `--text`（#342525）を使う。純黒 `#000` は点線ボーダー `1px dotted #000` などの線用途に限る
- 濃色背景上ではテキスト・見出しを `#fff` に反転（コンポーネントは `.isInvert` 修飾子で切替）

---

## 3. タイポグラフィ

### 3.1 フォント3系統

| フォント | 読み込み | weight | 用途 |
|---|---|---|---|
| **Bagor**（カスタム） | `@font-face`（`/fonts/Bagor-RoundNormal.ttf`） | normal | 装飾的な大型英字見出し・数字（セクションタイトル、ページネーション番号、リボン等）。丸みのある独自感がブランドの顔 |
| **Poppins** | `next/font/google`、変数 `--font-poppins` | 400 / 900 | 英字ラベル・英字サブ見出け（"CONTACT"、セクションの英語サブタイトル等）。900 が主 |
| **Noto Sans JP** | `next/font/google`、変数 `--font-noto-sans-jp` | 400 / 900 | 和文本文・和文見出し。ページの基本フォント |

```css
@font-face {
  font-family: 'Bagor';
  src: url('/fonts/Bagor-RoundNormal.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

- weight は **400 と 900 の2つだけ**読み込む。中間ウェイト（500〜700）は原則使わない — 見出しは 900、本文は 400 の強コントラスト
- body のフォールバック: `Arial, Helvetica, sans-serif`。`-webkit-font-smoothing: antialiased;`

### 3.2 サイズ・字間・行間の基準値

| 用途 | SP | PC (1280px〜) | 備考 |
|---|---|---|---|
| セクション和文タイトル | 24px / 900 | 32px / 900 | letter-spacing 0.12em、line-height 1〜1.6 |
| セクション英字サブタイトル | 14px / 900 | 16px / 900 | Poppins、letter-spacing 0.04em、line-height 1 |
| 下層ページ見出し（Headline） | Title 32px（Bagor）＋ SubTitle 12px | 同系で拡大 | 青帯上に白文字 |
| 本文 | 12〜14px / 400 | 13〜16px | line-height 140〜180%（160% 前後を多用） |
| 小ラベル・注記 | 10〜11px | 11〜13px | |

- letter-spacing の標準は `0.04em`。英字見出しは `0.08〜0.14em`、和文タイトルは `0.12em` まで広げる
- 見出しトークンをセクション側の CSS 変数で持つパターンを踏襲するとよい:

```css
--section-title-font-size: 24px;      /* PC: 32px */
--section-title-font-weight: 900;
--section-en-title-font-size: 14px;   /* PC: 16px */
--section-en-title-font-weight: 900;
--section-en-title-line-height: 1;
```

---

## 4. レイアウト・レスポンシブ

### 4.1 ブレークポイント

- **1280px 単一ブレークポイント**（定数 `BREAK_POINT = 1280`）。スマホファーストで書き、PC は `@media screen and (min-width: 1280px)` で上書き
- JS 側の PC/SP 判定も同じ 1280px 基準（`useIsPc` フック）。PC/SP でレイアウトが大きく違う要素は別コンポーネントに分ける

### 4.2 コンテナ

```css
--pc-container-width: 1080px;                 /* コンテンツ最大幅。margin-inline: auto */
--pc-background-width: calc(100% - 16px);     /* 左右8px額縁の内側 */
```

- SP の横パディングは **32px**（PC で 0 にしてコンテナ幅制御に切替）

### 4.3 青枠の額装（最重要モチーフ）

```css
body::before,
body::after {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  width: 8px;
  height: 100%;
  z-index: 3;
}
body::before { border-left: 8px solid var(--main); left: 0; }
body::after  { border-right: 8px solid var(--main); right: 0; }
```

- この **8px のメインブルー枠**はサイト全域の基調。見出し（Headline）の上端、フッターの枠にも同じ `8px solid var(--main)` を反復する
- コンテンツ領域内では同モチーフを `#eeefed` の縦ラインとして反復することもある

### 4.4 セクション構成の定番

- **交互背景**: セクションごとに `#eeefed` の全幅背景を敷く。実装は `::before` を `width: 100vw; left: -32px;`（SP。PC は `left: -8px`）で親からはみ出させる手法
- **青帯の区切り**: 強調セクションの上端に `width: 100vw; height: 16px; background: var(--main)` の帯
- **マイナスマージンの重ね**: PC では `margin-top: -170px` のように前セクションへ要素を食い込ませ、レイヤー感を出す
- カード列は flex + `gap: 12px / 24px`

### 4.5 レスポンシブ改行

```css
.br-sp { display: inline; }   /* SPのみ改行 */
.br-pc { display: none; }
@media (min-width: 1280px) {
  .br-sp { display: none; }
  .br-pc { display: inline; }
}
```

---

## 5. 形状 — 角丸・ボーダー・影

### 5.1 角丸

- **非対称・部分角丸がこのサイトの個性**。`border-radius: 0 0 0 16px`（左下だけ）、`16px 16px 0 0`、`40px 40px 0 0`、`40px 40px 40px 0` のように片隅〜三隅だけ丸める
- 頻出値: `4px / 8px / 12px / 16px / 20px / 24px / 32px / 40px`。ピルは `9999px` または `70px`
- 真円 `border-radius: 50%` は **CTA ボタンと小アイコン専用**。乱用しない

### 5.2 ボーダー

- **太枠**: `8px solid var(--main)` — 額縁・見出し・フッターの構造線
- **点線・破線**: `1px dotted #000` / `1px dashed var(--text)` — セクションや項目の区切り線として多用（例: 見出し下端の `border-bottom: 1px dashed`、リスト項目の `border-block`）
- **細枠**: カードやボタンの輪郭は `1px solid #342525`

### 5.3 影（意図的に最小限）

使ってよい影はこの4種だけと考える:

```css
box-shadow: 0 0 10px #00000040;            /* カードの薄い全方位影 */
box-shadow: 0 0 0 4px #e0804c;             /* CTAの同色二重リング */
box-shadow: 0 0 0 4px #342525;             /* テキスト色リング */
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15); /* モーダルの浮き */
```

立体感・奥行きは影ではなく「太枠＋交互背景＋部分角丸＋重ねレイアウト」で表現する。

---

## 6. シグネチャーコンポーネント

### 6.1 Corner（面取り装飾）— 独自装飾の核

要素の角を直接丸めるのではなく、**隅に小さなレイヤーを重ねて「角が削れて背景色が覗く」面取り（ノッチ）**を作るコンポーネント。青帯や見出しコンテナの隅に貼る。

- 構造: 外側 `div`（`position: absolute; background: var(--main)` 等の面色）の中に内側 `div`（`background: var(--background)` 等の背景色）を重ね、**内側にだけ片隅 16px の角丸**を与える
- Props 相当のパラメータ: `width` / `height`（既定 20px）、配置（top/right/bottom/left）、隅の向き（TOP_LEFT → `border-radius: 16px 0 0 0` のように切替）、内側色 `color`、外側色 `bgColor`
- 1つの見出しに複数個（例: Headline は3個）配置して有機的な削り角を演出する

### 6.2 ContactButton（円形CTA）— 象徴的ボタン

```css
.ContactButton {
  width: 158px;  height: 110px;            /* PC フッター版: 256×176px */
  background: #e0804c;                     /* オレンジ */
  color: var(--text);
  border: 1px solid #342525;
  border-radius: 50%;                      /* 楕円 */
  box-shadow: 0 0 0 4px #e0804c;           /* 同色の二重リング */
  font-weight: bold;
  display: flex; flex-direction: column; justify-content: center; text-align: center;
  transition: transform 0.25s ease-in-out;
}
.ContactButton:hover { transform: rotate(-5deg); }  /* ホバーで傾く */
```

- 中身は2段: 英字ラベル `</ CONTACT >`（Poppins、10px → PC 16px）＋和文（16px → PC 23px）
- **配置時にわずかに傾ける**のが定番: ヘッダー/フッター/SPナビで `transform: rotate(4.4deg)`（フッターPC は `rotate(-10deg)`）。使われている回転値: `4.4deg` / `-5deg` / `-10deg` / `-11.72deg` / `3.6deg` — ±3〜12° の微小回転が「ステッカー感」を生む

### 6.3 Headline（下層ページ見出し）

- 構造: 小英字 `subTitle` ＋ `title`（h1、Bagor 32px）を **メインブルーの帯（`background: var(--main); color: #fff`）内に右寄せ**で置き、その下に `description`
- 帯は `border-radius: 0 0 0 16px`（左下のみR）。見出しブロック全体は上端 `8px solid var(--main)`、下端 `1px dashed var(--text)`
- Corner を3個配置して隅を面取り
- PC では**左に大きな余白／右に青帯**の非対称レイアウト（帯を右へ寄せ、description を `margin-top: -165px` で帯に食い込ませる）

### 6.4 Header

- `position: absolute; z-index: 10`。ロゴをメインブルーのブロック（`border-radius: 0 0 16px 0; padding: 20px 10px`）で包み、画面右上に青のコーナーブロック、ContactButton を `rotate(4.4deg)` で配置

### 6.5 SP 下部固定ナビ（NavigationSp）

- `position: fixed; bottom: 0; z-index: var(--maxZ)`。干渉回避のため body に `padding-bottom: 120px`（PC で 0）
- 画面下中央に**丸ピルのメニューボタン**（約 157×52px、`border-radius: 70px`）を `left: 50%; transform: translateX(-50%); bottom: 30px` で固定。背後に白の丸背景レイヤー
- 展開時（`.isActive`）: `rgba(0,0,0,0.7)` のオーバーレイ＋パネルが `scale(0→1)` + opacity（`transition: transform 0s, opacity .25s .25s ease-in-out`）で全画面化。白背景レイヤーが縦に伸長
- PC（1280px〜）では `display: none`（PC は別のナビコンポーネント）

### 6.6 Footer

- 3層構造: 最外 `background: var(--main)` → 中 `#eeefed`（左右 `8px solid var(--main)` 枠）→ 最内 `background: var(--text)`（こげ茶）の角丸ボックス `border-radius: 32px`（PC 40px）、`padding: 30px`（PC `54px 40px 120px`）
- ContactButton が `top: -40px` でフッター上端からせり出す（フッター側に `margin-top: 40px` を確保）

### 6.7 強調セクション（Message パターン）

- 地は濃紺 `#475499`、上端にメインブルーの帯（高さ16px）
- 背景に `opacity: 0.1` の巨大ロゴを絶対配置で敷く
- テキストは「未点灯 `#8189b8` → 点灯 `#fff`」を `transition: color 120ms linear` で1文字ずつ切り替える文字リビール演出

---

## 7. アニメーション

### 7.1 方針

1. オープニング（ローディング → FV）だけは**ダイナミック・大胆**に GSAP で作り込む
2. スクロールジャックや WebGL 依存の重い表現は使わない
3. ページ内のスクロール演出は控えめな fade-in のみ
4. アニメーションは `transform` / `opacity` / `clip-path` のみで実装し、レイアウトリフローを起こさない
5. `prefers-reduced-motion: reduce` を必ず尊重（演出を省略・即時表示）

### 7.2 スクロールフェードイン（FadeInOnScroll）

`IntersectionObserver`（`threshold: 0.1`, `rootMargin: '0px 0px -100px 0px'`）で可視時に `.is-visible` を付与:

```css
.fade-in-scroll {
  opacity: 0;
  transform: translateY(40px);   /* PC: 60px */
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;  /* PC: 1s */
}
.fade-in-scroll.is-visible { opacity: 1; transform: translateY(0); }
/* data-delay="1|2|3" → transition-delay: 0.1s / 0.2s / 0.3s（スタッガー） */
```

### 7.3 ホバー・トランジション基準値

- 標準: `transition: transform 0.25s ease-in-out`（ボタンの回転・拡大）
- 軽い変化: `box-shadow 0.2s ease-out` / `all 0.2s`
- リッチな動き: `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`
- ホバー表現は「**傾く（rotate）**」「拡大」が中心。色変化だけのホバーは少ない

### 7.4 オープニング演出（GSAP、TOPページのみ）

「SiiD Boot Sequence」— ローディングと FV を1本のシームレスなタイムラインとして設計:

| Phase | 内容 |
|---|---|
| 1. ローディング | メインブルー `#567eb4` ベタ背景。ロゴ SVG のストローク描画（`stroke-dasharray/offset`、約1.2s）→ fill を下から `clip-path` ワイプ。プログレスは実読込（`document.fonts.ready` + `window.load`）連動の数値カウンター（Poppins、GSAP 数値トゥイーン）。最低表示 1.6s / 最大 4s でタイムアウト |
| 2. リビール | 背景を**斜めのマスクワイプ**（`clip-path: polygon` をトゥイーン、約0.8s、`power4.inOut`）で退場。単純フェードは禁止 |
| 3. FV ビルドアップ | 背面ロゴ scale 1.15→1.0 + opacity（0.8s `expo.out`、以降 y±8px の浮遊ループ）→ メインコピーが**1文字ずつ** `back.out(1.4)` でせり上がるスタッガー（1文字0.7s、字間0.035s）→ UI 要素が 0.08s 間隔で整列（opacity + y16px）→ ScrollDown フェードイン。合計約1.5s |

- easing の常用: `expo.out` / `power2.out` / `power3.out` / `back.out(1.4)` / `sine.inOut`
- 再訪時: `sessionStorage` フラグで同一セッション2回目以降は 0.4s の短縮版
- SEO/LCP: メインコピーは DOM に最初から存在させ、JS で注入しない。初期不可視状態は CSS で定義し `<noscript>` フォールバックを用意

---

## 8. 技術前提（デザイン再現に関わるもの）

| 項目 | 内容 |
|---|---|
| Styling | **CSS Modules + CSS Custom Properties**（Tailwind 等は導入しない） |
| フォント読み込み | `next/font/google`（Noto Sans JP / Poppins、weight 400・900 のみ）＋ Bagor はローカル `@font-face` |
| CSS Reset | sanitize.css |
| スライダー | Swiper |
| アニメーション | GSAP（オープニングのみ）＋ CSS transition ＋ IntersectionObserver |
| CSS クラス命名 | コンポーネント名 PascalCase、要素は BEM 風（`Header__Logo`）、状態は `isXxx`（`isActive` / `isInvert` / `isScrolling`） |
| 画像 | `next/image`（`<img>` 禁止） |
| 品質基準 | Lighthouse モバイル Performance 80 以上、`prefers-reduced-motion` 尊重 |

---

## 9. 踏襲チェックリスト

- [ ] 3色トークン（`--main #567eb4` / `--text #342525` / `--background #f1f1f1`）＋プラン3色を定義した
- [ ] 画面左右を 8px のメインブルー縦ラインで額装した（`body::before/::after`）
- [ ] フォントは Bagor（装飾英字）/ Poppins 900（英字ラベル）/ Noto Sans JP 400・900（和文）の3系統のみ
- [ ] 見出しは weight 900 + letter-spacing 0.04〜0.12em
- [ ] 角丸は部分角丸（片隅 16px 等）を基本にし、Corner 面取りで隅を削った。真円は CTA のみ
- [ ] 影は4パターン以内。立体感は太枠・`#eeefed` 交互背景・重ねレイアウトで表現
- [ ] CTA はオレンジ `#e0804c` の円形＋同色4pxリング＋微小 rotate、ホバーで `rotate(-5deg)`
- [ ] ブレークポイントは 1280px 単一・スマホファースト
- [ ] SP は下部固定の丸ピルナビ（`z-index: 999`、body `padding-bottom: 120px`）
- [ ] スクロール演出は fade-in（translateY 40px→0、0.8s ease-out）のみ。派手な演出はオープニングに限定
- [ ] `prefers-reduced-motion` で演出が省略される
