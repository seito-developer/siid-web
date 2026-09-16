#!/usr/bin/env bash
# (Main) 側の Noto Sans JP を自前サブセットとして書き出す(Issue #100)。
#
#   ./scripts/fonts/subset-noto-sans-jp.sh
#   MAIN_FONT_URL=http://localhost:3000/siid ./scripts/fonts/subset-noto-sans-jp.sh --collect
#
# next/font 経由だと Google Fonts の unicode-range 分割(124 チャンク)で TOP が 801KB を
# 取得していた。かといって JIS 第1水準をまとめて 1 ファイルにすると 2 ウェイトで 1042KB に
# なり、かえって悪化する(実測)。そこで 2 段に分ける。
#
#   core … サイトに実際に出ている文字。常に読み込まれる(2 ウェイトで 264KB)
#   ext  … JIS 第1水準のうち core に無いもの。microCMS の記事タイトルなどに
#          珍しい漢字が出たときだけ unicode-range 経由で取得される(2 ウェイトで 804KB)
#
# @font-face は charset から生成するため、手で CSS を書き換えないこと。
set -euo pipefail

cd "$(dirname "$0")/../.."
PY="${MAIN_FONT_PYTHON:-./.venv-lp-career/bin/python}"
[ -x "$PY" ] || PY="python3"
OUT="public/fonts/noto-sans-jp"
SRC="${MAIN_FONT_SRC:-tmp/font-src}"
CHARSET_DIR="scripts/fonts/charsets"
CSS="src/styles/noto-sans-jp.css"

"$PY" -c "import fontTools, brotli" 2>/dev/null || {
  echo "fonttools と brotli が必要です: $PY -m pip install fonttools brotli" >&2; exit 1; }

mkdir -p "$OUT" "$SRC" "$CHARSET_DIR"

# Google Fonts が配信しているのと同じ TrueType(glyf)の可変フォントを元にする。
# noto-cjk の SubsetOTF は CFF のため、同じ hhea 値でもブラウザの縦メトリクス解釈が変わり、
# 行内のベースライン位置が数 px ずれる(Issue #100 で実測)。
if [ ! -f "$SRC/NotoSansJP-VF.ttf" ]; then
  echo "取得: NotoSansJP[wght].ttf"
  curl -sL -o "$SRC/NotoSansJP-VF.ttf" \
    "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf"
fi
for w in 400 900; do
  [ -f "$SRC/NotoSansJP-static-$w.ttf" ] && continue
  echo "ウェイト $w を切り出し"
  "$PY" -m fontTools.varLib.instancer "$SRC/NotoSansJP-VF.ttf" "wght=$w" \
    -o "$SRC/NotoSansJP-static-$w.ttf" > /dev/null
done

# --collect: 実ページから core の収録文字を採取し直す
if [ "${1:-}" = "--collect" ]; then
  echo "収録文字を採取中..."
  MAIN_FONT_URL="${MAIN_FONT_URL:-https://bug-fix.org/siid}" \
    node scripts/fonts/collect-charset.mjs > "$CHARSET_DIR/.collected.txt"
  "$PY" scripts/fonts/build-charsets.py --collected "$CHARSET_DIR/.collected.txt"
else
  "$PY" scripts/fonts/build-charsets.py
fi

subset() {
  local ttf="$1" charset="$2" out="$3"
  "$PY" -m fontTools.subset "$SRC/$ttf" \
    --text-file="$CHARSET_DIR/$charset" \
    --output-file="$OUT/$out" \
    --flavor=woff2 --layout-features='palt,kern,liga' --no-hinting
  printf '  %8s B  %s\n' "$(wc -c < "$OUT/$out" | tr -d ' ')" "$out"
}

subset NotoSansJP-static-400.ttf core.txt noto-sans-jp-core-400.woff2
subset NotoSansJP-static-900.ttf core.txt noto-sans-jp-core-900.woff2
subset NotoSansJP-static-400.ttf ext.txt  noto-sans-jp-ext-400.woff2
subset NotoSansJP-static-900.ttf ext.txt  noto-sans-jp-ext-900.woff2

"$PY" scripts/fonts/build-css.py > "$CSS"
echo "  生成: $CSS"
