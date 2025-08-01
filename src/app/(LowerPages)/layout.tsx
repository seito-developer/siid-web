import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import '../../styles/globals.css';
import Icons from "@/components/Icons/Icons";
import Footer from "@/components/Footer/Footer";
import NavigationSp from "@/components/Navigation/NavigationSp/NavigationSp";
import { notoSansJp, poppins } from "@/constants/common";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${poppins.variable} ${notoSansJp.variable}`}>
        <Icons />
        <NavigationSp />
        {children}
        <Footer />
      </body>
    </html>
  );
}
