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
  "difference|sp/seitosama_lp_sp02|0,0,750,2978|sp/difference|比較表"
  "fv-band|sp/seitosama_lp_sp01|0,898,750,1473|sp/fv-band|"
  "result|sp/seitosama_lp_sp01|0,2033,750,3102|sp/result|sec_result/長方形 702:sec_result/レイヤー 29:arrow1:arrow2:page_nation"
  "step|sp/seitosama_lp_sp03|0,0,750,4620|sp/step|"
  "support|sp/seitosama_lp_sp05|0,0,750,1646|sp/support|"
  "present|sp/seitosama_lp_sp10|0,0,750,3176|sp/present|"
  "plan|sp/seitosama_lp_sp06|0,0,750,1525|sp/plan|*/tab:*/label_recom"
  "voice|sp/seitosama_lp_sp08|0,0,750,3872|sp/voice|"
  "faq|sp/seitosama_lp_sp09|0,0,750,1923|sp/faq|Q1:Q2:Q3:Q4:Q5:Q6:Q7:Q8"
  "counselling|sp/seitosama_lp_sp11|0,0,750,2374|sp/counselling|"

  # PC。カード類は各コンポーネントが画像で持っているものもあるため、
  # ここでは「テキストだけを隠す」ぶんに留める(重ねて描いても同じ絵になる)。
  "pc-instructor|pc/pc2|0,0,1440,901|instructor-bg|"
  "pc-step|pc/pc3|0,0,1440,2242|step-bg|"
  "pc-voice|pc/pc6|0,0,1440,1730|voice-bg|"
  "pc-support|pc/pc4|0,1700,1440,2515|support-bg|"
  "pc-present|pc/pc7|0,0,1440,1083|present-bg|"
  "pc-counselling|pc/pc9|0,0,1440,1019|counselling-bg|"
  "pc-about|pc/pc1|0,781,1440,1237|about-bg|"
  "pc-result|pc/pc1|0,1237,1440,2017|result-bg|sec_result/carousel :sec_result/page_nation"
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
