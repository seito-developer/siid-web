'use client';

import { useEffect } from 'react';

import styles from './PageTransition.module.css';

// このモジュールがブラウザで何回マウントされたか。0 のうちは「初回表示(SSR の HTML を hydrate した直後)」で、
// サーバー描画と同じ見た目にする必要があるためフェードしない。1 回以上ならクライアント遷移による
// マウントなので、最初の描画からフェードインを効かせる。サーバーでは useEffect が走らないため常に 0。
let mountCount = 0;

// クライアント遷移で新しいページが組み上がる最初の数フレーム(useIsPc の初期値による
// PC/SP の差し替え・Swiper の初期化など)は、レイアウトが一瞬崩れて見える。
// 描画そのものは避けられないため、ページ全体をフェードインさせてその瞬間を隠す(Issue #131)。
// (LowerPages)/template.tsx から使う。template は遷移のたびに作り直されるので、
// このコンポーネントも毎回マウントし直され、CSS アニメーションが再生される。
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const isClientNavigation = mountCount > 0;

  useEffect(() => {
    mountCount += 1;
  }, []);

  return <div className={isClientNavigation ? styles.PageTransition : undefined}>{children}</div>;
}
