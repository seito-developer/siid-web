"""charsets/*.txt から @font-face を生成して標準出力に書く(Issue #100)。

core と ext の unicode-range は重ならないようにする。重なっていると、ブラウザは
先にマッチしたほうだけを見て、そこに字形が無くてもファミリ内の別の @font-face を
探しにいかない(次のファミリへ落ちる)ため、書体が混ざる。
"""

import pathlib

CHARSET_DIR = pathlib.Path(__file__).parent / 'charsets'
FAMILY = 'Noto Sans JP Site'
BASE_PATH = '/siid'


def unicode_range(chars: set[str]) -> str:
    points = sorted(ord(c) for c in chars)
    out = []
    start = prev = points[0]
    for p in points[1:]:
        if p == prev + 1:
            prev = p
            continue
        out.append((start, prev))
        start = prev = p
    out.append((start, prev))
    return ','.join(f'U+{a:X}' if a == b else f'U+{a:X}-{b:X}' for a, b in out)


def main() -> None:
    print('/* scripts/fonts/subset-noto-sans-jp.sh が生成する。手で編集しないこと(Issue #100)。')
    print('   core はサイトに出ている文字。ext は JIS X 0208 第1水準の残りで、')
    print('   珍しい漢字(microCMS の記事タイトルなど)が出たときだけ取得される。 */')
    for tier in ('core', 'ext'):
        chars = {c for c in (CHARSET_DIR / f'{tier}.txt').read_text(encoding='utf-8') if not c.isspace()}
        ranges = unicode_range(chars)
        for weight in (400, 900):
            print(f'''
@font-face {{
  font-family: '{FAMILY}';
  font-style: normal;
  font-weight: {weight};
  font-display: swap;
  src: url('{BASE_PATH}/fonts/noto-sans-jp/noto-sans-jp-{tier}-{weight}.woff2') format('woff2');
  unicode-range: {ranges};
}}''')


if __name__ == '__main__':
    main()
