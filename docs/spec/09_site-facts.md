# 09. サイト内で統一する数値・条件・表記

Issue #122 / #123 の対応で決めた「サイト全体で 1 つに揃える事実」と表記ルール。文言を追加・変更するときはこの表に合わせる。ここに無い数値を新しく書くときは、この表に追記してから使う。

## 1. 情報源の優先順位

同じ事実がページごとに違う値で書かれていた（Issue #122）ため、次の順で「正」を決めた。

1. **ユーザー提供の確定原稿**（例: TOP の FAQ。Issue #82、2026-09-15）
2. **`/lp-career` の入稿データ**（`docs/spec/lp-career-sections/`、2026-09。クライアント支給のカンプ）
3. 上記に無いものは `src/data/coursePlans.json`・`src/constants/courseData.ts` の既存値

## 2. 統一した値（2026-09-16 時点）

| 項目 | 統一した値 | 根拠 | 主な記載箇所 |
|---|---|---|---|
| Zoom 相談 | **毎日 21:00〜23:00** | TOP FAQ 確定原稿 | `Faq.tsx` / `SupportList.tsx` / `coursePlans.json`（比較表 Zoom）/ `OnlineSection.tsx` / `lpCareerDifference.ts` |
| チャット質問 | 24 時間受付 | 同上 | `Faq.tsx` / `SupportList.tsx` / `coursePlans.json` |
| カリキュラムへのアクセス | **無期限**（全プラン） | LP FAQ「卒業後もカリキュラムへの無期限アクセス」・`/service`「永久アクセス」 | `courseData.ts` / `coursePlans.json` / `SupportList.tsx` / `lpCareerDifference.ts` |
| 個別コンサル（1on1） | Career **なし** / Career +Full Support **転職成功まで最大月 1 回（30 分）** / 顧問プラン **月 1〜3 回** | プランカード（`courseData.ts`・`coursePlans.json`） | TOP 比較表 / `/courses` 比較表 / `SupportList.tsx` |
| 書類添削・模擬面接・ポートフォリオ添削 | Career **2 回まで**（ポートフォリオは各工程 2 回）/ Full Support 以上 **無制限** | 同上 | `courseData.ts` / `coursePlans.json` / `FeaturesList.tsx`（回数はプランにより異なる旨を注記） |
| 回数の語 | 回数の上限が無い → **無制限**、期間の上限が無い → **無期限** | 語の意味 | 全体 |
| YouTube 登録者数 | **約 13 万人**（YouTube 登録者として書く。「総フォロワー」とは書かない） | LP FV・講師紹介（入稿データ） | `Supporter.tsx` / `Fv.tsx` / `Instructor.tsx` / `linePresents.json` / `Event.tsx` |
| 採用・選考実績 | **2,000 人超を選考、150 名以上を採用** | LP 講師紹介（入稿データ） | `StrengthList.tsx` / `Instructor.tsx` / `linePresents.json` |
| エンジニア歴 | **14 年以上**（2012 年〜） | 講師プロフィール（2012 年卒）・カウンセリング特典画像「歴 14 年」 | `StrengthList.tsx` |
| 講師の肩書 | **主任講師**（堀口セイト）。サブ講師は「サポート講師 002〜」 | TOP FAQ 確定原稿・LP コース表 | `Supporter.tsx` / `Faq.tsx` / `lpCareerCourseTable.ts` |
| コース名 | **Career** / **Career +Full Support** / **顧問プラン**（ミニマム / スタンダード / チーム。コード上の id は `vip` のまま） | `courseData.ts`・`coursePlans.json` | `menuItems.ts` ほか本サイト全体（LP は入稿データの「Career + FullSupport」「顧問プラン」のまま） |
| YouTube チャンネル URL | メイン `@webit7652`（講師カード）/ 対談動画 `@programming-siid`（SNS メニュー・予約完了ページ） | 料金表と同じ資料の SNS 一覧 | `Supporter.tsx` / `snsItems.ts` / 完了ページ |
| 会社表記（コピーライト） | **© BugFix LLC. All rights reserved.**（本サイトは年を入れない。LP は入稿データ通り「© 2026」の年付き。静的ビルドのため `new Date()` でも build 時に固定されるので、リテラルのまま毎年更新する） | LP Footer | `FooterMenu.tsx` / `LpCareer/Footer.tsx` |
| 給付金 | 経産省リスキル講座に認定されているのは **Career コース（12 ヶ月プラン）**。「最大 80% OFF」は Career の場合。Full Support は Career 部分が対象。顧問プランは対象外 | TOP FAQ・LP FAQ | `ReskillBannerSection.tsx` / `meta.ts` / `courseData.ts` |
| 受講期間 | 12 ヶ月（＋アフターサポート）。TOP の「8-12ヶ月でITエンジニアへ」は受講開始から内定までの目安なので矛盾ではない | LP コース表 | `ComparisonTable.tsx` / `Cource.tsx` |
| カウンセリング所要時間 | 60〜90 分 | `meta.ts` | `/counseling` / `/lp-career` |
| LINE 特典の件数 | `/line` は「10 の特典」、カウンセリング／LP は「7 大特典」。「言語 22 選」（LINE 特典・画像に焼き込み）と「言語 27 選」（カウンセリング特典）は別教材 | 各画像 | `linePresents.json` / `Benefits.tsx` / `lpCareerGifts.ts` |
| LINE 登録 URL | `/line` と `/white-paper` で URL が違うのは計測用（bit.ly → utage-system.com）。統一しない | — | `LineBanner.tsx` / `white-paper/page.tsx` |

## 3. 価格（2026-09-16 確定。料金表 = Google スプレッドシート「料金プラン」）

価格の唯一の情報源はオーナー管理の料金表（Google スプレッドシート `19XEkS7cndvOJhmXCOBwzy3zaiaCU5X6YujhGB24fVh4`）。サイトに載せる値は次の通り。

| プラン | 費用（税込） | 給付金適用後（最大値） | 24 回分割の月額 | 備考 |
|---|---|---|---|---|
| Career | **528,000 円** | **105,600 円〜** | 22,000 円〜 | リスキル講座認定。給付金の中央値 158,400 円 / 最小値 264,000 円 |
| Career +Full Support | **698,000 円** | **275,600 円〜** | 29,083 円〜 | 個人向けの主力。給付金の中央値 328,400 円 / 最小値 434,000 円 |
| 顧問プラン（企業・個人事業主向け） | 660,000 円〜（ミニマム）/ 990,000 円〜（スタンダード）/ 1,650,000 円〜（チーム）。**サイトでは金額を出さず「要お問い合わせ」** | 対象外 | 27,500 円〜 | 期間 6 ヶ月〜。個別コンサルは月 1〜3 回。「カリキュラムへのアクセス」「オフ会・イベント参加」はサイトに出さない（オーナー指示 2026-09-16）。旧「Career +VIP Edition（898,000 円）」は廃止し、このプランに置き換えた |
| Basic | 128,000 円 | 対象外 | 5,333 円 | **Web サイトには載せない**（個別説明会でのダウンセル用） |

- TOP コースカード（`courseData.ts`）は給付金適用後の価格、`/courses`（`coursePlans.json`）は通常価格 + 適用後を表示。顧問プランは `price` を持たず「要お問い合わせ」（給付金対象外）
- 「月々 22,000 円〜」など LP の分割払い額は通常価格ベース。給付金は修了後の還付のため矛盾ではない
- 講師カード（TOP）の YouTube リンクは本人のメインチャンネル `@webit7652`。`@programming-siid` は対談動画チャンネルで、SNS メニューと予約完了ページはこちら
- カウンセリング特典画像の「歴 14 年」「歴 13 年」は画像に焼き込まれているため、alt は画像通り。画像を作り直すときに 14 年へ揃える

## 4. 表記ルール（Issue #123）

| 種類 | ルール | 例 |
|---|---|---|
| 数字 | **半角**。桁区切りはカンマ | 2回まで / 2,000人 / 21:00 |
| 助数詞 | 人数は「人」。「名」は使わない | 150人以上 |
| 範囲 | 全角の波ダッシュ **「〜」**（U+301C）。「～」「~」は使わない | 21:00〜23:00 / 60〜90分 |
| 括弧 | 日本語文中は **全角「（）」**。英数字だけの語に付く場合も全角 | 個別コンサル（1on1）/ 円（税込） |
| 記号 | 文末は「。」か「！」。「◎」「＝」を文末・接続に使わない | — |
| プラス | コース名は半角「+」（`Career +Full Support`）。文中の「〜と〜」は「＋」を使わず「と」で書く | — |
| 割引 | 「最大80%OFF」。「オフ」「オフ！」は使わない | — |
| 制度名 | 「リスキル講座」（正式名: 第四次産業革命スキル習得講座）。「Reスキル講座」は画像内の表記のみ | — |
| 呼称 | 受講中の人は「受講生」。「受講者」は使わない | 受講生の声 |
| 人名 | 「堀口セイト」（スペースなし） | — |
| 製品名 | `SiiD Passport` / `SiiD Quest`（スペースあり）、`Fly.io`、`GitHub Copilot`、`Claude Code` | — |
| 送り仮名 | 「お問い合わせ」「ご参加ください」（補助動詞はひらく） | — |
| 書名 | 『 』で囲む。閉じ括弧の前にスペースを入れない | 『セイト先生が教えるプログラミング入門』 |
| 丸数字・環境依存文字 | 使わない（alt も含む） | オフ会写真① → オフ会の集合写真 |
