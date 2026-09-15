import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import '@/styles/noto-sans-jp.css';
import '@/styles/globals.css';
import Analytics from '@/components/Analytics/Analytics';
import GtmNoScript from '@/components/Analytics/GtmNoScript';
import Footer from '@/components/Footer/Footer';
import Icons from '@/components/Icons/Icons';
import NavigationSp from '@/components/Navigation/NavigationSp/NavigationSp';
import SourceEasterEgg from '@/components/SourceEasterEgg/SourceEasterEgg';
import { poppins } from '@/constants/common';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* 自前サブセットは next/font と違い自動で preload されないため明示する(Issue #100)。
            ext(JIS 第1水準の残り)は珍しい漢字が出たときだけ読めばよいので preload しない。 */}
        {[400, 900].map((weight) => (
          <link
            key={weight}
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href={`/siid/fonts/noto-sans-jp/noto-sans-jp-core-${weight}.woff2`}
          />
        ))}
      </head>
      <body className={poppins.variable}>
        <SourceEasterEgg />
        <GtmNoScript />
        <Analytics />
        <Icons />
        <NavigationSp />
        {children}
        <Footer />
      </body>
    </html>
  );
}
