---
name: feature-work
description: GitHub Issue を起点に feature ブランチを切り、実装〜セルフレビュー〜PR 作成まで行う SiiD Web の標準開発フロー。ユーザーが「Issue #N やって」「次のタスク進めて」「feature-work」と言ったときに使う。
---

# feature-work: Issue 駆動の実装フロー

SiiD Web の標準フロー。詳細ルールは `docs/spec/04_workflow.md` を参照。

## 手順

1. **Issue 確認**: `gh issue view <N>` で目的・完了条件を読む。Issue 本文からリンクされた `docs/spec/` の仕様書を必ず読む
2. **ブランチ作成**: 最新 develop から切る
   ```bash
   git checkout develop && git pull origin develop
   git checkout -b feature/<N>-<slug>
   ```
   種別により `fix/` `docs/` `chore/` プレフィックスを使い分ける
3. **実装**:
   - Figma 参照が必要な場合、ノード ID は `docs/spec/01_project-overview.md` の対応表から特定し、**最小回数**で `get_design_context` を呼ぶ(View シートのレート制限があるため)
   - 既存下層ページ(`/service`, `/community`)の実装パターンと CSS Modules 命名規則(CLAUDE.md 参照)を踏襲する
4. **検証**: `npm run lint && npm run typecheck` を通し、UI 変更は `npm run dev` でブラウザ確認(SP: 〜1279px / PC: 1280px〜 の両方)
5. **コミット & PR**:
   - コミットは `feat:` 等のプレフィックス付き
   - PR は develop 向け、本文冒頭に `Closes #<N>`、変更概要・確認方法・UI 変更ならスクリーンショットを記載
6. **セルフレビュー**: PR 作成後に `/code-review` を実行し、指摘を修正して push
7. **完了報告**: PR URL をユーザーに共有し、**マージはユーザーに委ねる**(自動マージ禁止)

## 禁止事項

- develop への直接コミット
- lint / typecheck 未通過でのコミット
- Issue・仕様書を読まずに実装を始めること
