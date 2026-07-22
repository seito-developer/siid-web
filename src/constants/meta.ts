import { Metadata } from 'next';

import { handleStringHTML } from '@/utils/helper';

export const commonTitle = 'ITエンジニア転職 × 生成AI特化のプログラミングスクール - SiiD';

// 本番サイトの公開 URL(canonical・OGP・sitemap の絶対 URL 生成に使用)。
// 末尾スラッシュなしで統一し、環境ごとに NEXT_PUBLIC_SITE_URL で上書きできる。
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bug-fix.org/siid';

export const OGP_IMAGE_PATH = '/ogp.png';
export const pages = {
  index: {
    name: {
      ja: 'TOP',
      en: 'Home',
    },
    url: '/',
    description: 'SiiDは、ITエンジニア転職と生成AIに特化したプログラミングスクールです。<br />実践的なカリキュラムと最新の技術を学び、あなたのキャリアを次のステージへと導きます。',
  },
  careerPath: {
    name: {
      ja: '卒業生の進路',
      en: 'Career Path',
    },
    url: '/career-path',
    description: 'SiiDは学んで終わりではなく、その先の人生もあなたと共にありたいと考えています。<br />そのためのサポートもしっかりとご用意しています。',
  },
  courses: {
    name: {
      ja: 'コース一覧',
      en: 'Course plan',
    },
    url: '/courses',
    description: 'SiiDのコースは、実践的なスキルを身につけるために設計されています。<br />業界の最新トレンドに基づいたカリキュラムで、あなたの成長をサポートします。',
  },
  community: {
    name: {
      ja: 'SiiDコミュニティ',
      en: 'Community',
    },
    url: '/community',
    description: 'SiiDのコミュニティでは、学んだことを実践し、<br />キャリアを展開するための情報を共有します。',
  },
  service: {
    name: {
      ja: 'サービス',
      en: 'Service',
    },
    url: '/service',
    description: 'SiiDは学んで終わりではなく、その先の人生もあなたと共にありたいと考えています。<br />そのためのサポートもしっかりとご用意しています。',
    // description は Headline の表示コピーを兼ねるため、SEO 用の文面は metaDescription で上書きする
    metaDescription: 'SiiDが提供するサービスの紹介ページです。生成AI時代のITエンジニア転職に向けた実践的な学習カリキュラムと、転職・キャリア形成までを見据えたサポート体制をご案内します。',
  },
  counseling: {
    name: {
      ja: '無料カウンセリング',
      en: 'Counseling',
    },
    url: '/counseling',
    description: 'SiiDの無料カウンセリングでは、あなたのキャリアや学習に関する疑問や不安を解消します。<br />経験豊富なスタッフが、あなたの目標達成をサポートします。',
  },
  line: {
    name: {
      ja: 'LINE登録で無料体験',
      en: 'Free trial',
    },
    url: '/line',
    description: 'SiiDは学んで終わりではなく、その先の人生もあなたと共にありたいと考えています。<br />そのためのサポートもしっかりとご用意しています。',
    metaDescription: 'SiiDのLINE公式アカウントに登録すると、プログラミング学習やITエンジニア転職に役立つ特典を無料で受け取れます。まずはLINE登録から、お気軽にSiiDをご体験ください。',
  },
  counselingComplete: {
    name: {
      ja: 'ご予約完了',
      en: 'Thank you',
    },
    url: '/counseling/complete',
    description: '無料カウンセリングのお申し込みありがとうございます。<br />ご予約内容の確認メールをお送りしましたのでご確認ください。',
  },
};

interface PageMeta {
  name: { ja: string; en: string };
  url: string;
  description: string;
  metaDescription?: string;
}

interface BuildPageMetadataOptions {
  title?: string;
  // ページネーション等で page.url と実 URL が異なる場合に指定(例: '/career-path/2')
  canonicalPath?: string;
  noindex?: boolean;
}

// title / description / canonical / OGP / Twitter Card をまとめて生成する共通ヘルパー。
// canonical・OGP の URL は SEO 指摘(canonical 未設置・OGP の相対パス記述)に対応するため
// SITE_URL 起点の絶対 URL で出力する。
export function buildPageMetadata(page: PageMeta, options: BuildPageMetadataOptions = {}): Metadata {
  const title = options.title ?? `${page.name.ja} | ${commonTitle}`;
  const description = page.metaDescription ?? handleStringHTML(page.description, false);
  const canonical = `${SITE_URL}${options.canonicalPath ?? page.url}`.replace(/\/$/, '');
  const ogpImage = `${SITE_URL}${OGP_IMAGE_PATH}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SiiD',
      type: 'website',
      locale: 'ja_JP',
      images: [ogpImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogpImage],
    },
    ...(options.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}