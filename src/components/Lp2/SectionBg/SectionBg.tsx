import { getImageProps } from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';

import styles from './SectionBg.module.css';

// セクション背景。PC と SP でカンプが別デザインのため、2 枚を出し分ける。
//
// 背景はカンプの合成結果を前景だけ隠して切り出したもの
// (docs/spec/07_lp2-renewal.md §8.2)。SP のカンプは @2x なので
// 実寸の半分で表示される。
//
// <Image> を 2 つ並べて CSS で display: none にすると、隠したほうまで
// ダウンロードされる(SP 表示で PC 用の背景 12 枚 = 約 400KB を余分に取得していた)。
// そのため next/image の getImageProps() で srcSet だけを取り出し、
// メディアクエリが確実に効く <picture> + <source media> で 1 枚だけ読ませる。

type Props = {
  /** public/images/lp-2/<name>-bg.webp と public/images/lp-2/sp/<name>.webp を使う */
  name: string;
  pcWidth: number;
  pcHeight: number;
  spWidth: number;
  spHeight: number;
  /** SP だけ背景がある場合。PC 側は透明な 1x1 を読ませて余分な取得を防ぐ */
  spOnly?: boolean;
  className?: string;
};

// 1x1 の透明 GIF。PC で <img> の src を空にできないため、これを読ませる
const TRANSPARENT =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function SectionBg({
  name,
  pcWidth,
  pcHeight,
  spWidth,
  spHeight,
  spOnly,
  className = '',
}: Props) {
  const common = { alt: '', sizes: '100vw', quality: LP2_IMAGE_QUALITY };

  const {
    props: { srcSet: spSrcSet },
  } = getImageProps({
    ...common,
    src: lp2Asset(`/images/lp-2/sp/${name}.webp`),
    width: spWidth,
    height: spHeight,
  });

  const {
    props: { srcSet: pcSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    src: lp2Asset(`/images/lp-2/${name}-bg.webp`),
    width: pcWidth,
    height: pcHeight,
  });

  if (spOnly) {
    return (
      <picture>
        <source media="(max-width: 767px)" srcSet={spSrcSet} sizes="100vw" />
        <img src={TRANSPARENT} alt="" className={`${styles.SectionBg} ${className}`} />
      </picture>
    );
  }

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={pcSrcSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={spSrcSet} sizes="100vw" />
      {/* <picture> の中の <img>。src / srcSet / sizes は next/image が生成したものを使う */}
      <img {...imgProps} alt="" className={`${styles.SectionBg} ${className}`} />
    </picture>
  );
}
