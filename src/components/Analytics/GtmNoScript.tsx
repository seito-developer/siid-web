import React from 'react';

import { GTM_IDS } from './analyticsConfig';

/**
 * Google Tag Manager の noscript フォールバック（JS 無効環境向け）。
 * body 開始直後に配置し、コンテナごとに iframe を出力する。
 */
export default function GtmNoScript() {
  if (GTM_IDS.length === 0) {
    return null;
  }

  return (
    <>
      {GTM_IDS.map((id) => (
        <noscript key={id}>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${id}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
      ))}
    </>
  );
}
