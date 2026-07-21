import React from 'react';

/**
 * Google Tag Manager の noscript フォールバック。
 * body 開始直後に配置する（JS 無効環境向け）。
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GtmNoScript() {
  if (!GTM_ID) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
