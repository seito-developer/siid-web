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
  notFound: {
    name: {
      ja: 'ページが見つかりません',
      en: '404 Not Found',
    },
    url: '/404',
    description:
      '一時的にアクセスできない状態か、<br />移動もしくは削除されてしまった可能性があります',
  },
  whitePaper: {
    name: {
      ja: '資料請求',
      en: 'White Paper',
    },
    url: '/white-paper',
    description: '公式LINEへのご登録で、<br />SiiDの紹介資料をダウンロードいただけます。',
    metaDescription: 'SiiDのサービス紹介資料をダウンロードいただけます。公式LINEへのご登録で、コース内容・料金・転職サポートの詳細をまとめた資料をお受け取りください。',
  },
  counselingCompleteLp1: {
    name: {
      ja: 'お申し込み完了',
      en: 'Thank you',
    },
    url: '/counseling-complete-lp-1',
    description: '無料カウンセリングのお申し込みありがとうございます。<br />当日のご案内をメールにてお送りしますのでご確認ください。',
  },
  // 旧サイト由来のフラット URL 版サンクスページ。既存の /counseling/complete(counselingComplete)とは別ルート
  counselingCompleteFlat: {
    name: {
      ja: 'お申し込み完了',
      en: 'Thank you',
    },
    url: '/counseling-complete',
    description: '無料カウンセリングのお申し込みありがとうございます。<br />当日のご案内をメールにてお送りしますのでご確認ください。',
  },
  lp1: {
    name: {
      ja: 'AIプログラミングスクール SiiD',
      en: 'SiiD LP',
    },
    url: '/lp-1',
    description: '未経験から最短でエンジニア転職が目指せるAIプログラミングスクールSiiD。経済産業省リスキル講座認定で受講料は給付金により最大80%OFF。現役エンジニアの個別指導と就活サポートで目標達成率88%・受講生満足度92%。無料カウンセリング受付中。',
  },
  lp2: {
    name: {
      ja: 'AIプログラミングスクール SiiD',
      en: 'SiiD LP',
    },
    url: '/lp-2',
    description: 'AI時代に、選ばれるエンジニアへ。<br />元人事部長の現役エンジニアが、学習から内定まで総合プロデュースします。',
    // 「ページ内容 | サイト名」で全角 28 字前後に収める(リリース前チェックリスト)。
    // 既定の `name.ja | commonTitle` は 58 字あり、「プログラミングスクール」「SiiD」も重複する。
    metaTitle: '未経験からITエンジニア転職 | AIプログラミングスクール SiiD',
    metaDescription:
      '未経験からITエンジニア転職を目指すAIプログラミングスクールSiiD。経済産業省リスキル講座認定で、受講料は給付金により最大80%OFF。元人事部長の現役エンジニアが採用する側の目線で、学習からポートフォリオ制作・書類選考・面接対策まで総合プロデュースします。目標達成率88%・受講生満足度92%。無料カウンセリングを受付中です。',
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
  // 既定の `name.ja | commonTitle` では長すぎる/表現を変えたいページで使う
  metaTitle?: string;
  metaDescription?: string;
}

interface BuildPageMetadataOptions {
  title?: string;
  // ページネーション等で page.url と実 URL が異なる場合に指定(例: '/career-path/2')
  canonicalPath?: string;
  noindex?: boolean;
  // 共通 OGP 画像ではなくページ固有の画像を使う場合に指定(例: '/images/lp-2/ogp.png')
  ogpImagePath?: string;
}

// title / description / canonical / OGP / Twitter Card をまとめて生成する共通ヘルパー。
// canonical・OGP の URL は SEO 指摘(canonical 未設置・OGP の相対パス記述)に対応するため
// SITE_URL 起点の絶対 URL で出力する。
export function buildPageMetadata(page: PageMeta, options: BuildPageMetadataOptions = {}): Metadata {
  const title = options.title ?? page.metaTitle ?? `${page.name.ja} | ${commonTitle}`;
  const description = page.metaDescription ?? handleStringHTML(page.description, false);
  const canonical = `${SITE_URL}${options.canonicalPath ?? page.url}`.replace(/\/$/, '');
  const ogpImage = `${SITE_URL}${options.ogpImagePath ?? OGP_IMAGE_PATH}`;

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