'use client';

import { useEffect, useState } from 'react';

import LoadingScreen from '../LoadingScreen';

const SESSION_KEY = 'siid_loading_shown';

export default function LoadingScreenInner() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldStartFadeOut, setShouldStartFadeOut] = useState(false);

  useEffect(() => {
    // すでにこのセッションで表示済みならスキップ
    if (sessionStorage.getItem(SESSION_KEY)) {
      setIsMounted(true);
      return;
    }

    setIsMounted(true);
    setIsVisible(true);

    const startTime = Date.now();
    const minDisplayTime = 2000; // 2秒

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      // 最低表示時間後にフェードアウト開始をトリガー
      setTimeout(() => {
        setShouldStartFadeOut(true);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) {return null;}

  return (
    <LoadingScreen
      shouldStartFadeOut={shouldStartFadeOut}
      onComplete={handleComplete}
    />
  );
}