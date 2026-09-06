import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';

import styles from './SectionBg.module.css';

// セクション背景。PC と SP でカンプが別デザインのため、2 枚を出し分ける。
//
// 背景はカンプの合成結果を前景だけ隠して切り出したもの
// (docs/spec/07_lp2-renewal.md §8.2)。SP のカンプは @2x なので
// 実寸の半分で表示される。

type Props = {
  /** public/images/lp-2/<name>-bg.webp と public/images/lp-2/sp/<name>.webp を使う */
  name: string;
  pcWidth: number;
  pcHeight: number;
  spWidth: number;
  spHeight: number;
  className?: string;
};

export default function SectionBg({ name, pcWidth, pcHeight, spWidth, spHeight, className = '' }: Props) {
  return (
    <>
      <Image
        className={`${styles.SectionBg} ${styles.isSp} ${className}`}
        src={lp2Asset(`/images/lp-2/sp/${name}.webp`)}
        alt=""
        width={spWidth}
        height={spHeight}
        sizes="100vw"
        quality={LP2_IMAGE_QUALITY}
      />
      <Image
        className={`${styles.SectionBg} ${styles.isPc} ${className}`}
        src={lp2Asset(`/images/lp-2/${name}-bg.webp`)}
        alt=""
        width={pcWidth}
        height={pcHeight}
        sizes="100vw"
        quality={LP2_IMAGE_QUALITY}
      />
    </>
  );
}
