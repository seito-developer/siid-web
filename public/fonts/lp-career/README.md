# lp-career 用サブセットフォント

`/siid/lp-career` で実際に使う文字だけを含む woff2。next/font 経由で Google Fonts から
配信すると、日本語フォントは unicode-range で 100 以上のチャンクに分割されるため
1 ページで 1383KB を取得していた(Noto 750KB + Zen Kaku 333KB + Shippori 300KB)。
サブセット化して 615KB に落としている。

フォントの実体は「その字形が実際に描画されたとき」にしか取得されない。
そのため lp-career のトークン(`--lp-career-font-body` など)をサブセット側に向けるだけで、
next/font 側の登録はそのままでも取得は起きない。**lp-1 の設定は一切変えていない。**

- 生成: `./scripts/lp-career/subset-fonts.sh`
- ライセンス: SIL Open Font License 1.1(同梱の OFL-*.txt)。
  いずれも Reserved Font Name の指定は無いため、サブセット化と再配布が可能。
- **lp-1 は従来どおり next/font を使う。** ここのフォントは lp-career 専用。

収録文字は「描画済みの DOM から採取した文字」+「lp-career のソース中の文字列リテラルと
JSX テキスト」の和集合。アコーディオン展開・タブ切り替え・カルーセルの各状態を
含めて取りこぼさないようにしている。万一収録漏れがあってもフォールバック
(Hiragino Sans / Hiragino Mincho ProN)に落ちるだけで、豆腐にはならない。
