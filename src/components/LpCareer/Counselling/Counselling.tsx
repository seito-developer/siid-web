'use client';

import React, { useEffect, useRef } from 'react';

import useJicooWidget from '@/hooks/useJicooWidget';

import { getCanvasScale } from '../CanvasScale/getCanvasScale';
import SectionBg from '../SectionBg/SectionBg';

import styles from './Counselling.module.css';

// FREE COUNSELING(docs/spec/lp-career-sections/16-counselling.md)。
//
// 予約フォームは Jicoo の埋め込み(予約ページ ID は旧 lp-1 と共通)。
// 総高 17,000px 超のページで最下部のウィジェットを初期ロードしても意味がないため、
// セクションが近づいたら予約iframeを読み込む。高さと転送の通知は useJicooWidget で扱う。

const JICOO_WIDGET_URL = 'https://www.jicoo.com/event_types/7prAIkBVVBVF/widget';

const POINTS = ['参加費\n無料', '60〜90分', 'オンライン', '無理な\n勧誘なし'];

export default function Counselling() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useJicooWidget(widgetRef, JICOO_WIDGET_URL, {
    title: '無料カウンセリングの日時選択・予約フォーム',
  });

  // iframe だけ LP 全体の zoom を打ち消す(Issue #138。理由は Counselling.module.css)。
  // 縮尺は CSS の calc ではなく数値で渡す。iOS 26 の Safari は
  // `zoom: calc(1 / (100vw / 375px))` を受け付けても 1 として扱い、打ち消しが効かなかった。
  // iframe は画面に近づいてから読み込まれるので、その前に入る。
  useEffect(() => {
    const el = widgetRef.current;
    if (!el) {
      return undefined;
    }

    const applyScale = () => {
      const scale = getCanvasScale();
      el.style.setProperty('--counselling-widget-scale', String(scale));
      el.style.setProperty('--counselling-widget-unzoom', String(1 / scale));
    };
    applyScale();

    window.addEventListener('resize', applyScale);
    return () => window.removeEventListener('resize', applyScale);
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
