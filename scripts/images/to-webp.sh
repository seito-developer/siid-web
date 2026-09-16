#!/usr/bin/env bash
# next/image を通らない画像を WebP に変換する(Issue #85)。
#
#   ./scripts/images/to-webp.sh
#
# CSS の background-image・<picture> の srcSet・SVG の <image href> は
# next/image の最適化を通らないため、元の PNG / JPEG のまま配信されていた。
# ここで変換した webp を直接参照する。変換元は assets/images-src/ に置く
# (public/ に残すと配信物に入るだけで誰も取得しないため)。
#
# 使い分け:
#   イラスト・ロゴ(平坦な色面)  → lossless。q82 より小さく、かつ劣化しない
#   写真                        → -q 82
set -euo pipefail

cd "$(dirname "$0")/../.."
command -v cwebp >/dev/null || { echo "cwebp が必要です: brew install webp" >&2; exit 1; }

report() {
  printf '  %7s B → %7s B  %s\n' \
    "$(wc -c < "$1" | tr -d ' ')" "$(wc -c < "$2" | tr -d ' ')" "$(basename "$2")"
}

# Reスキル講座バナー(イラスト)
for v in pc sp; do
  cwebp -quiet -lossless -z 9 "assets/images-src/reskill-banner-$v.png" -o "public/reskill-banner-$v.webp"
  report "assets/images-src/reskill-banner-$v.png" "public/reskill-banner-$v.webp"
done

# Instagram アイコン。SVG 内で 30x30 表示のため 2 倍の 60x60 に縮小する
cwebp -quiet -lossless -z 9 -resize 60 60 "assets/images-src/instagram-icon.png" -o "public/instagram-icon.webp"
report "assets/images-src/instagram-icon.png" "public/instagram-icon.webp"

# 主任講師の写真(背景画像)
cwebp -quiet -q 82 "assets/images-src/seito.jpg" -o "public/images/supporter/supporters/seito.webp"
report "assets/images-src/seito.jpg" "public/images/supporter/supporters/seito.webp"
