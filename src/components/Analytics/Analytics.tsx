import React from 'react';

import Script from 'next/script';

/**
 * 現行サイト（bug-fix.org/siid）から引き継ぐ計測タグをまとめて出力する。
 * - Google Analytics 4（gtag.js）
 * - Google Tag Manager
 * - UserHeat（ヒートマップ）
 *
 * 各 ID は環境変数（NEXT_PUBLIC_*）で管理し、未設定のタグは出力しない。
 * body 先頭に配置する想定（GTM の noscript は GtmNoScript を使用）。
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const USERHEAT_ID = process.env.NEXT_PUBLIC_USERHEAT_ID;

export default function Analytics() {
  return (
    <>
      {/* Google Tag Manager */}
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {/* Google Analytics 4（gtag.js） */}
      {GA_ID && (
        <>
          <Script
            id="ga-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {/* UserHeat（ヒートマップ） */}
      {USERHEAT_ID && (
        <Script id="userheat-init" strategy="afterInteractive">
          {`(function(add,cla){window['UserHeatTag']=cla;window[cla]=window[cla]||function(){(window[cla].q=window[cla].q||[]).push(arguments);};window[cla].l=1*new Date();var ul=document.createElement('script');var tag=document.getElementsByTagName('script')[0];ul.async=1;ul.src=add;tag.parentNode.insertBefore(ul,tag);})('//uh.nakanohito.jp/uhj2/uh.js','_uhtracker');_uhtracker({id:'${USERHEAT_ID}'});`}
        </Script>
      )}
    </>
  );
}
