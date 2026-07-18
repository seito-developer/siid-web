'use client';

import React, { useEffect, useRef } from 'react';

import gsap from 'gsap';

import styles from './Opening.module.css';
import OpeningLogo from './OpeningLogo';

const SESSION_KEY = 'siid_opening_played';
const MIN_DISPLAY_MS = 1600;
const MAX_WAIT_MS = 4000;

// ローディング〜ファーストビューを1本のシーケンスとして演出する
// オーケストレーター。仕様: docs/spec/02_opening-animation.md
export default function Opening() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counterBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const stroke = strokeRef.current;
    const fill = fillRef.current;
    const logo = logoRef.current;
    const counter = counterRef.current;
    const counterBox = counterBoxRef.current;
    if (!overlay || !stroke || !fill || !logo || !counter || !counterBox) {return;}

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = !!sessionStorage.getItem(SESSION_KEY);
    let finished = false;
    let disposed = false;
    let loadHandler: (() => void) | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // CareerModal と同様に html / body 両方をロックする
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };

    const ctx = gsap.context(() => {
      // --- Phase 3: FVビルドアップ（リビール後に連鎖） ---
      // PC専用UI（News・バナー・ナビ）はSPではレンダリングされない
      const buildFvTimeline = (tl: gsap.core.Timeline) => {
        const uiEls = gsap.utils.toArray<HTMLElement>('[data-opening="ui"]');
        tl.addLabel('fv');
        tl.to(
          '[data-opening="back-logo"]',
          { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'expo.out' },
          'fv-=0.35',
        );
        tl.to(
          '[data-opening="main-copy"] path',
          { y: 0, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.035 },
          'fv-=0.15',
        );
        tl.to(
          '[data-opening="sub-copy"]',
          { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.35',
        );
        if (uiEls.length > 0) {
          tl.to(
            uiEls,
            { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
            '-=0.3',
          );
        }
        tl.to('[data-opening="scroll-down"]', { autoAlpha: 1, duration: 0.5 }, '-=0.2');
        // 背面ロゴは以降ゆっくり漂わせる
        // （ctx.add でコンテキストに登録し、アンマウント時に確実に kill する）
        tl.call(() => {
          ctx.add(() => {
            gsap.to('[data-opening="back-logo"]', {
              y: 8,
              duration: 2.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            });
          });
        });
      };

      // --- Phase 2: リビール（マスクワイプ）+ Phase 3 ---
      // setTimeout / Promise コールバックから呼ばれるため、生成する
      // アニメーションを ctx.add でコンテキストに登録する
      const reveal = () => ctx.add(() => {
        if (finished || disposed) {return;}
        finished = true;
        sessionStorage.setItem(SESSION_KEY, '1');

        const tl = gsap.timeline({ onComplete: unlockScroll });
        if (reduced) {
          // 演出省略: オーバーレイをフェードするだけ。FV要素は隠さない
          tl.to(overlay, { autoAlpha: 0, duration: 0.4, ease: 'power1.out' });
          tl.set(overlay, { display: 'none' });
          return;
        }

        // FV要素の初期状態（この時点ではまだオーバーレイが画面を覆っている）
        tl.set('[data-opening="back-logo"]', {
          autoAlpha: 0,
          scale: 1.15,
          transformOrigin: '50% 50%',
        });
        tl.set('[data-opening="main-copy"] path', { y: 60, autoAlpha: 0 });
        tl.set('[data-opening="sub-copy"]', { y: 24, autoAlpha: 0 });
        const uiInit = gsap.utils.toArray<HTMLElement>('[data-opening="ui"]');
        if (uiInit.length > 0) {
          tl.set(uiInit, { y: 16, autoAlpha: 0 });
        }
        tl.set('[data-opening="scroll-down"]', { autoAlpha: 0 });

        // ロゴとカウンターを拡大しながら退場
        tl.to([logo, counterBox], {
          scale: 1.6,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.in',
          transformOrigin: '50% 50%',
        });
        // 斜めのマスクワイプ（右側が先行して割れる2段階クリップ）
        tl.to(
          overlay,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 25%, 0% 60%)',
            duration: 0.45,
            ease: 'power2.in',
          },
          '-=0.15',
        );
        tl.to(overlay, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.4,
          ease: 'power3.out',
        });
        tl.set(overlay, { display: 'none' });

        buildFvTimeline(tl);
        if (seen) {
          // 同一セッション2回目以降は全体を短縮
          tl.timeScale(1.8);
        }
      });

      // --- Phase 1: ローディング ---
      if (reduced || seen) {
        // ロゴを完成状態で静止表示し、すぐリビールへ
        gsap.set(fill, { clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(stroke, { autoAlpha: 0 });
        gsap.set(counterBox, { autoAlpha: 0 });
        // useIsPc の初期値による PC/SP コンポーネント差し替えが
        // 完了してからリビールする（差し替え前の要素を掴まないよう余裕を持つ）
        timers.push(setTimeout(reveal, reduced ? 600 : 400));
        return;
      }

      // ロゴのストロークをドローオン → 塗りを下からワイプ
      const strokePaths = stroke.querySelectorAll<SVGPathElement>('path');
      strokePaths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      const loadTl = gsap.timeline();
      loadTl.to(strokePaths, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        stagger: 0.06,
      });
      loadTl.to(fill, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power2.inOut' }, '-=0.2');
      loadTl.to(stroke, { autoAlpha: 0, duration: 0.3 }, '<');

      // 実際の読込状態と連動したプログレス
      const progress = { v: 0 };
      let finishing = false;
      const renderCounter = () => {
        counter.textContent = `${Math.round(progress.v)}`;
      };
      // 完了トゥイーン開始後は中間ターゲットへのトゥイーンを発行しない
      // （overwrite で完了トゥイーンが kill されて reveal が走らなくなるため）
      const tweenTo = (target: number) => {
        if (finishing || disposed) {return;}
        gsap.to(progress, {
          v: target,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: renderCounter,
          overwrite: true,
        });
      };
      tweenTo(15);

      let fontsDone = false;
      let loadDone = document.readyState === 'complete';

      const fontsReady: Promise<unknown> = document.fonts ? document.fonts.ready : Promise.resolve();
      fontsReady.then(() => {
        fontsDone = true;
        tweenTo(loadDone ? 90 : 55);
      });

      let windowLoaded: Promise<void> = Promise.resolve();
      if (!loadDone) {
        windowLoaded = new Promise<void>((resolve) => {
          loadHandler = () => {
            loadDone = true;
            tweenTo(fontsDone ? 90 : 70);
            resolve();
          };
          window.addEventListener('load', loadHandler, { once: true });
        });
      }

      const minDelay = new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, MIN_DISPLAY_MS));
      });
      const timeout = new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, MAX_WAIT_MS));
      });

      // 最低表示時間の経過 AND（読込完了 OR タイムアウト）で 100% へ
      const loadedOrTimeout = Promise.race([Promise.all([windowLoaded, fontsReady]), timeout]);
      Promise.all([minDelay, loadedOrTimeout]).then(() => {
        if (finished || disposed) {return;}
        finishing = true;
        gsap.to(progress, {
          v: 100,
          duration: 0.35,
          ease: 'power2.inOut',
          onUpdate: renderCounter,
          onComplete: reveal,
          overwrite: true,
        });
      });
      // 注意: gsap.context に scope（第2引数）を渡さないこと。
      // 渡すとセレクタ文字列が overlay 配下に限定され、Hero 側の
      // [data-opening] 要素が見つからなくなる
    });

    return () => {
      disposed = true;
      if (loadHandler) {
        window.removeEventListener('load', loadHandler);
      }
      timers.forEach(clearTimeout);
      unlockScroll();
      ctx.revert();
    };
  }, []);

  return (
    <div id="opening-overlay" className={styles.Opening} ref={overlayRef} aria-hidden="true">
      <noscript>
        <style>{'#opening-overlay{display:none}'}</style>
      </noscript>
      <div className={styles.Opening__Logo} ref={logoRef}>
        <div className={styles.Opening__LogoStroke} ref={strokeRef}>
          <OpeningLogo variant="stroke" />
        </div>
        <div className={styles.Opening__LogoFill} ref={fillRef}>
          <OpeningLogo variant="fill" />
        </div>
        <p className={styles.Opening__Tagline}>ITエンジニア転職 × 生成AI特化</p>
      </div>
      <div className={styles.Opening__Counter} ref={counterBoxRef}>
        <span ref={counterRef}>0</span>
        <span className={styles.Opening__CounterUnit}>%</span>
      </div>
    </div>
  );
}
