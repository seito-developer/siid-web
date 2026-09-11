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
  - ~~LINE バナーのリンク先 URL 未確定~~ → **確定(Issue #51)**: `/line` ページへリンク(§3-2 の「導線」参照)
  - 「※Fullsuport,VIP Editionコースのみ」のタイポは原文ママ
  - **グローバルナビ「コース/プラン」の遷移先(Issue #51 で確定)**: 親項目は `/courses`、下層3項目は各コースカードのアンカー `/courses#plan-career` / `#plan-full-support` / `#plan-vip`。アンカー ID は `src/constants/coursePlans.ts` の `COURSE_PLAN_ANCHOR_IDS` で一元管理し、ナビ(`menuItems.ts`)とカード(`CoursePlans.tsx`)の双方が参照する(片方だけ変更するとリンク切れになるため)

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
- **導線(Issue #51 で確定)**: コース一覧ページ(`/courses`)の LINE バナー(`components/Courses/LineBanner`)から `/line` へリンクする。同バナーは友だち追加 URL 直リンクではなく `/line` を経由させる(CTA 文言が「詳細はこちら」であり、`/line` 内に友だち追加 CTA があるため)。グローバルナビ・フッターのメニューには `/line` を追加していない

## 3-3. 問い合わせ導線【対応済み 2026-07 / Issue #12】

- **結論: 独立した `/contact` ページは作らない**。問い合わせ/申し込み導線の実体は `/counseling`(無料カウンセリング)であり、`ContactButton` のリンク先も既に `/counseling`。Issue #12 が前提にしていた「`/contact` のリンク切れ」はコード側で解消済みだった。
- `/counseling` は Jicoo ウィジェット(`event_types/dPvwnhRYxhQB`、本番 bug-fix.org/siid/counseling と同一)を埋め込み済み。Issue #12 では以下を追加した:
  1. **参加特典セクション**(`src/components/Counseling/Benefits/`)= 本番サイトの「7大特典」を逐語で掲載
  2. **予約完了ページ `/counseling/complete`**(`src/app/(LowerPages)/counseling/complete/`)= サンクス画面。3 ステップ案内 + TOP 導線。`robots: noindex`
- **アナリティクスタグの引き継ぎは本 PR のスコープ外**(サイト全体の別 Issue で対応)。参考として本番ページで検出したタグ: GA4 `G-54L1JQ7Q7V` / GTM `GTM-58D75LLL`・`GTM-NWT5NTNS`・`GTM-PCDDS7MV`(いずれが SiiD 専用か bug-fix.org 共通かは要確認)
- Complete ページへの遷移は Jicoo 側のリダイレクト先設定が別途必要(予約完了後に `/counseling/complete` へ飛ばす)。未設定でもページ単体は成立する。
- **コンバージョン特化レイアウト【対応済み 2026-07 / Issue #42】**: SEO コンサルタントの助言(フォームページから離脱リンクを排除すると CVR が改善する)に基づき、`/counseling` のみ共通クロームを簡易表示に変更。対象パスは `src/constants/conversionFocusedPages.ts` で一元管理し、各コンポーネントが `usePathname()` で判定する。
  - PC ナビ(`NavigationPcLower`)・SP ナビ(`NavigationSp`): ヘッダーごと非表示(`return null`)。当初はリンクなしロゴのみ残す実装だったが、見た目の違和感からオーナー指示で丸ごと非表示に変更(2026-07)
  - フッター(`Footer` / `FooterMenu`): コピーライトのみ表示(メニュー・SNS・プライバシーポリシー等のリンク、CONTACT ボタン、ページトップも非表示)
  - パンくずも TOP へのリンクを含むため `/counseling` からは削除(Issue 記載外だが趣旨に合わせた対応)
  - `/counseling/complete` は対象外(通常レイアウトのまま)

## 3-4. 404 Not Found【実装済み 2026-07 / Issue #24】

- Figma: **`H-1 409` (3506:11730)** 準拠(Issue #24 で `H-1 408` の「カードめくり」案から仕様変更)。SP 版デザイン(H-1 410〜413)はキャンバス全走査の結果 **存在しない** ことを確認 → PC デザインを縮小した構成で実装(ミニゲームのみ Issue #38 で SP は 16:9 キャンバスに変更。1440px 幅デザインの右端装飾(看板・猫・雲C)は SP の待機画面では画面外となり、走行中にスクロールで登場する)
- 構成: 下層ナビ+青パネル「404 NOT FOUND」見出し(`NotFoundHero`。既存 `Headline` とはタイトルサイズ・破線位置が異なるため専用実装)+お詫びテキスト+**フル幅ドット絵ミニゲーム**+フッター。パンくずなし
- **ルーティング(重要)**: `src/app/not-found.tsx`(root not-found)で実装。前提として本リポジトリは root `layout.tsx` 不在の変則構成で `npm run build` 自体が失敗していたため、Issue #24 で **root `src/app/layout.tsx` を新設**し、旧 `homeLayout.tsx` を廃止・`(LowerPages)/layout.tsx` は `NavigationPcLower` のみ担当に変更した(共通クローム Icons / NavigationSp / Footer / フォントは root layout に集約)。
  - 検討済みの代替案: `(LowerPages)` 内 catch-all + `notFound()` は、動的レンダー時に SSR が `__next_error__` シェルになりクロームがクライアント描画になるため不採用。root not-found は静的プリレンダーされ完全な HTML + HTTP 404 + noindex を返す(`curl -sI` で検証済み)
- **ミニゲーム**(chrome://dino 風、`src/components/NotFound/Game/`):
  - Phaser 3.90(`next/dynamic` + `ssr: false` で404ページ限定ロード。他ルートの初期チャンクに含まれないことを `.next/app-build-manifest.json` で検証済み。遅延チャンク約1.1MB)
  - 単一シーン(idle / running / gameover)。待機画面は H-1 409 の静止再現、スペース/↑/クリック/タップで開始・ジャンプ・リスタート
  - キャンバス解像度(Issue #38): PC(1280px〜)は 1440×500、SP は 889×500(≒16:9。1440×500 のままでは FIT 縮小で画面が小さくなりすぎるため)。ブレイクポイント跨ぎ時は Phaser ゲームを破棄・再生成する。`aspect-ratio` は padding を持つセクションではなく `.GameCanvas` 側に指定(レターボックス防止)
  - 障害物: ヘビ(地上)/ハチ(低空・上下浮遊)/レンガ1〜2段をランダム間隔で生成。速度は 380→820px/s に漸増
  - ライフ3(ハートUI)・被弾で1500ms無敵(ハード点滅)・スコア=走行距離・ハイスコアは localStorage `siid_404_high_score`
  - 待機画面は**完全静止**とし、障害物風オブジェクト(レンガ/ハチ/イモムシ)は配置しない(PRレビュー指摘: 当たり判定のない紛らわしい配置を避ける。H-1 409 の該当要素はゲーム内でのみ登場)。開始後 2.5 秒は障害物を出現させない
  - 走行中の敵の動き(PRレビューで追加): ハチは上下浮遊、イモムシは地面スクロールより少し速く右→左に這う
  - `prefers-reduced-motion`(折衷方針・2026-07 オーナー確認): 被弾点滅は**常時適用**だが reduced 時は 3Hz 未満のゆっくり点滅に減速。走行中のハチ浮遊などの自動アニメーションは reduced 時停止。**macOS「視差効果を減らす」有効時はブラウザに reduced-motion が伝わる**ため、動作確認時は注意
- アセット: `public/images/404/*.png`(H-1 409 配下から @2x で書き出し14点)。**SVG の `var(--fill-0)` 問題を回避するため PNG を採用**したが、Figma 書き出し PNG は背景色 `#EEEFED` が不透明で入るため透過処理済み。草花(3506:11978)はほぼ背景色のみで書き出し不能につき省略
- 付帯修正: `next/font` の `subsets` 未指定によるビルドエラーも解消(`constants/common.ts` に `subsets: ['latin']` 追加)

## 3-5. OGP / favicon(付帯タスク)

- Figma に `ogp` (4265:8754, 1200×630) / `favicon.ico` (4265:8761, 48×48) / `apple-touch-icon` (4265:8766, 180×180) が用意済み
- デプロイ前に書き出して `src/app/` に配置し、`metadata` に設定する([05_deploy.md](./05_deploy.md) の公開チェックリストに含む)

## 3-6. 旧サイトからの移植ページ【実装済み 2026-07 / Issue #40】

旧サイト(bugfix-corp / bug-fix.org)の 3 ページを移植。URL は `/siid/` prefix を外した(本番は `SITE_URL = bug-fix.org/siid` 配下で公開されるため、公開 URL は旧サイトと同一になる)。

- **`/lp-1`** — 広告流入用の独立LP。旧LPのデザイン(navy×orange のネオブルータリズム)を忠実再現
  - **root layout を分割**: `src/app/(Main)/`(既存サイト一式 + 共通クローム)と `src/app/(Lp)/`(LP専用・クローム無し)の 2 つの route group がそれぞれ root layout を持つ。未知 URL は `(Main)/[...notFound]/page.tsx`(catch-all)で dino 404 に着地させる
  - 旧 `style.css`(1662行)は `(Lp)/lp1.css` にグローバルCSSとして逐語移植(CSS Modules 規約の例外。route group 隔離により `(Main)` 側へは影響しない)
  - フォントは LP 専用に `(Lp)/fonts.ts` で定義(Noto Sans JP 400-900 / Poppins 500-800 / Barlow Semi Condensed 700)。`constants/common.ts` は変更しない
  - セクションは `src/components/Lp1/` に分割。FAQ 開閉・SP追従CTA・Jicoo ウィジェット遅延ロード(IntersectionObserver, rootMargin 600px)のみ client component
  - metadata は旧 head から移植。**noindex**(新TOPと訴求が重複するため。2026-07 オーナー決定)
- **`/counseling-complete-lp-1` / `/counseling-complete`** — 申込完了ページ(いずれも noindex)。(LowerPages) パターンで新サイトデザインに載せ替え
  - 2 ページは見た目・文言とも同一で、本体は共通コンポーネント `src/components/CounselingComplete/CounselingCompleteSection.tsx` に集約(旧サイトでも両 URL がほぼ同一内容で存在。`/counseling-complete` はオーナー指示で追加 2026-07)
  - OpenAI Ads の CV 計測 `__bugfixTrackOpenAIAds('appointment_scheduled', {type:'customer_action'})` を両ページともマウント時に 1 回発火(`src/components/Analytics/TrackOpenAiAdsConversion.tsx`。発火関数は Analytics.tsx が env `NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID` 設定時に定義)
  - meta 定義は `pages.counselingCompleteLp1` / `pages.counselingCompleteFlat`(既存 `/counseling/complete` 用の `counselingComplete` キーとは別)
  - ※既存 `/counseling/complete` には CV 発火なし(必要なら同コンポーネントを配置するだけで対応可能・別 Issue 推奨)
- **`/white-paper`** — 資料請求ページ(index 可・sitemap 登録済み)。資料イメージ 2 枚 + 公式LINE誘導(`https://bit.ly/4p3SOBn`)。(LowerPages) パターン

## 未確定事項

- 3-2 のデザイン所在 / 3-3 の 3 点
