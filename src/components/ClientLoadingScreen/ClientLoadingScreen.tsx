"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function ClientLoadingScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldStartFadeOut, setShouldStartFadeOut] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
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

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <LoadingScreen 
      shouldStartFadeOut={shouldStartFadeOut}
      onComplete={handleComplete}
    />
  );
}