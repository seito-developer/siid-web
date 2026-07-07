# 04. 開発ワークフロー(Issue / ブランチ / PR)

2026-07 ヒアリングで確定した運用。**すべての実装タスクはこのフローに従う。**

## 全体フロー

```
GitHub Issue 起票
  → develop から feature ブランチを切る
  → 実装(コミット前に lint + typecheck)
  → PR を develop に向けて作成(Issue と紐付け)
  → Claude がセルフレビュー(/code-review)し、指摘を修正
  → ユーザーが最終確認してマージ(マージは必ずユーザーが行う)
  → Issue クローズ(PR の "Closes #N" で自動)
```

## ブランチ運用

| ブランチ | 役割 |
|---------|------|
| `develop` | デフォルトブランチ。PR のマージ先 |
| `feature/{issue番号}-{短い英語スラッグ}` | 機能実装(例: `feature/12-opening-animation`) |
| `fix/{issue番号}-{スラッグ}` | バグ修正 |
| `docs/{issue番号}-{スラッグ}` / `chore/{issue番号}-{スラッグ}` | ドキュメント・雑務 |

- `develop` への直接コミットは禁止
- ブランチは必ず最新の `develop` から切る
- 1 Issue = 1 ブランチ = 1 PR を原則とする(巨大化する場合は Issue を分割する)

## Issue 運用

- タイトルは日本語で `種別: 内容`(例: `feat: オープニング演出の実装`)
- 本文に「目的 / 対応する仕様書へのリンク / 完了条件チェックリスト」を書く
- ラベル: `enhancement`(機能) / `bug` / `documentation` を使用
- マイルストーン: `M1: オープニング演出` → `M2: 未実装ページ` → `M3: 公開` の順に消化する

## PR 運用

- タイトルは Issue に対応させ、本文冒頭に `Closes #N`
- 本文に「変更概要 / 確認方法(手元での動作確認手順)/ スクリーンショット(UI 変更時は必須)」
- PR 作成後、Claude が `/code-review` でセルフレビューを実施し、指摘があれば同ブランチで修正して push
- **マージ操作はユーザーのみが行う**(Claude は自動マージしない)

## コミット規約

- プレフィックス: `feat:` / `fix:` / `docs:` / `chore:` / `refactor:` / `style:`
- コミット前に必ず `npm run lint && npm run typecheck`
- UI 変更はコミット前に `npm run dev` でブラウザ実機確認(可能なら SP/PC 両方)
