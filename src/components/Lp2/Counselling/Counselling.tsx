'use client';

import React, { useEffect, useRef } from 'react';

import SectionBg from '../SectionBg/SectionBg';

import styles from './Counselling.module.css';

// FREE COUNSELING(docs/spec/lp2-sections/16-counselling.md)。
//
// 予約フォームは既存 lp-1 と同じ Jicoo の埋め込みを流用する。
// 総高 17,000px 超のページで最下部のウィジェットを初期ロードしても意味がないため、
// セクションが近づいたら(rootMargin 600px)script を一度だけ読み込む。

const JICOO_WIDGET_URL = 'https://www.jicoo.com/event_types/7prAIkBVVBVF/widget';
const JICOO_SCRIPT_URL = 'https://www.jicoo.com/widget/event_type.js';

const POINTS = ['参加費\n無料', '60~90分', 'オンライン', '無理な\n勧誘なし'];

export default function Counselling() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el) {
      return undefined;
    }

    const load = () => {
      if (loadedRef.current) {
        return;
      }
      loadedRef.current = true;
      const script = document.createElement('script');
      script.src = JICOO_SCRIPT_URL;
      script.async = true;
      document.body.appendChild(script);
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return undefined;
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

    return () => io.disconnect();
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

        <div
          ref={widgetRef}
          className={`jicoo-widget ${styles.Counselling__Widget}`}
          data-url={JICOO_WIDGET_URL}
        />
      </div>
    </section>
  );
}
