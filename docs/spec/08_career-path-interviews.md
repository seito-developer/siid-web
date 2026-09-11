# 08. 卒業生の進路(SiiD BLOG インタビュー記事連携)

TOP の「卒業生の進路」スライダーと `/career-path/[page]` 一覧のデータ源を、リポジトリ内の JSON から **SiiD BLOG(microCMS)の「受講生様インタビュー」記事**へ切り替える(Issue #75)。

## 1. 背景・目的

- 旧実装は `src/data/graduates/*.json`(YouTube 動画 ID・タグ・説明文)を手作業で更新しており、更新性が悪かった。34 件中、公開中は 10 件のみ。
- 受講生インタビューは今後 SiiD BLOG(`https://blog.bug-fix.org/category/interview`)で更新していく。記事を唯一の更新先とし、サイトは記事を一覧化して記事ページへ誘導する。

## 2. 決定事項(2026-09-11 ヒアリング)

| 項目 | 決定 |
|---|---|
| 切替範囲 | TOP のスライダーと `/career-path` 一覧の**両方**。JSON は廃止 |
| 遷移 | 記事ページ(別ドメイン)を**別タブ**で開く(`target="_blank"` / `rel="noopener noreferrer"`) |
| 一覧の表示項目 | アイキャッチ画像・記事タイトル・公開日・プロフィールタグ |
| タグの出どころ | **タイトルから自動抽出**(§4)。microCMS にタグのフィールドは無く、追加もしない |
| 詳細モーダル(`?id=`) | 廃止。クリックは記事ページへの遷移のみ |

## 3. データ取得

`src/lib/getInterviews.ts`(`getNews.ts` と同じ方式)。

| 項目 | 値 |
|---|---|
| エンドポイント | `blog`(SiiD BLOG と同じ microCMS サービス) |
| 絞り込み | `categories[contains]interview`(カテゴリ ID `interview` = 「受講生様インタビュー」) |
| 並び順 | `-publishedAt`(新しい順) |
| 取得フィールド | `id,title,publishedAt,eyecatch` |
| キャッシュ | `next.revalidate: 600`(10 分ごとに再検証。記事を公開すると再デプロイ不要で最長 10 分後に反映) |
| タイムアウト | 5 秒(`AbortSignal.timeout`) |
| 環境変数 | `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY`(News と共通。Vercel に登録済み) |

- 記事 URL は `https://blog.bug-fix.org/blog/{id}`(microCMS のコンテンツ ID = 記事スラッグ)。
- 実データ(2026-09-11 時点): 35 件。全件にアイキャッチあり(1280×720)。
- アイキャッチは `images.microcms-assets.io` から `next/image` で最適化配信する(`next.config.ts` の `remotePatterns` に追加)。

## 4. タグの自動抽出

`src/utils/interview.ts` の `extractProfileTags()`。

タイトルは「**プロフィール**が**成果**した話」の形で運用されている。

1. 最初の「が」より前をプロフィールとみなす
2. **括弧の外の**「・」で区切ってタグにする(`文系大学4年生（男性・兵庫県）` は 1 つのタグ)
3. 次の場合はタグなし(空配列)とし、表示は崩さない
   - 「が」が無い、または先頭にある
   - プロフィール部分が 40 字を超える(「が」がプロフィール以外の位置にあるとみなす)

| タイトル | タグ |
|---|---|
| 30代女性・商社の経理職（大阪府）が完全未経験から… | `30代女性` `商社の経理職（大阪府）` |
| 文系大学4年生（男性・兵庫県）が一度の挫折を… | `文系大学4年生（男性・兵庫県）` |
| 工学部の大学生（女性）が地方から… | `工学部の大学生（女性）` |

現行 35 件すべてで抽出できることを確認済み。**記事タイトルの付け方を変える場合はタグ表示に影響する**ため、この形式を維持すること。

## 5. 表示

### 5.1 TOP「卒業生の進路」スライダー

- 最新 **8 件**。カードはアイキャッチ・タイトル・タグ(公開日はスライダーの既存レイアウトに無いため出さない)。
- 「Powered by」の表記を YouTube チャンネルから **SiiD BLOG**(インタビューカテゴリへのリンク)に変更。

### 5.2 `/career-path/[page]` 一覧

- 1 ページ 10 件(`ITEMS_PER_PAGE`)。microCMS 側で `offset` / `limit` によりページ分だけ取得する。
- ビルド時の件数分のページを `generateStaticParams` で事前生成(SSG + 10 分 ISR)。記事が増えて生じた新しいページ番号は初回アクセス時に生成される。
- カード: アイキャッチ → 公開日(`yyyy/mm/dd`、Asia/Tokyo 固定)→ タイトル → タグ。
- 範囲外・不正なページ番号(`0` / `abc` / `1.5` / 総ページ数超)は `/career-path/1` へリダイレクト。
- 既存の「その他の受講生様実績はこちら」(YouTube)・「過去の卒業生のアンケート内容はこちら」リンクは維持。

### 5.3 sitemap

`/career-path/1` 〜 総ページ数を載せる。件数は microCMS に `limit: 1` で問い合わせて得る。

## 6. 取得失敗時の挙動

環境変数の未設定・API エラー・タイムアウトの場合、`getInterviews` は `{ contents: [], totalCount: 0 }` を返し、原因をサーバーログ(`[getInterviews]`)に残す。

| 箇所 | 挙動 |
|---|---|
| TOP | セクション見出しは表示し、スライダーのみ非表示(Swiper の loop は 0 件で動かないため) |
| `/career-path/[page]` | 200 で「インタビュー記事を読み込めませんでした」と SiiD BLOG への案内を表示。**リダイレクトしない**(総ページ数 0 のときに `/career-path/1` へ戻すと自身への無限リダイレクトになるため) |
| sitemap | `/career-path/1` のみ載せる |

## 7. 廃止したもの

- `src/data/graduates/*.json`(34 件)・`src/lib/getCareerPathData.ts`・`src/types/career.ts`
- 詳細モーダル `CareerModal` / `CareerModalWrapper`、YouTube サムネイル URL 生成 `src/utils/youtube.ts`
- `scripts/fetch-graduates.mjs` と `npm run fetch:graduates`
