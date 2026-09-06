#!/usr/bin/env bash
# セクション背景を PSD から書き出す(docs/spec/07_lp2-renewal.md §8.2)。
#
#   ./scripts/lp2/export-bg.sh          # 全部
#   ./scripts/lp2/export-bg.sh strength # 1 つだけ
#
# カードの白枠・写真・帯・CTA ボタンといった意匠はすべて背景に含め、
# CSS では文字だけを実測座標で重ねる。そのため既定では
# 「テキストレイヤーだけ」を隠す。比較表など、こちらで HTML として
# 組む要素だけ hide 欄で個別に除く。
set -o pipefail

PY="${LP2_PYTHON:-./.venv-lp2/bin/python}"
[ -x "$PY" ] || PY="python3"
PSD_DIR="${LP2_PSD_DIR:-$HOME/Downloads/260902_seitosama}"

# 名前|PSD|切り出し範囲(x0,y0,x1,y1)|出力|追加で隠すレイヤー(: 区切り)
ROWS=(
  "instructor|sp/seitosama_lp_sp01|0,3102,750,4735|sp/instructor|"
  "strength|sp/seitosama_lp_sp01|0,4735,750,7857|sp/strength|"
  "about|sp/seitosama_lp_sp01|0,1473,750,2034|sp/about|"
  "step|sp/seitosama_lp_sp03|0,0,750,4620|sp/step|"
  "support|sp/seitosama_lp_sp05|0,0,750,1646|sp/support|"
  "present|sp/seitosama_lp_sp10|0,0,750,3176|sp/present|"

  # PC。カード類は各コンポーネントが画像で持っているものもあるため、
  # ここでは「テキストだけを隠す」ぶんに留める(重ねて描いても同じ絵になる)。
  "pc-instructor|pc/pc2|0,0,1440,901|instructor-bg|"
  "pc-about|pc/pc1|0,781,1440,1237|about-bg|"
  "pc-strength|pc/pc2|0,901,1440,1942|strength-bg|"
  "pc-difference|pc/pc2|0,1942,1440,3303|difference-bg|sec_difference/比較表"
)

run_one() {
  IFS='|' read -r name psd box out hides <<< "$1"
  local args=()
  if [ -n "$hides" ]; then
    IFS=':' read -ra list <<< "$hides"
    for h in "${list[@]}"; do args+=(--hide "$h" --hide "$h/**"); done
  fi
  local ref="tmp/psd-ref/${psd%%/*}/$(basename "$psd").png"
  "$PY" scripts/lp2/psd_tool.py section-bg "$PSD_DIR/$psd.psd" \
    --hide-kinds type "${args[@]}" \
    --box "$box" --match-reference "$ref" \
    --out "public/images/lp-2/$out.webp" || return 1
}

target="${1:-}"
for row in "${ROWS[@]}"; do
  name="${row%%|*}"
  [ -n "$target" ] && [ "$name" != "$target" ] && continue
  printf '\n== %s\n' "$name"
  run_one "$row"
done
