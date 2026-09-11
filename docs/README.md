# SiiD Web ドキュメント

AI ベース開発のための仕様書・運用ドキュメント一式。**実装に着手する前に、対象タスクに関連する仕様書を必ず読むこと。**

| ドキュメント | 内容 |
|------|------|
| [01_project-overview.md](./spec/01_project-overview.md) | プロジェクト概要・技術選定・ページ一覧・Figma 対応表 |
| [02_opening-animation.md](./spec/02_opening-animation.md) | オープニング演出(ローディング → ファーストビュー)仕様 |
| [03_pages.md](./spec/03_pages.md) | 各下層ページ(courses / service / counseling / line ほか)の実装仕様 |
| [04_workflow.md](./spec/04_workflow.md) | Issue / ブランチ / PR の開発ワークフロー |
| [05_deploy.md](./spec/05_deploy.md) | Vercel デプロイ・公開計画 |
| [06_migration.md](./spec/06_migration.md) | 現行 bug-fix.org/siid からの移行・リリース計画(Cloudflare 前段方式) |
| [07_lp-career-renewal.md](./spec/07_lp-career-renewal.md) | LP リニューアル(`/siid/lp-career`)実装仕様・Photoshop 入稿データ対応 |
| [08_career-path-interviews.md](./spec/08_career-path-interviews.md) | 卒業生の進路(TOP スライダー・`/career-path`)の SiiD BLOG インタビュー記事連携 |

## 更新ルール

- **実装と食い違ったらコードが正**。ドキュメントは要約であり、ページ URL は `src/constants/meta.ts`、ルーティングは `src/app/` の構成、ナビは `src/constants/menuItems.ts`、SNS リンクは `src/constants/snsItems.ts` が唯一の情報源
- 食い違いに気付いたら、その場で作業中の PR 内でドキュメント側を直す(次回以降のセッションが誤った前提で調査を始めるのを防ぐため)
- 仕様変更が発生したら、実装 PR と同じ PR 内で該当ドキュメントも更新する
- ヒアリングで決定した事項は口頭(チャット)で終わらせず、必ず該当ドキュメントに反映する
- 未確定事項は各ドキュメント末尾の「未確定事項」セクションに列挙し、確定したら本文へ昇格させる
