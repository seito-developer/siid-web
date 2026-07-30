import Analytics from '@/components/Analytics/Analytics';
import GtmNoScript from '@/components/Analytics/GtmNoScript';

import { barlowSemiCondensedLp, notoSansJpLp, poppinsLp } from './fonts';

import './lp1.css';

// 独立LP用の root layout。共通クローム(Icons / NavigationSp / Footer / NavigationPcLower)と
// globals.css を持ち込まず、旧LPのデザインを (Main) 側と完全に隔離して再現する(Issue #40)。
export default function LpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJpLp.variable} ${poppinsLp.variable} ${barlowSemiCondensedLp.variable}`}
      >
        <GtmNoScript />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
