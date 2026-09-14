# LP リニューアル(`/siid/lp-career`)用スクリプト

Photoshop 入稿データから実装に必要な情報とアセットを取り出し、
実装結果をデザインと突き合わせるためのツール一式。

仕様: [`docs/spec/07_lp-career-renewal.md`](../../docs/spec/07_lp-career-renewal.md)

**PSD 本体(合計 600MB 超)はリポジトリに含めない。** 生成物のほうをコミットして
参照可能にしている。入稿データは各自のローカルに置き、パスを引数で渡す。

## 準備

```bash
python3 -m venv .venv-lp-career
./.venv-lp-career/bin/pip install -r scripts/lp-career/requirements.txt
brew install ffmpeg webp   # 動画変換に使う
```

`scikit-image` と `aggdraw` はレイヤー効果とベクターマスクの描画に必要。
無いとレイヤー単位の書き出しが `ImportError` で落ちる。

## ツール

### `psd_tool.py` — PSD の解析とアセット書き出し

```bash
V=./.venv-lp-career/bin/python
PSD=~/Downloads/260902_seitosama

# レイヤーツリーを見る(調査用)
$V scripts/lp-career/psd_tool.py tree $PSD/pc/pc1.psd --filter 'fv/*' --max-depth 2

# 基準画像を書き出す(デザイン差分判定に使う)
$V scripts/lp-career/psd_tool.py render $PSD/pc --out-dir tmp/psd-ref/pc
$V scripts/lp-career/psd_tool.py render $PSD/sp --out-dir tmp/psd-ref/sp

# レイヤーツリーを JSON 化する(細部を機械的に調べたいとき)
$V scripts/lp-career/psd_tool.py data $PSD/pc --out-dir tmp/psd-data/pc

# アセットを一括書き出しする
$V scripts/lp-career/psd_tool.py manifest scripts/lp-career/assets.manifest.json
```

Photoshop はフォントサイズを変形前のポイント数で保持するため、
レイヤーの変形行列を掛けて実表示サイズに補正している。生の値を使うと実サイズを誤る。

### `assets.manifest.json` — 書き出すアセットの定義

実装フェーズごとに、そのセクションで必要なものを追記していく。
全アセットを先に洗い出すことはしない(何を画像にして何を CSS / SVG で組むかは
セクションを実装しながらでないと決まらないため)。

`exclude_kinds: ["type"]` でテキストレイヤーを除いて書き出すこと。
代替フォントを使う以上、PSD の文字を画像として貼ることはできない。

### `compare.py` — デザイン一致率の判定

完了条件(仕様書 §13.1 / §13.2)をレビューエージェントが機械的に判定するためのもの。

```bash
$V scripts/lp-career/compare.py \
    --reference tmp/psd-ref/pc/pc1.png \
    --actual    tmp/shots/pc1.png \
    --out       tmp/diff/pc1.png
```

構造一致率(85% 以上)と色一致率(90% 以上)の 2 軸で判定する。
単一の指標では「わずかな位置ずれの許容」と「色の誤差の検出」を両立できないため。
終了コードは合格 0 / 不合格 1。`--json` で機械可読な出力になる。

### `convert-video.sh` — FV 動画の変換

```bash
./scripts/lp-career/convert-video.sh ~/Downloads/video
```

`fv-pc.mov` / `fv-sp.mov` を H.264 MP4 とポスター画像(WebP)に変換する。
背景動画は muted 再生のため音声トラックを削除する。
WebM は実測で常に MP4 より大きかったため生成しない。

### `gen-section-docs.py` — セクション別実測データの生成

```bash
$V scripts/lp-career/gen-section-docs.py $PSD --out-dir docs/spec/lp-career-sections
```

座標・サイズ・テキスト全文・スタイルを 17 セクション分の Markdown に書き出す。
実装時に PSD を開かずに済むようにするためのもの。生成物はコミットする。

`NN-<slug>.notes.md` を置くと生成ファイルからリンクされる。
PSD 上で平坦化されていて自動抽出できない内容(コース比較表など)はここに手で残す。
