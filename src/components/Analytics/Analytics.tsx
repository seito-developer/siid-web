import React from 'react';

import Script from 'next/script';

import {
  GA_ID,
  GTM_IDS,
  KARTE_ID,
  LP_CAREER_CONSENT_PATH,
  LP_CAREER_CONSENT_STORAGE_KEY,
  OPENAI_ADS_PIXEL_ID,
  USERHEAT_ID,
} from './analyticsConfig';

/**
 * 現行サイト（bug-fix.org/siid）から引き継いだ計測タグをまとめて出力する（Issue #19）。
 * - Google Analytics 4（gtag.js）
 * - Google Tag Manager（複数コンテナ対応）
 * - UserHeat（ヒートマップ）
 * - KARTE
 * - OpenAI Ads ピクセル
 *
 * 各 ID は環境変数で管理し、未設定のタグは出力しない（analyticsConfig.ts 参照）。
 * body 先頭に配置する想定（GTM の noscript は GtmNoScript を使用）。
 */
export default function Analytics() {
  return (
    <>
      {/*
        Cookie 同意バナーを出している lp-career だけ、Google Consent Mode の既定値を
        denied にする（docs/spec/07_lp-career-renewal.md §13.4）。
        この layout は lp-1 と共有のため、パスで絞って他ページの計測は変えない。
        GTM / GA4 の読み込み（afterInteractive）より先に走らせる必要があるので
        beforeInteractive で出す。
      */}
      <script
        // next/script ではなく素の script。GTM / GA4（afterInteractive）より前、
        // HTML の解析時点で必ず実行させる必要があるため。
        dangerouslySetInnerHTML={{
          __html: `(function(){try{
if(location.pathname.indexOf('${LP_CAREER_CONSENT_PATH}')!==0)return;
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
var stored=null;try{stored=window.localStorage.getItem('${LP_CAREER_CONSENT_STORAGE_KEY}');}catch(e){}
var v=stored==='accepted'?'granted':'denied';
gtag('consent','default',{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v,wait_for_update:500});
}catch(e){}})();`,
        }}
      />

      {/* Google Tag Manager（コンテナごとに 1 回だけ読み込む） */}
      {GTM_IDS.map((id) => (
        <Script id={`gtm-init-${id}`} key={id} strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`}
        </Script>
      ))}

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

      {/* KARTE */}
      {KARTE_ID && (
        <>
          <Script id="karte-init" strategy="afterInteractive">
            {`!(function(n){
if(!window[n]){var o=(window[n]=function(){var n=[].slice.call(arguments);return o.x?o.x.apply(0,n):o.q.push(n);});((o.q=[]),(o.i=Date.now()),(o.allow=function(){o.o='allow';}),(o.deny=function(){o.o='deny';}));}
})('krt');`}
          </Script>
          <Script
            id="karte-edge"
            strategy="afterInteractive"
            src={`https://cdn-edge.karte.io/${KARTE_ID}/edge.js`}
          />
        </>
      )}

      {/* OpenAI Ads ピクセル */}
      {OPENAI_ADS_PIXEL_ID && (
        <Script id="openai-ads-init" strategy="afterInteractive">
          {`!(function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments);};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f);})(window,document,'script','https://bzrcdn.openai.com/sdk/oaiq.min.js');
oaiq('init',{pixelId:'${OPENAI_ADS_PIXEL_ID}'});
window.__bugfixTrackOpenAIAds=function(eventName,eventData,options){try{if(typeof window.oaiq!=='function')return;if(options){window.oaiq('measure',eventName,eventData,options);return;}window.oaiq('measure',eventName,eventData);}catch(error){}};`}
        </Script>
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
