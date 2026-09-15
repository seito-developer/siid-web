"""(Main) 用サブセットの収録文字を組み立てる(Issue #100)。

core … サイトに出ている文字 + ASCII + JIS X 0208 の非漢字(かな・記号)
ext  … JIS X 0208 第1水準のうち core に無いもの

区点コードを EUC-JP で復号して JIS X 0208 を取り出すため、外部データを持たない。
"""

import argparse
import pathlib

CHARSET_DIR = pathlib.Path(__file__).parent / 'charsets'

# 表記ゆれ・約物・囲み数字など JIS X 0208 の非漢字に含まれない、実務で出やすい文字
EXTRA = set('①②③④⑤⑥⑦⑧⑨⑩♪→←↑↓⇒≫≪★☆◎○●◯△▲□■◆◇※〜～－‐ー―–—‘’“”…‥・々〆')


def jis_block(ku_from: int, ku_to: int) -> set[str]:
    out = set()
    for ku in range(ku_from, ku_to + 1):
        for ten in range(1, 95):
            try:
                out.add(bytes([0xA0 + ku, 0xA0 + ten]).decode('euc_jp'))
            except UnicodeDecodeError:
                continue
    return out


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--collected', type=pathlib.Path,
                        help='実ページから採取したテキスト。指定時は site.txt を更新する')
    args = parser.parse_args()

    site_path = CHARSET_DIR / 'site.txt'
    if args.collected:
        collected = {c for c in args.collected.read_text(encoding='utf-8') if not c.isspace()}
        known = set(site_path.read_text(encoding='utf-8')) if site_path.exists() else set()
        site = collected | known
        site_path.write_text(''.join(sorted(site - {'\n'})) + '\n', encoding='utf-8')
        print(f'  site.txt: {len(site)} 文字(採取 {len(collected)} / 既存 {len(known)})')
    else:
        site = {c for c in site_path.read_text(encoding='utf-8') if not c.isspace()}

    ascii_ = {chr(i) for i in range(0x20, 0x7F)}
    core = ascii_ | jis_block(1, 8) | EXTRA | site
    ext = jis_block(16, 47) - core

    (CHARSET_DIR / 'core.txt').write_text(''.join(sorted(core)) + '\n', encoding='utf-8')
    (CHARSET_DIR / 'ext.txt').write_text(''.join(sorted(ext)) + '\n', encoding='utf-8')
    print(f'  core {len(core)} 文字 / ext {len(ext)} 文字')


if __name__ == '__main__':
    main()
