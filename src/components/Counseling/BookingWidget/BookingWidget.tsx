'use client';

import React, { useRef } from 'react';

import useJicooWidget from '@/hooks/useJicooWidget';

import styles from './BookingWidget.module.css';

// /counseling の Jicoo 予約フォーム(Issue #157)。
// 高さ・転送の通知は lp-career と同じ自前ホスト(useJicooWidget)で扱う。

const JICOO_WIDGET_URL = 'https://www.jicoo.com/event_types/dPvwnhRYxhQB/widget';

export default function BookingWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useJicooWidget(widgetRef, JICOO_WIDGET_URL, {
    title: '個別説明会の日時選択・予約フォーム',
  });

  return <div ref={widgetRef} className={styles.BookingWidget} data-url={JICOO_WIDGET_URL} />;
}
