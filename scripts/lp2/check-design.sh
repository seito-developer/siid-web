#!/usr/bin/env bash
# 実装とカンプのデザイン一致率をセクションごとに判定する。
#
#   ./scripts/lp2/check-design.sh pc
#
# 事前に `npm run dev` を起動し、基準画像を書き出しておくこと:
#   python3 scripts/lp2/psd_tool.py render <PSD ディレクトリ> --out-dir tmp/psd-ref/<pc|sp>
set -o pipefail

SIDE="${1:-pc}"
PY="${LP2_PYTHON:-./.venv-lp2/bin/python}"
[ -x "$PY" ] || PY="python3"

# セクション名 参照画像 切り出し範囲(PSD 座標)
#
# 4 つめの欄は判定から外す縦範囲。FV の動画領域に使う。
# カンプの FV 背景は動画の仮置き(Zoom 画面 + 顔隠しの絵文字)で、実際の動画とは
# 別カットになることが承認済みのため(docs/spec/lp2-sections/02-fv.notes.md)。
# 動画の上に重なるスクリムはブレンドモードを伴い、動画を差し替えた基準画像を
# 作ることはできない。そのため領域ごと判定から外し、ヘッダーと下部の帯で判定する。
if [ "$SIDE" = "pc" ]; then
  # 切り出し範囲はレイヤーの bbox ではなく「見た目の境界」を使う。
  # 背景がセクションをまたいで大きく置かれているため bbox は重なっており、
  # そのまま使うと隣のセクションが混ざって判定できない。
  # 境界は基準画像の行ごとの色変化から検出した値。
  ROWS=(
    "fv|pc1|0:781|83:617"
    "about|pc1|781:1237"
    "result|pc1|1237:2017"
    "instructor|pc2|0:901"
    "strength|pc2|901:1942"
    "difference|pc2|1942:3303"
    "step|pc3|0:2242"
    "skill|pc4|0:1700"
    "support|pc4|1700:2515"
    "plan|pc5|0:865"
    "graph|pc5|865:2239"
    "voice|pc6|0:1730"
    "faq|pc8|0:1256"
    "present|pc7|0:1083"
    "counselling|pc9|0:1019|700,60,1440,1019"
  )
else
  ROWS=(
    "fv|seitosama_lp_sp01|0:1473|84:1180"
    "about|seitosama_lp_sp01|1473:2033"
    "result|seitosama_lp_sp01|2033:3102"
    "instructor|seitosama_lp_sp01|3102:4735"
    "strength|seitosama_lp_sp01|4735:7857"
    "difference|seitosama_lp_sp02|0:2978"
    "step|seitosama_lp_sp03|0:4620"
    "skill|seitosama_lp_sp04|0:2202"
    "support|seitosama_lp_sp05|0:1646"
    "plan|seitosama_lp_sp06|0:1525"
    "graph|seitosama_lp_sp07|0:1725"
    "voice|seitosama_lp_sp08|0:3872"
    "faq|seitosama_lp_sp09|0:1923"
    "present|seitosama_lp_sp10|0:3176"
    "counselling|seitosama_lp_sp11|0:2374|0,900,750,2374"
  )
fi

mkdir -p tmp/diff/"$SIDE"
printf '%-14s %9s %9s %s\n' "セクション" "構造" "色" "判定"
printf '%s\n' "------------------------------------------------"
fail=0
for row in "${ROWS[@]}"; do
  IFS='|' read -r name psd crop ignore <<< "$row"
  shot="tmp/shots/$SIDE/$name.png"
  ref="tmp/psd-ref/$SIDE/$psd.png"
  if [ ! -f "$shot" ] || [ ! -f "$ref" ]; then
    printf '%-14s %9s %9s %s\n' "$name" "-" "-" "未実装"
    continue
  fi
  if [ -n "$ignore" ]; then
    out=$("$PY" scripts/lp2/compare.py --reference "$ref" --actual "$shot" \
          --ref-crop "$crop" --ignore-rows "$ignore" --out "tmp/diff/$SIDE/$name.png" --json 2>/dev/null)
  else
    out=$("$PY" scripts/lp2/compare.py --reference "$ref" --actual "$shot" \
          --ref-crop "$crop" --out "tmp/diff/$SIDE/$name.png" --json 2>/dev/null)
  fi
  [ -z "$out" ] && { printf '%-14s %9s %9s %s\n' "$name" "?" "?" "計測失敗"; continue; }
  printf '%s' "$out" | python3 -c "
import json,sys
d=json.load(sys.stdin)
ok='合格' if d['pass'] else '不合格'
print(f\"{'$name':<14} {d['structure_ratio']:8.2f}% {d['color_ratio']:8.2f}% {ok}\")
"
  printf '%s' "$out" | python3 -c "import json,sys; sys.exit(0 if json.load(sys.stdin)['pass'] else 1)" || fail=1
done
exit $fail
