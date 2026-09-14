---
name: project-status
description: SiiD Web の現況・残タスク・クローズ可能な Issue を 1 バッチで棚卸しする。ユーザーが「残タスクを列挙して」「今どこまで進んでる？」「完了してそうな Issue をクローズ提案して」「Issue と PR を確認して」と言ったときに使う。
---

# project-status: 現況の棚卸し

「残タスクは？」「クローズしていい Issue は？」といった問いに、**探索を往復せず一発で**答えるための手順。
毎回 `dig` / `curl` / `find` でインフラや構成を再発見しないこと（下の「既知の前提」を先に読む）。

## 手順

### 1. まず 1 コマンドで全部取る

以下をそのまま 1 回の Bash 呼び出しで実行する。個別に分けて何度も叩かない。

```bash
cd "$(git rev-parse --show-toplevel)"
git fetch origin -q
echo "=== main <-> develop 乖離（left=main only / right=develop only） ==="
git rev-list --left-right --count origin/main...origin/develop
git log --oneline origin/main..origin/develop
echo "=== ローカル現在地 ==="
git branch --show-current; git status --short
echo "=== Open Issues ==="
gh issue list --state open --limit 100
echo "=== 直近の PR（open/merged 両方） ==="
gh pr list --state all --limit 30 --json number,title,state,baseRefName,headRefName,mergedAt \
  --template '{{range .}}#{{.number}} [{{.state}}] {{.headRefName}} -> {{.baseRefName}} {{.title}}{{"\n"}}{{end}}'
echo "=== 仕様書の未確定事項 ==="
grep -n -A20 -E "^#{2,3} ([0-9.]+ )?未確定事項" docs/spec/*.md   # 06 は「## 9. 未確定事項」、07 は「### 15.3 未確定事項」
```

### 2. 「実装済みか」はコードで判定する

仕様書の「実装状況」表や CLAUDE.md は遅れていることがある。Issue が実際に片付いているかは**コードで確かめる**：

```bash
git ls-tree -r --name-only origin/develop src/app   # 実在するページ
git log --oneline origin/develop -- <関係するパス>   # その機能に触れたコミット
```

Issue 本文の完了条件チェックリストと、上の実体を突き合わせる。

### 3. クローズ提案の判断基準

- **クローズ提案してよい**: 完了条件を満たすコードが `origin/develop` に入っている／別 PR で実質対応済み／`Closes #N` の書き漏れで自動クローズされなかっただけ
- **クローズしない**: ユーザー側の外部作業（DNS 設定・Vercel 設定・デザイナー確認）が完了条件に含まれ、その完了が確認できていない
- 判断がつかないものは「要確認」として分けて出す。**Claude が勝手にクローズしない。必ず提案に留め、実行はユーザーの承認後**

### 4. 出力フォーマット

依頼が「簡潔に列挙して」の場合は 1 タスク 1 行。長い解説を付けない。

```
## クローズ提案（根拠つき）
- #N タイトル — 〜が origin/develop にあるため完了と判断

## 残タスク（Issue）
- #N 一言

## 残タスク（仕様書側・Issue 化されていないもの）
- 一言（出典: docs/spec/0X_xxx.md）

## 要確認
- #N なぜ判断できないか
```

## 既知の前提（再調査しない）

これらは調査済みの事実。変わったと疑う理由がない限り、コマンドで再確認しない。

- 複数のワークツリーで並行作業しており、ローカルのブランチは `develop` より遅れていることが多い。基準は常に `origin/develop`（ローカルの `develop` へ switch しない。CLAUDE.md「作業開始時の前提確認」）
- 公開まわり（Cloudflare / DNS / Vercel / 旧サイトからの移行）の設計は `docs/spec/06_migration.md` と `docs/spec/05_deploy.md` に書かれている。`dig` や `curl` で調べ直す前にこの 2 つを読む
- Vercel の Production Branch は `main`。`develop` → `main` のリリース PR が本番反映のトリガー
- デザイナー確認待ち・ユーザーの外部作業待ちの項目は `docs/spec/03_pages.md` / `05_deploy.md` の末尾にある

## 更新ルール

棚卸しの過程で仕様書と実装の食い違いを見つけたら、その場でユーザーに報告し、修正はドキュメント更新の PR にまとめる（CLAUDE.md の「ドキュメントとコードが食い違ったときの優先順位」に従う）。
