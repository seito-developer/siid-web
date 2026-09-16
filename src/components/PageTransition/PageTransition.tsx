'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import styles from './PageTransition.module.css';

// クライアント遷移で新しいページが組み上がる最初の数フレーム(useIsPc の初期値による
// PC/SP の差し替え・Swiper の初期化・フォントの適用など)は、レイアウトが一瞬崩れて見える。
// 描画そのものは避けられないため、ページ全体をフェードインさせてその瞬間を隠す(Issue #131)。
// pathname を key にして遷移ごとにラッパーを作り直し、CSS アニメーションを毎回走らせる。
// TOP は Opening のオーバーレイが最初から画面を覆うので、ここでは下層ページ間の遷移が主な対象。
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 初回表示(SSR の HTML がそのまま見える)ではフェードしない。
  // 遷移後の最初の描画からアニメーションを効かせる必要があるため、useEffect ではなく
  // レンダー中に前回の pathname と比較して状態を更新する(React の「props から state を導出」の書き方)。
  const [seenPathname, setSeenPathname] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setHasNavigated(true);
  }

  return (
    <div key={pathname} className={hasNavigated ? styles.PageTransition : undefined}>
      {children}
    </div>
  );
}
