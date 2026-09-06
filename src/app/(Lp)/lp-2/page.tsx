import { Metadata } from 'next';

import { buildPageMetadata, pages } from '@/constants/meta';

import {
  barlowSemiCondensedLp2,
  jostLp2,
  shipporiMinchoB1Lp2,
  zenKakuGothicAntiqueLp2,
} from '../fonts';

import styles from './Lp2.module.css';
import './lp2-tokens.css';

// 広告流入用の独立 LP(docs/spec/07_lp2-renewal.md)。
// (Lp)/layout.tsx は lp-1 と共有のため、lp-2 専用のフォントとトークンは
// このページのルート要素にだけ付与して lp-1 の描画に影響させない。
export const metadata: Metadata = buildPageMetadata(pages.lp2, {
  ogpImagePath: '/images/lp-2/ogp.png',
});

const fontVariables = [
  zenKakuGothicAntiqueLp2.variable,
  jostLp2.variable,
  shipporiMinchoB1Lp2.variable,
  barlowSemiCondensedLp2.variable,
].join(' ');

export default function Lp2() {
  return <div className={`lp2 ${fontVariables} ${styles.Lp2}`} />;
}
