'use client';

import React, { useEffect, useRef } from 'react';

import SectionBg from '../SectionBg/SectionBg';

import styles from './Counselling.module.css';

// FREE COUNSELING(docs/spec/lp-career-sections/16-counselling.md)。
//
// 予約フォームは Jicoo の埋め込み(予約ページ ID は旧 lp-1 と共通)。
// 総高 17,000px 超のページで最下部のウィジェットを初期ロードしても意味がないため、
// セクションが近づいたら予約iframeを読み込む。高さと転送の通知はこのホストで扱う。

const JICOO_WIDGET_URL = 'https://www.jicoo.com/event_types/7prAIkBVVBVF/widget';
const JICOO_ORIGIN = new URL(JICOO_WIDGET_URL).origin;

const POINTS = ['参加費\n無料', '60~90分', 'オンライン', '無理な\n勧誘なし'];

export default function Counselling() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el) {
      return undefined;
    }

    let frame: HTMLIFrameElement | null = null;
    let maximumHeight = 0;
    let animationFrame = 0;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== JICOO_ORIGIN || !frame || event.source !== frame.contentWindow) {
        return;
      }
      const data = event.data;
      if (!data || typeof data !== 'object') { return; }

      if (data.name === 'windowHeight') {
        const height = typeof data.value === 'number' || typeof data.value === 'string'
          ? Number(data.value) : NaN;
        if (!Number.isFinite(height) || height <= 0 || height > 20000) { return; }
        // 画面切り替え中の一時的な低い値で、カードや入力位置を上下させない。
        maximumHeight = Math.max(maximumHeight, Math.ceil(height));
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          if (frame) { frame.style.height = `${maximumHeight}px`; }
        });
      }

      if (data.name === 'redirectUrl' && typeof data.value === 'string') {
        try {
          const url = new URL(data.value, window.location.href);
          // Jicoo内の入力画面遷移は埋め込みのまま。設定済みの完了URLだけ親で開く。
          const isEventPage = /^\/t\/[^/]+\/e\/[^/]+$/.test(url.pathname);
          if ((url.protocol === 'https:' || url.origin === window.location.origin)
            && (url.origin !== JICOO_ORIGIN || isEventPage)) {
            window.location.assign(url.href);
          }
        } catch { /* 不正な通知では画面を遷移させない。 */ }
      }
      // scrollWidgetTopではページを強制移動しない。入力位置は利用者が操作する。
    };

    // 幅が変わるとJicoo側の折り返しも変わり、高さが再通知される(実測: SP縦で入力画面 1901px →
    // 横向きで 1666px)。保持中の最大値に張り付かないよう、幅の変化時だけ基準を戻す。
    // SPのアドレスバー伸縮による高さだけの変化では戻さない。
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) { return; }
      lastWidth = window.innerWidth;
      maximumHeight = 0;
    };

    const load = () => {
      if (frame) { return; }
      frame = document.createElement('iframe');
      frame.src = JICOO_WIDGET_URL;
      frame.title = '無料カウンセリングの日時選択・予約フォーム';
      el.appendChild(frame);
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('resize', onResize);
    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrame);
      frame?.remove();
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return cleanup;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: '600px' },
    );
    io.observe(el);

    return () => { io.disconnect(); cleanup(); };
  }, []);

  return (
    <section className={styles.Counselling} id="counselling">
      <SectionBg
        name="counselling"
        pcWidth={1440}
        pcHeight={1019}
        spWidth={750}
        spHeight={2374}
      />

      <div className={styles.Counselling__Inner}>
        <p className={styles.Counselling__Label}>FREE COUNSELING</p>

        <div className={styles.Counselling__Text}>
          <p className={styles.Counselling__Kicker}>
            <span className={styles.Counselling__KickerSmall}>まずは</span>
            <span className={styles.Counselling__KickerMain}>あなたの現在地を</span>
          </p>
          <h2 className={styles.Counselling__Heading}>
            一緒に整理
            <br />
            しませんか？
          </h2>
          <p className={styles.Counselling__Lead}>
            相談だけでも大丈夫です。
            <br />
            学習・転職・給付金・費用について、
            <br />
            具体的な道筋をご案内します。
          </p>

          <ul className={styles.Counselling__Points}>
            {POINTS.map((point) => (
              <li key={point}>
                {point.split('\n').map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.Counselling__Booking}>
          <h3 className={styles.Counselling__BookingTitle}>無料カウンセリング予約</h3>
          <div
            ref={widgetRef}
            className={styles.Counselling__Widget}
            data-url={JICOO_WIDGET_URL}
          />
        </div>
      </div>
    </section>
  );
}
