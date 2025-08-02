"use client";

import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  shouldStartFadeOut?: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ shouldStartFadeOut, onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (isFadingOut) {
      const fadeOutTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 250); // 0.25秒

      return () => clearTimeout(fadeOutTimer);
    }
  }, [isFadingOut, onComplete]);

  // 外部からのフェードアウト開始要求を受け取る
  useEffect(() => {
    if (shouldStartFadeOut) {
      setIsFadingOut(true);
    }
  }, [shouldStartFadeOut]);


  if (!isVisible) return null;

  return (
    <div className={`${styles.LoadingScreen} ${isFadingOut ? styles.fadeOut : ''}`}>
      <div className={styles.LoadingScreen__Content}>
        <div className={styles.LoadingScreen__Logo}>
          <div className={styles.LoadingScreen__LogoText}>SiiD</div>
          <div className={styles.LoadingScreen__LogoSubtext}>
            ITエンジニア転職 × 生成AI特化
          </div>
        </div>
        
        <div className={styles.LoadingScreen__Animation}>
          <div className={styles.LoadingScreen__Dots}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={styles.LoadingScreen__Dot}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className={styles.LoadingScreen__Progress}>
          <div className={styles.LoadingScreen__ProgressBar}>
            <div
              className={styles.LoadingScreen__ProgressFill}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className={styles.LoadingScreen__ProgressText}>
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>

        <div className={styles.LoadingScreen__Particles}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={styles.LoadingScreen__Particle}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}