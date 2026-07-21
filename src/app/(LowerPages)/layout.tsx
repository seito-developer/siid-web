import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import '../../styles/globals.css';
import Analytics from '@/components/Analytics/Analytics';
import GtmNoScript from '@/components/Analytics/GtmNoScript';
import _Corner, { CornerPosition as _CornerPosition } from '@/components/Corner/Corner';
import Footer from '@/components/Footer/Footer';
import Icons from '@/components/Icons/Icons';
import NavigationPcLower from '@/components/Navigation/NavigationPcLower/NavigationPcLower';
import NavigationSp from '@/components/Navigation/NavigationSp/NavigationSp';
import { notoSansJp, poppins } from '@/constants/common';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${poppins.variable} ${notoSansJp.variable}`}>
        <GtmNoScript />
        <Analytics />
        <Icons />
        <NavigationSp />
        <NavigationPcLower />
        {children}
        <Footer />
      </body>
    </html>
  );
}
