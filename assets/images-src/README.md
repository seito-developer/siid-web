# 変換元の画像

`public/` に置く WebP の変換元（Issue #85）。ここは配信されない。

`next/image` を通らない画像（CSS の `background-image`・`<picture>` の `srcSet`・
SVG の `<image href>`）は最適化されず元の形式のまま配信されるため、
`./scripts/images/to-webp.sh` で WebP に変換して `public/` に置いている。

画像を差し替えるときは、ここに元ファイルを置いてスクリプトを実行する。
