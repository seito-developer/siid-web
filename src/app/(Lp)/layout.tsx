import Analytics from '@/components/Analytics/Analytics';
import GtmNoScript from '@/components/Analytics/GtmNoScript';

import { notoSansJpLp } from './fonts';

import './lp-base.css';

// 独立LP(lp-career)用の root layout。共通クローム(Icons / NavigationSp / Footer / NavigationPcLower)と
// globals.css を持ち込まず、(Main) 側と完全に隔離する(Issue #40)。基本スタイルは lp-base.css。
export default function LpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJpLp.variable}>
        <GtmNoScript />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
