#!/usr/bin/env bash
# lp-career 用のサブセットフォントを書き出す(docs/spec/07_lp-career-renewal.md §15.7)。
#
#   ./scripts/lp-career/subset-fonts.sh            # 収録文字は charset ファイルから
#   LP_CAREER_URL=... ./scripts/lp-career/subset-fonts.sh --collect   # 実ページから採取し直す
#
# next/font 経由で Google Fonts から配信すると、日本語フォントは unicode-range で
# 100 以上のチャンクに分割され、lp-career の 1 ページで 633KB を取得していた。
# 実際に使う文字だけの woff2 にすると 215KB になる。
#
# lp-1 は従来どおり next/font を使う。ここで扱うのは lp-career 専用の 2 書体だけ。
set -euo pipefail

cd "$(dirname "$0")/../.."
PY="${LP_CAREER_PYTHON:-./.venv-lp-career/bin/python}"
[ -x "$PY" ] || PY="python3"
OUT="public/fonts/lp-career"
SRC="${LP_CAREER_FONT_SRC:-tmp/font-src}"
CHARSET_DIR="scripts/lp-career/charsets"

command -v "$PY" >/dev/null || { echo "python が必要です" >&2; exit 1; }
"$PY" -c "import fontTools, brotli" 2>/dev/null || {
  echo "fonttools と brotli が必要です: $PY -m pip install fonttools brotli" >&2; exit 1; }

mkdir -p "$OUT" "$SRC"

# 元データ(OFL)。すでにあれば取得しない
fetch() {
  local path="$1" name="$2"
  [ -f "$SRC/$name" ] && return
  echo "取得: $name"
  curl -sL -o "$SRC/$name" "https://github.com/google/fonts/raw/main/ofl/$path/$name"
}
fetch_noto() {
  local style="$1"
  [ -f "$SRC/NotoSansJP-$style.ttf" ] && return
  echo "取得: NotoSansJP-$style"
  curl -sL -o "$SRC/NotoSansJP-$style.ttf" \
    "https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/JP/NotoSansJP-$style.otf"
}
for s in Regular Medium Bold Black; do fetch_noto "$s"; done

fetch shipporiminchob1 ShipporiMinchoB1-Bold.ttf
fetch zenkakugothicantique ZenKakuGothicAntique-Medium.ttf
fetch zenkakugothicantique ZenKakuGothicAntique-Bold.ttf
fetch zenkakugothicantique ZenKakuGothicAntique-Black.ttf

subset() {
  local ttf="$1" charset="$2" out="$3"
  "$PY" -m fontTools.subset "$SRC/$ttf" \
    --text-file="$CHARSET_DIR/$charset" \
    --output-file="$OUT/$out" \
    --flavor=woff2 --layout-features='palt,vert,vrt2,kern,liga' --no-hinting
  printf '  %8s B  %s\n' "$(wc -c < "$OUT/$out" | tr -d ' ')" "$out"
}

subset NotoSansJP-Regular.ttf          noto-sans-jp.txt            noto-sans-jp-400.woff2
subset NotoSansJP-Medium.ttf           noto-sans-jp.txt            noto-sans-jp-500.woff2
subset NotoSansJP-Bold.ttf             noto-sans-jp.txt            noto-sans-jp-700.woff2
subset NotoSansJP-Black.ttf            noto-sans-jp.txt            noto-sans-jp-900.woff2
subset ShipporiMinchoB1-Bold.ttf      shippori-mincho-b1.txt      shippori-mincho-b1-700.woff2
subset ZenKakuGothicAntique-Medium.ttf zen-kaku-gothic-antique.txt zen-kaku-gothic-antique-500.woff2
subset ZenKakuGothicAntique-Bold.ttf   zen-kaku-gothic-antique.txt zen-kaku-gothic-antique-700.woff2
subset ZenKakuGothicAntique-Black.ttf  zen-kaku-gothic-antique.txt zen-kaku-gothic-antique-900.woff2
