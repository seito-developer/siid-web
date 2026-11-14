---
name: daily-retro
description: 前日の会話ログ（全ワークツリー）を振り返り、「より少ない手順で期待値通りの成果を出すには」の観点で改善点を洗い出し、スキル／ドキュメントに反映して PR を作る。ユーザーが「前日の振り返り」「日次レトロ」「昨日のログを振り返って」「daily-retro」と言ったときに使う。
---

# daily-retro: 前日ログの振り返り

毎朝の定型依頼。**ログの場所探しに時間を使わず、振り返りと成果物に時間を使う**ための手順。

過去の失敗（2026-09-02 実行分）: ログの所在・前日レンジの絞り込みをゼロから探索し、
**7 回のツール呼び出しを全部“探索”に使い切ったところでセッションが中断、成果物ゼロで消滅**した。
以下の「既知の前提」は調査済みの事実なので、疑う理由がない限り再発見しない。

## 手順

### 1. ログ収集は 1 コマンドで終わらせる

```bash
python3 .claude/skills/daily-retro/scripts/collect_logs.py          # 前日(JST)
python3 .claude/skills/daily-retro/scripts/collect_logs.py 2026-09-02   # 日付指定
python3 .claude/skills/daily-retro/scripts/collect_logs.py --full   # 発話本文を長めに
```

全ワークツリー分のセッションを横断し、セッションごとに
「時間帯 / ユーザー発話 / ツール呼び出しの並び / 最後の assistant 発話 / 中断フラグ」を出す。
別リポジトリを対象にするときは `RETRO_MATCH=<repo名>` を付ける。

### 2. リポジトリ側の実績も 1 コマンドで取る

```bash
cd "$(git rev-parse --show-toplevel)" && git fetch origin -q
git log --all --since="2 days ago" --date=iso --pretty='%h %ad %d %s'
gh pr list --state all --limit 10 --json number,title,state,baseRefName,headRefName \
  --template '{{range .}}#{{.number}} [{{.state}}] {{.headRefName}} -> {{.baseRefName}} {{.title}}{{"\n"}}{{end}}'
gh issue list --state open --limit 20
```

### 3. 何を「反省点」とみなすか

ログを読むときの着眼点。**該当しなければ無理にひねり出さない**（無意味なドキュメント改変はノイズ）。

- **往復した探索**: 同じ事実を 2 回以上調べ直している → 「既知の前提」としてスキル/CLAUDE.md に固定する
- **手戻り**: ユーザーの指摘で方針を変えた／レビューで同種の指摘を繰り返し受けた → ルール化する
- **前提のズレ**: ドキュメントの記述が古く、実装と食い違っていた → ドキュメントを直す
- **中断・成果物ゼロ**: セッションが途中で落ちて何も残っていない → 進め方（早めのコミット）を見直す
- **依頼文とプロジェクトルールの矛盾**: 例「main へ PR」だが CLAUDE.md は develop 向け → 判断をスキルに明記する

### 4. 成果物を出す（中断に強い順序で）

**探索より先に成果物の受け皿を作る。** 前回はこれをやらずに全部失った。

1. `gh issue create` で Issue 起票（振り返りの根拠と完了条件を本文に書く）
2. `git switch -C docs/{issue番号}-{slug} origin/develop` — **必ず `origin/develop` を基点に切る**
   （ローカルは `main` や未マージのブランチに載っていることがある）
3. スキル追記／ドキュメント更新を書いたら**すぐコミット**する。全部書き終えてからまとめてコミットしない
4. `npm run lint && npm run typecheck`（ドキュメントのみの変更でもコミット前に一度通す）
5. PR 作成（`Closes #N`）

### 5. PR のベースブランチ

依頼文が「main へ PR」でも、**CLAUDE.md のルールに従って `develop` 向けに出す**
（`main` は develop からのリリース PR のみ受ける）。PR 本文にその旨を 1 行書いて認識を揃える。
マージはユーザーが行う。

### 6. 報告フォーマット

```
## 前日の実績
- （セッション/PR/コミットを 1 行ずつ）

## 反省点
- 事象 → なぜ手順が増えたか → どう固定したか

## 実施した変更
- ファイル: 何を追加/更新したか

## PR
- #N URL（base: develop）
```

## 既知の前提（再調査しない）

- セッションログ: `~/.claude/projects/<cwd のスラッシュをハイフンに変換した名前>/<session-uuid>.jsonl`
  - **ワークツリーごとに別ディレクトリ**になる。siid-web では
    `-Users-horiguchimasato-Documents-develop-siid-web`（本体）、
    `...-siid-web--claude-worktrees-*`、`-Users-horiguchimasato-orca-workspaces-siid-web-*` が該当。
    `*siid-web*` のパス一致で全部拾える
  - サブエージェントのログは `<session-uuid>/subagents/*.jsonl`
- **timestamp は UTC。ローカルは JST（+9）。** 「前日(JST)」= `[D-1T15:00:00Z, DT15:00:00Z)`。
  `grep '"timestamp":"YYYY-MM-DD'` で日付前方一致させると 9 時間ぶんズレる（前回やらかした）
- ログ 1 ファイルは数百 KB〜数 MB。`cat` せず、必ず `type` と `message.content` を絞って抽出する
  （`type` は `user` / `assistant` / `attachment` / `system` など。本文は `content[].text`、
  ツールは `content[].type == "tool_use"`）
- 振り返り対象日にセッションが 1 本もない日もある。その場合は「対象なし」と報告して終える
