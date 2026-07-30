'use client';

import { useEffect, useRef } from 'react';

const RETRY_INTERVAL_MS = 200;
const MAX_RETRY_COUNT = 75; // 200ms × 75 = 最大15秒待つ

type Props = {
  eventName: string;
  eventData?: Record<string, unknown>;
};

/**
 * マウント時に OpenAI Ads の CV 計測（window.__bugfixTrackOpenAIAds）を1回だけ発火する。
 * 発火関数は Analytics.tsx が afterInteractive で定義するため、
 * 未定義の間はリトライし、env（NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID）未設定の環境では
 * リトライ上限に達した時点で何もせず終了する。
 */
export default function TrackOpenAiAdsConversion({ eventName, eventData }: Props) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) {
      return undefined;
    }

    let retryCount = 0;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const track = () => {
      if (hasTracked.current) {
        return;
      }
      if (typeof window.__bugfixTrackOpenAIAds === 'function') {
        hasTracked.current = true;
        window.__bugfixTrackOpenAIAds(eventName, eventData);
        return;
      }
      retryCount += 1;
      if (retryCount < MAX_RETRY_COUNT) {
        timerId = setTimeout(track, RETRY_INTERVAL_MS);
      }
    };

    track();

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [eventName, eventData]);

  return null;
}
