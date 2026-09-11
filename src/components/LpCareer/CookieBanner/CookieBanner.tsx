'use client';

import { useEffect, useState } from 'react';

import { LP_CAREER_CONSENT_STORAGE_KEY } from '@/components/Analytics/analyticsConfig';

import styles from './CookieBanner.module.css';

// Cookie 同意バナー(docs/spec/07_lp-career-renewal.md §13.4)。
//
// バナーは (Lp)/layout.tsx ではなく lp-career のページ側に置く。
//
// 同意状態は localStorage に保持する。プライベートウィンドウやサイトデータの
// 削除で読めなくなることがあるため、読み書きは try/catch で囲み、
// 読めなかった場合は「未同意」として扱う。
//
// 読み込み前の既定値(consent default: denied)は Analytics コンポーネント側で、
// lp-career のパスに限って beforeInteractive のスクリプトとして出している。
// ここでは利用者の選択を Consent Mode の update として dataLayer に流す。

const STORAGE_KEY = LP_CAREER_CONSENT_STORAGE_KEY;

function readConsent(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

type ConsentValue = 'granted' | 'denied';

/**
 * Google Consent Mode の update を dataLayer に流す。GTM が無ければ何も起きない。
 *
 * gtag() は配列ではなく `arguments` オブジェクトを push する。GTM はこの形しか
 * consent コマンドとして解釈しないため、同じ形になるよう関数式で push する。
 */
function gtag(..._args: unknown[]) {
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

function updateConsentMode(value: ConsentValue) {
  try {
    gtag('consent', 'update', {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value,
    });
  } catch {
    // 計測の更新に失敗しても表示の妨げにはしない
  }
}

function writeConsent(value: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // 保存できなくても表示の妨げにはしない
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // サーバー描画とずれないよう、判定はマウント後に行う
    const stored = readConsent();
    if (!stored) {
      setIsVisible(true);
      return;
    }
    // 再訪時も保存済みの選択を計測側へ反映する
    updateConsentMode(stored === 'accepted' ? 'granted' : 'denied');
  }, []);

  const close = (value: 'accepted' | 'rejected') => {
    writeConsent(value);
    updateConsentMode(value === 'accepted' ? 'granted' : 'denied');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  // フォーカスを閉じ込めないバナーのため role="dialog" ではなく region にする
  return (
    <div className={styles.CookieBanner} role="region" aria-label="Cookie の利用について">
      <p className={styles.CookieBanner__Text}>
        当サイトでは、サービス改善と利用状況の分析のために Cookie を使用します。詳細は
        <a href="https://bug-fix.org/privacy-policy" target="_blank" rel="noopener noreferrer">
          プライバシーポリシー
        </a>
        をご確認ください。
      </p>
      <div className={styles.CookieBanner__Actions}>
        <button type="button" className={styles.CookieBanner__Reject} onClick={() => close('rejected')}>
          拒否する
        </button>
        <button type="button" className={styles.CookieBanner__Accept} onClick={() => close('accepted')}>
          同意する
        </button>
      </div>
    </div>
  );
}
