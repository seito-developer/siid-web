import { useEffect, useState } from 'react';

import { BREAK_POINT } from '@/constants/common';

// ウィンドウサイズが1279px以下の場合にtrueを返す
export default function useIsPc() {
  const [isPc, setIsPc] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsPc(window.innerWidth >= BREAK_POINT);
    };

    // 初期チェック
    handleResize();

    // リサイズイベントリスナーの登録
    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isPc;
}