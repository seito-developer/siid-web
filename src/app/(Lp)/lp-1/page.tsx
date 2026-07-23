import { Metadata } from 'next';

import Lp1CampaignBanner from '@/components/Lp1/Lp1CampaignBanner';
import Lp1Compare from '@/components/Lp1/Lp1Compare';
import Lp1Cta from '@/components/Lp1/Lp1Cta';
import Lp1Curriculum from '@/components/Lp1/Lp1Curriculum';
import Lp1Faq from '@/components/Lp1/Lp1Faq';
import Lp1FloatCta from '@/components/Lp1/Lp1FloatCta';
import Lp1Flow from '@/components/Lp1/Lp1Flow';
import Lp1Footer from '@/components/Lp1/Lp1Footer';
import Lp1Hero from '@/components/Lp1/Lp1Hero';
import Lp1Mentor from '@/components/Lp1/Lp1Mentor';
import Lp1Message from '@/components/Lp1/Lp1Message';
import Lp1Nav from '@/components/Lp1/Lp1Nav';
import Lp1Plans from '@/components/Lp1/Lp1Plans';
import Lp1Problems from '@/components/Lp1/Lp1Problems';
import Lp1Reasons from '@/components/Lp1/Lp1Reasons';
import Lp1Voice from '@/components/Lp1/Lp1Voice';
import { SITE_URL, pages } from '@/constants/meta';

// 広告流入用の独立LP。メタ情報は旧LP(bug-fix.org/siid/lp-1)の head から移植。
// 新TOPページと訴求が重複するため noindex とする(Issue #40 での決定)。
const title =
  'AIプログラミングスクール SiiD｜未経験からエンジニア転職／給付金で受講料最大80%OFF';
const ogDescription =
  '経済産業省リスキル講座認定で受講料は給付金により最大80%OFF。現役エンジニアの個別指導と就活サポートで未経験からエンジニア転職へ。無料カウンセリング受付中。';

export const metadata: Metadata = {
  title,
  description: pages.lp1.description,
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE_URL}${pages.lp1.url}`,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: `${SITE_URL}${pages.lp1.url}`,
    type: 'website',
    locale: 'ja_JP',
    images: [`${SITE_URL}/images/lp-1/hero.webp`],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: ogDescription,
    images: [`${SITE_URL}/images/lp-1/hero.webp`],
  },
};

export default function Lp1() {
  return (
    <>
      <div className="page">
        <Lp1Nav />
        <Lp1CampaignBanner />
        <Lp1Hero />
        <Lp1Message />
        <Lp1Problems />
        <Lp1Reasons />
        <Lp1Curriculum />
        <Lp1Compare />
        <Lp1Plans />
        <Lp1Voice />
        <Lp1Mentor />
        <Lp1Faq />
        <Lp1Flow />
        <Lp1Cta />
        <Lp1Footer />
      </div>
      <Lp1FloatCta />
    </>
  );
}
