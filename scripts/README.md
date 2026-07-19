# scripts

プロジェクト運用用のスクリプト置き場。

## fetch:graduates — 卒業生インタビュー動画の取得・更新

YouTube チャンネル [@programming-siid](https://www.youtube.com/@programming-siid) から
卒業生インタビュー動画を取得し、`src/data/graduates/` を更新します。

```bash
npm run fetch:graduates            # 新規動画をドラフトとして追加
npm run fetch:graduates -- --dry-run   # 変更せず検出結果だけ表示
```

### 動作

- チャンネルの動画一覧を取得し、タイトルが卒業生インタビューのパターン
  （既定: `SiiD実績` または `〇〇代男性/女性`）に一致する動画を抽出します。
- 既存の `student-*.json` は **`youtubeId` で照合して絶対に上書きしません**（非破壊マージ）。
- 新規動画は次番の `student-N.json` として追加します。機械的に取得できる項目
  （`youtubeId` / `title` / `description` / `thumbnail` / `publishedAt`、タイトルから
  推定した `age` / `sex`）のみを埋め、`"_draft": true` を付与します。

### ドラフトの公開手順

`achievement` / `detailContent` / `reason` / `detailTitle` / `course` / `tags` は
動画を視聴しないと書けない編集フィールドのため、スクリプトは空のまま追加します。
`_draft: true` の間は `getCareerPathData()` が除外するため **サイトには表示されません**。

公開するには対象の `src/data/graduates/student-N.json` を開き、

1. 上記の編集フィールドを動画の内容に基づいて記入
2. （必要なら）`description` を宣伝文から本文向けに整える
3. `"_draft": true` の行を削除

すると `/career-path` に表示されます。

### データ取得元と全履歴の取得

- 既定は **チャンネルの RSS フィード**（依存ゼロ・**最新15件**）。新着の増分更新に向いています。
- 過去動画も含めて全件取得したい場合は、YouTube Data API v3 のキーを渡します。
  プロジェクトルートの **`.env` / `.env.local` に書けば自動で読み込まれます**（スクリプトが起動時にロード）：

  ```bash
  # .env に記載する場合（推奨）
  echo 'YOUTUBE_API_KEY=xxxxx' >> .env
  npm run fetch:graduates

  # もしくは一時的に環境変数で渡す
  YOUTUBE_API_KEY=xxxxx npm run fetch:graduates
  ```

  この場合は uploads プレイリストをページングして全件取得します。実行時のログで
  `YOUTUBE_API_KEY: 検出…` と `取得元: YouTube Data API v3` が出れば API 経由です。
  `未検出` の場合は .env のキー名・場所を確認してください。

### 環境変数（任意）

| 変数 | 既定 | 説明 |
|------|------|------|
| `YOUTUBE_API_KEY` | (未設定) | 設定すると Data API v3 で全履歴を取得 |
| `SIID_CHANNEL_ID` | `UCm94WagHb7fgz6Xn5F3NXkA` | 対象チャンネル ID |
| `GRAD_TITLE_PATTERN` | `SiiD実績\|\d{2}代(?:男性\|女性)` | 卒業生動画を判定する正規表現 |
