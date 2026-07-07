# 02. オープニング演出仕様(ローディング → ファーストビュー)

対象 Issue: オープニング演出の実装 / 方向性: **ダイナミック・大胆**(2026-07 ヒアリング確定)

## コンセプト: 「SiiD Boot Sequence」

ローディングとファーストビューを**分断された 2 つの画面ではなく、1 本のシームレスなシーケンス**として設計する。
「システムが起動して世界が組み上がる」= プログラミングスクールらしい "ビルド" のメタファー。

```
[Phase 1: Loading]          [Phase 2: Reveal]        [Phase 3: FV Build-up]
SiiDロゴのストローク描画     ローディング背景が        メインコピーが大胆に
→ フィルが流れ込む          マスクワイプで割れて      せり上がり、背面ロゴが
→ 実読込と連動した          FVが姿を現す             スケールイン、UI要素が
  プログレス                (青→FV背景への変形)       スタッガーで整列
```

## Phase 1: ローディング(LoadingScreen リニューアル)

現状の擬似プログレス + ドット + パーティクルを全面リニューアルする。

| 項目 | 仕様 |
|------|------|
| ロゴ演出 | `HeroBackLogo` と同じ SiiD ロゴ SVG パスを流用。`stroke-dasharray/offset` によるドローオン(約 1.2s)→ 完了後に fill を下から上へワイプ(`clip-path`) |
| プログレス | **実際の読込状態と連動**: `document.readyState` + FV で使う画像・フォントの preload 完了を集計。擬似乱数インクリメントは廃止 |
| 数値表示 | 大きめのカウンター(Poppins)。GSAP の数値トゥイーンで補間し、ガタつかせない |
| 最低表示時間 | 1.6s(読込が速くてもロゴ演出を見せ切る)。最大 4s でタイムアウトして強制遷移 |
| 背景 | メインカラー `#567eb4` ベタ。パーティクルは廃止 |

## Phase 2: リビール(ローディング → FV 遷移)

- ローディング背景を**斜めのマスクワイプ**(`clip-path: polygon` を GSAP でトゥイーン、約 0.8s、`power4.inOut`)で退場させ、下から FV が現れる
- 単純なフェードアウトは禁止。「割れて出てくる」勢いを出す
- ローディングのロゴは退場時に FV の `Hero__BackLogo` 位置へ向かってスケール・移動し、背面ロゴに**モーフするように受け渡す**(FLIP 的位置合わせ)。困難な場合はロゴを拡大しながらフェードで逃がす簡易版も可(実装時に判断し、この文書を更新)

## Phase 3: FV ビルドアップ(Hero アニメーション)

リビール完了直後から GSAP タイムラインで連鎖させる(合計 約 1.5s)。

| 順序 | 要素 | 演出 |
|------|------|------|
| 1 | 背面ロゴ (`HeroBackLogo`) | scale 1.15 → 1.0 + opacity 0 → 1(0.8s, `expo.out`)。以降は常時ゆっくり漂うループ(y ±8px) |
| 2 | メインコピー (`HeroMainCopy(Pc)`) | 行ごとに `clip-path` マスクの中から下→上へせり上がるスタッガー(1行 0.7s、行間 0.12s ディレイ、`power4.out`)。大胆に、跳ねすぎない |
| 3 | サブコピー | メインコピー完了の 0.2s 前から opacity + y 20px スライドイン |
| 4 | News / ReskillBanner / NavigationPc(PC のみ) | 0.08s 間隔のスタッガーで opacity + y 16px。「UI が整列していく」印象 |
| 5 | ScrollDown | 最後にフェードイン → 以降は既存のループアニメ |

スクロール後の演出(ScrollTrigger)は本 Issue のスコープ外。将来 `fade-in-scroll` の GSAP 置き換えを検討する。

## 技術仕様

- 依存追加: `gsap`(core のみ。ScrollTrigger は使う時点で登録)
- タイムライン全体を 1 つの orchestrator(例: `hooks/useOpeningSequence.ts` または `components/Opening/`)で管理し、Phase 1〜3 を単一の GSAP timeline に載せる
- `'use client'` 前提。SSR 時のチラつき防止のため、アニメ対象要素は CSS で初期状態(不可視)を定義し、JS 無効環境向けに `<noscript>` か CSS フォールバックで可視化する
- **SEO/LCP**: メインコピーは DOM に最初から存在させる(JS で注入しない)。アニメは `transform` / `opacity` / `clip-path` のみ
- **再訪時**: `sessionStorage` にフラグを保存し、同一セッション 2 回目以降はローディングを 0.4s の短縮版(ロゴフラッシュのみ)にする
- **`prefers-reduced-motion: reduce`**: ローディングは最小限(ロゴ静止表示 + フェード)、FV は全要素即時表示

## 完了条件(Definition of Done)

- [ ] SP(〜1279px)/ PC(1280px〜)両方で意図どおり動作
- [ ] リロード連打・遅い回線(DevTools throttling)でも破綻しない(タイムアウト遷移が機能)
- [ ] `prefers-reduced-motion` で演出が省略される
- [ ] Lighthouse モバイル Performance が導入前と同等以上
- [ ] `npm run lint && npm run typecheck` パス

## 未確定事項

- ロゴ受け渡し(FLIP モーフ)を完全版でやるか簡易版にするか → 実装時にプロトタイプで判断し、ユーザーに動画/デモで確認を取る
