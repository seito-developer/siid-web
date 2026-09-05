---
name: feature-work
description: GitHub Issue を起点に feature ブランチを切り、実装〜セルフレビュー〜PR 作成まで行う SiiD Web の標準開発フロー。ユーザーが「Issue #N やって」「次のタスク進めて」「feature-work」と言ったときに使う。
---

# feature-work: Issue 駆動の実装フロー

SiiD Web の標準フロー。詳細ルールは `docs/spec/04_workflow.md` を参照。

## 手順

0. **着手前の一括確認（外部素材・制約がからむタスクのみ）**:
   デザインデータ・動画・スプレッドシート等の外部素材を扱うタスクでは、**探索や解析を始める前に**
   次を 1 回の質問（`AskUserQuestion`）でまとめて確認する。ローカルを `find` で探し回らない。
   - **素材の絶対パス**: `~/Downloads` 等を推測で探索しない。Google Drive 上の Office ファイルは
     ダウンロード経由で往復するので、**ローカルパスを先に貰う**
   - **利用可能な制約**: フォントライセンス（Adobe Fonts の契約有無 / Google Fonts 縛り）、
     使ってよい外部サービス、既存実装・ブランドカラーを流用するか無視するか
   - **完了条件**: 何をもって「一致」「完了」とするか（数値基準・チェックリストの所在）

   > 過去の損失（2026-09-06 LP リニューアル）: 素材の所在を推測して探索し訂正され（2 ツール + 1 往復）、
   > さらにフォント特定のため Adobe Fonts 同期フォルダを走査・比較画像を 3 枚生成した末に
   > 「AdobeFonts は契約していない」と判明し、**約 8 ツール呼び出しが丸ごと無駄**になった。
   > 制約は解析より先に聞けば 1 質問で済む。

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
- 外部素材の所在をユーザーに聞かずにローカルを探索すること
- ライセンス・利用可否を確認する前に、その素材の解析に時間を使うこと
