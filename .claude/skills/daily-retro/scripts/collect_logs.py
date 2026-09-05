#!/usr/bin/env python3
"""前日（JST）のセッションログを全ワークツリー分まとめて要約出力する。

使い方:
    python3 .claude/skills/daily-retro/scripts/collect_logs.py            # 前日(JST)
    python3 .claude/skills/daily-retro/scripts/collect_logs.py 2026-09-02 # 日付指定(JST)
    python3 .claude/skills/daily-retro/scripts/collect_logs.py 2026-09-02 --full  # 本文を長めに出す

ログの前提（調べ直さないこと）:
  - 置き場所は ~/.claude/projects/<cwd のスラッシュをハイフンにしたディレクトリ名>/<session-uuid>.jsonl
  - ワークツリーごとに別ディレクトリになる（git worktree / orca workspaces も別扱い）
  - timestamp は UTC。JST の「前日」は暦日ではなく **対象日 05:00 JST 〜 翌日 05:00 JST**
    （深夜 1〜3 時の作業を「その晩」として対象日側に含めるため。暦日で切ると一晩の作業が
     2 日に分断され、本命のセッションが振り返りから丸ごと漏れる）
    起点は環境変数 RETRO_DAY_START_HOUR で変更できる（既定 5）
  - サブエージェントのログは <session-uuid>/subagents/*.jsonl
"""
import json
import re
import os
import sys
from datetime import datetime, timedelta, timezone

JST = timezone(timedelta(hours=9))
PROJECTS = os.path.expanduser("~/.claude/projects")
# 対象プロジェクトの絞り込みキーワード（リポジトリ名）。必要なら書き換える。
MATCH = os.environ.get("RETRO_MATCH", "siid-web")


# 「1日」の起点(JST)。5 = 05:00 起点なので、深夜 0〜5 時の作業は前日側に含まれる。
DAY_START_HOUR = int(os.environ.get("RETRO_DAY_START_HOUR", "5"))


def jst_window(day: str):
    """対象日(JST)の [DAY_START_HOUR:00, 翌日 DAY_START_HOUR:00) を UTC 文字列で返す。"""
    d = datetime.strptime(day, "%Y-%m-%d").replace(tzinfo=JST, hour=DAY_START_HOUR)
    start = d.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
    end = (d + timedelta(days=1)).astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S")
    return start, end


def iter_logs():
    for root, _dirs, files in os.walk(PROJECTS):
        if MATCH not in root:
            continue
        for name in files:
            if name.endswith(".jsonl"):
                yield os.path.join(root, name)


def load(path):
    rows = []
    with open(path, encoding="utf-8", errors="replace") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return rows


def blocks(entry):
    content = (entry.get("message") or {}).get("content")
    if isinstance(content, str):
        return [{"type": "text", "text": content}]
    return [b for b in (content or []) if isinstance(b, dict)]


# 中断は「最後の assistant 発話がエラー出力そのもの」でしか判定しない。
# 本文中の言及（過去の中断を報告文で引用しただけ 等）で誤検知しないこと。
INTERRUPT_RE = re.compile(
    r"^(?:\W*)(?:API Error|Request (?:timed out|was aborted)|Error: )", re.IGNORECASE
)


def is_interrupted(last_assistant: str) -> bool:
    text = (last_assistant or "").strip()
    if not text:
        return False
    # レポート本文（長文）は中断ではない。中断時の残骸は短いエラー行になる。
    return bool(INTERRUPT_RE.match(text)) and len(text) < 400


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    full = "--full" in sys.argv
    # 05:00 前に実行した場合、「今」はまだ前日の夜の続き。基準日を 1 日戻してから前日を取る。
    now = datetime.now(JST)
    today = (now - timedelta(days=1)) if now.hour < DAY_START_HOUR else now
    day = args[0] if args else (today - timedelta(days=1)).strftime("%Y-%m-%d")
    start, end = jst_window(day)
    limit = 4000 if full else 800

    print(
        f"# 対象日(JST): {day} {DAY_START_HOUR:02d}:00 〜 翌 {DAY_START_HOUR:02d}:00"
        f"  / UTC window: {start} .. {end}  / match: {MATCH}\n"
    )
    found = 0
    for path in sorted(iter_logs()):
        rows = load(path)
        stamps = [r["timestamp"] for r in rows if r.get("timestamp")]
        if not stamps or max(stamps) < start or min(stamps) >= end:
            continue
        found += 1
        rel = path.replace(PROJECTS + "/", "")
        print("=" * 70)
        print(f"## {rel}")
        print(f"   全体: {min(stamps)[:19]}Z .. {max(stamps)[:19]}Z / entries={len(rows)}")
        tools = {}
        last_assistant = ""
        for r in rows:
            ts = r.get("timestamp", "")
            if not (start <= ts < end):
                continue
            kind = r.get("type")
            for b in blocks(r):
                if b.get("type") == "tool_use":
                    tools[b.get("name")] = tools.get(b.get("name"), 0) + 1
                    if kind == "assistant":
                        inp = b.get("input") or {}
                        hint = inp.get("command") or inp.get("file_path") or inp.get("prompt") or ""
                        print(f"   [tool] {ts[11:19]} {b.get('name')}: {str(hint)[:140]}")
                elif b.get("type") == "text":
                    text = (b.get("text") or "").strip()
                    if not text:
                        continue
                    if kind == "user":
                        print(f"\n   [USER] {ts[11:19]}\n   " + text[:limit].replace("\n", "\n   ") + "\n")
                    else:
                        last_assistant = text
        print(f"\n   tool 内訳: {tools}")
        if last_assistant:
            print("   [最後の assistant 発話]\n   " + last_assistant[:limit].replace("\n", "\n   "))
        if is_interrupted(last_assistant):
            print("   !! このセッションは中断で終わっている（成果物が出ていない可能性が高い）")
        print()
    if not found:
        print("対象日のセッションログなし。")


if __name__ == "__main__":
    main()
