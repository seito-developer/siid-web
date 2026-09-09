#!/usr/bin/env bash
# FV 背景動画を Web 配信用に変換する(docs/spec/07_lp2-renewal.md §9)。
#
#   ./scripts/lp2/convert-video.sh <入力ディレクトリ>
#
# 入力: <入力ディレクトリ>/fv-pc.mov, fv-sp.mov
# 出力: public/videos/lp-2/{fv-pc,fv-sp}.mp4 と同名の -poster.webp
#
# 設計判断:
#   * 音声トラックは削除する(-an)。背景動画は muted 再生のため不要で、容量の無駄になる。
#   * WebM(VP9)は生成しない。実測で H.264 MP4 より常に大きく(PC 2.25MB vs 1.92MB、
#     SP 1.53MB vs 1.46MB)、容量が倍になるだけで得るものが無かった。
#   * CRF は PC 30 / SP 36。等倍で元データと比較して視覚的な差がほぼ無いことを確認済み。
#     SP を強めに圧縮するのはモバイルの LCP に直結するため。
#   * SP は 540px 幅に縮める。表示は 375 CSS px(= 750 デバイス px)だが、動画の上には
#     不透明度 0.72〜0.86 の暗いスクリムが重なるため、拡大のぼけは視認できない。
#     スクリム適用後の平均差は 0.7/255 で、容量は 938KB → 431KB になる。
#   * -movflags +faststart で moov atom を先頭に置き、初回再生を早める。
set -euo pipefail

SRC_DIR="${1:-}"
if [[ -z "$SRC_DIR" ]]; then
  echo "usage: $0 <入力ディレクトリ>" >&2
  exit 1
fi

for cmd in ffmpeg cwebp; do
  command -v "$cmd" >/dev/null || { echo "$cmd が必要です (brew install ffmpeg webp)" >&2; exit 1; }
done

OUT_DIR="$(cd "$(dirname "$0")/../.." && pwd)/public/videos/lp-2"
mkdir -p "$OUT_DIR"

encode() {
  local name="$1" crf="$2" width="${3:-}"
  local src="$SRC_DIR/$name.mov"
  if [[ ! -f "$src" ]]; then
    echo "skip: $src が見つかりません" >&2
    return
  fi
  echo "==> $name (crf $crf)"

  local scale=()
  [[ -n "$width" ]] && scale=(-vf "scale=$width:-2")

  ffmpeg -y -loglevel error -i "$src" \
    -an "${scale[@]}" -c:v libx264 -profile:v main -crf "$crf" -preset slow \
    -pix_fmt yuv420p -movflags +faststart \
    "$OUT_DIR/$name.mp4"

  # ポスター画像(先頭フレーム)。動画ロード前の白画面を防ぐ。
  # Homebrew の ffmpeg は webp エンコーダを含まないため PNG 経由で cwebp に渡す。
  ffmpeg -y -loglevel error -i "$src" -frames:v 1 "$OUT_DIR/$name-poster.png"
  cwebp -quiet -q 80 "$OUT_DIR/$name-poster.png" -o "$OUT_DIR/$name-poster.webp"
  rm -f "$OUT_DIR/$name-poster.png"

  local before after
  before=$(stat -f%z "$src")
  after=$(stat -f%z "$OUT_DIR/$name.mp4")
  printf '    %-20s %8d B -> %8d B (%d%%)\n' "$name.mp4" "$before" "$after" $((after * 100 / before))
  printf '    %-20s %8d B\n' "$name-poster.webp" "$(stat -f%z "$OUT_DIR/$name-poster.webp")"
}

encode fv-pc 30
encode fv-sp 36 540

echo "完了: $OUT_DIR"
