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
- 構成: 共通下層ヘッダー(Headline / Breadcrumb)→ LINE 登録バナー(SVG)→ 特典グリッド(星バッジ付き 10 枚カード)→ LINE 登録バナー(SVG・フッター直前にもう1枚)
- **LINE 登録バナーは Figma デザインを書き出した SVG 画像**(`LineBanner`)。PC 用(`banner-pc.svg`)と SP 用(`banner-sp.svg`)を CSS のブレイクポイント(1280px)で切り替え、PC/SP でレイアウトが異なる。バナー全体が LINE 友だち追加リンク(`cursor: pointer`)で、**ページ冒頭とフッター直前の2箇所**に配置
- SVG 最適化: Figma 書き出し時は写真内包で約 6MB あったため、リッチメニュー画像を除去し、内包写真を JPEG 化・縮小＋`svgo` で **各約 300KB** に圧縮
- データ: `src/data/linePresents.json` + `src/lib/getLinePresents.ts`。コンポーネントは `src/components/Line/`(`LineBanner` / `LinePresents` / `Eyebrow`)配下
- アセット: `public/images/line/`(バナー SVG 2枚、特典カードは各画像グループを 1 枚に flatten したスクリーンショット)
- CTA(友だち追加ボタン)のリンク先: `https://siid.bug-fix.org/line/open/...`(セイト先生公式 LINE の友だち追加 URL。ユーザー提供）
- **デザイン差異・要確認**:
  - PC は「Present / 10つの特典」(10 枚)、SP は「Features / ９つの特典」(9 枚)で不一致 → より完全な **PC 版(10 枚・Present)** を採用。デザイナー確認待ち
  - 特典カードのプレビュー画像は装飾的なコラージュのため、各グループを 1 枚の PNG に flatten して掲載
  - `/line` はまだナビ・フッター・LINE バナー(`LineBanner` の `LINE_URL`)から未リンク。導線の接続方針は要確認

## 3-3. 問い合わせ導線【対応済み 2026-07 / Issue #12】

- **結論: 独立した `/contact` ページは作らない**。問い合わせ/申し込み導線の実体は `/counseling`(無料カウンセリング)であり、`ContactButton` のリンク先も既に `/counseling`。Issue #12 が前提にしていた「`/contact` のリンク切れ」はコード側で解消済みだった。
- `/counseling` は Jicoo ウィジェット(`event_types/dPvwnhRYxhQB`、本番 bug-fix.org/siid/counseling と同一)を埋め込み済み。Issue #12 では以下を追加した:
  1. **参加特典セクション**(`src/components/Counseling/Benefits/`)= 本番サイトの「7大特典」を逐語で掲載
  2. **予約完了ページ `/counseling/complete`**(`src/app/(LowerPages)/counseling/complete/`)= サンクス画面。3 ステップ案内 + TOP 導線。`robots: noindex`
- **アナリティクスタグの引き継ぎは本 PR のスコープ外**(サイト全体の別 Issue で対応)。参考として本番ページで検出したタグ: GA4 `G-54L1JQ7Q7V` / GTM `GTM-58D75LLL`・`GTM-NWT5NTNS`・`GTM-PCDDS7MV`(いずれが SiiD 専用か bug-fix.org 共通かは要確認)
- Complete ページへの遷移は Jicoo 側のリダイレクト先設定が別途必要(予約完了後に `/counseling/complete` へ飛ばす)。未設定でもページ単体は成立する。

## 3-4. 404 Not Found【実装済み 2026-07 / Issue #24】

- Figma: **`H-1 409` (3506:11730)** 準拠(Issue #24 で `H-1 408` の「カードめくり」案から仕様変更)。SP 版デザイン(H-1 410〜413)はキャンバス全走査の結果 **存在しない** ことを確認 → PC デザインを縮小した構成で実装
- 構成: 下層ナビ+青パネル「404 NOT FOUND」見出し(`NotFoundHero`。既存 `Headline` とはタイトルサイズ・破線位置が異なるため専用実装)+お詫びテキスト+**フル幅ドット絵ミニゲーム**+フッター。パンくずなし
- **ルーティング(重要)**: `src/app/not-found.tsx`(root not-found)で実装。前提として本リポジトリは root `layout.tsx` 不在の変則構成で `npm run build` 自体が失敗していたため、Issue #24 で **root `src/app/layout.tsx` を新設**し、旧 `homeLayout.tsx` を廃止・`(LowerPages)/layout.tsx` は `NavigationPcLower` のみ担当に変更した(共通クローム Icons / NavigationSp / Footer / フォントは root layout に集約)。
  - 検討済みの代替案: `(LowerPages)` 内 catch-all + `notFound()` は、動的レンダー時に SSR が `__next_error__` シェルになりクロームがクライアント描画になるため不採用。root not-found は静的プリレンダーされ完全な HTML + HTTP 404 + noindex を返す(`curl -sI` で検証済み)
- **ミニゲーム**(chrome://dino 風、`src/components/NotFound/Game/`):
  - Phaser 3.90(`next/dynamic` + `ssr: false` で404ページ限定ロード。他ルートの初期チャンクに含まれないことを `.next/app-build-manifest.json` で検証済み。遅延チャンク約1.1MB)
  - 単一シーン(idle / running / gameover)。待機画面は H-1 409 の静止再現、スペース/↑/クリック/タップで開始・ジャンプ・リスタート
  - 障害物: ヘビ(地上)/ハチ(低空・上下浮遊)/レンガ1〜2段をランダム間隔で生成。速度は 380→820px/s に漸増
  - ライフ3(ハートUI)・被弾で1500ms無敵(ハード点滅)・スコア=走行距離・ハイスコアは localStorage `siid_404_high_score`
  - 待機画面アンビエント: ハチの上下浮遊・イモムシの右→左這い移動(PRレビューで追加。イモムシは走行中も地面より少し速く這う)
  - `prefers-reduced-motion`(折衷方針・2026-07 オーナー確認): 被弾点滅は**常時適用**だが reduced 時は 3Hz 未満のゆっくり点滅に減速。待機アンビエントと走行中のハチ浮遊などの自動アニメーションは reduced 時停止(待機画面は静止を維持)。**macOS「視差効果を減らす」有効時はブラウザに reduced-motion が伝わる**ため、動作確認時は注意
- アセット: `public/images/404/*.png`(H-1 409 配下から @2x で書き出し14点)。**SVG の `var(--fill-0)` 問題を回避するため PNG を採用**したが、Figma 書き出し PNG は背景色 `#EEEFED` が不透明で入るため透過処理済み。草花(3506:11978)はほぼ背景色のみで書き出し不能につき省略
- 付帯修正: `next/font` の `subsets` 未指定によるビルドエラーも解消(`constants/common.ts` に `subsets: ['latin']` 追加)

## 3-5. OGP / favicon(付帯タスク)

- Figma に `ogp` (4265:8754, 1200×630) / `favicon.ico` (4265:8761, 48×48) / `apple-touch-icon` (4265:8766, 180×180) が用意済み
- デプロイ前に書き出して `src/app/` に配置し、`metadata` に設定する([05_deploy.md](./05_deploy.md) の公開チェックリストに含む)

## 未確定事項

- 3-2 のデザイン所在 / 3-3 の 3 点 / `/counseling` の扱い(01 参照)
