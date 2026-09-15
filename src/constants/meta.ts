import { Metadata } from 'next';

import { handleStringHTML } from '@/utils/helper';

// 検索結果に出るのは全角 30 字前後のため、サイト名は短く保つ(Issue #96)。
// ページ名と合わせて 32 字以内に収まる長さにしている。
export const commonTitle = 'AIプログラミングスクール SiiD';

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
    metaTitle:
      'AIプログラミングスクール SiiD | キャリアアップやAI/ITエンジニアへの転職は我々にお任せを。',
    description: 'SiiDは、ITエンジニア転職と生成AIに特化したプログラミングスクールです。<br />実践的なカリキュラムと最新の技術を学び、あなたのキャリアを次のステージへと導きます。',
  },
  careerPath: {
    name: {
      ja: '卒業生の進路',
      en: 'Career Path',
    },
    url: '/career-path',
    description: 'SiiDの卒業生がどんな企業へ、どんな経歴から転職したのかをインタビュー記事で紹介しています。未経験からのエンジニア転職、現役エンジニアの年収アップなど、実際の事例を職種・年代別にご覧いただけます。',
  },
  courses: {
    name: {
      ja: 'コース一覧',
      en: 'Course plan',
    },
    url: '/courses',
    description: 'SiiDのコース内容と料金をご案内します。経済産業省のリスキル講座認定により受講料は給付金で最大80%OFF。目的に合わせて選べる複数のプランと、それぞれのサポート範囲を比較表でご確認いただけます。',
  },
  community: {
    name: {
      ja: 'SiiDコミュニティ',
      en: 'Community',
    },
    url: '/community',
    metaTitle:
      'コミュニティ | AIプログラミングスクール SiiD',
    description: 'SiiDのコミュニティでは、受講生・卒業生・講師が学びや転職の情報を交換しています。一人で抱え込まず、同じ目標を持つ仲間と相談し合いながら学習を続けられる環境です。卒業後も参加いただけます。',
  },
  service: {
    name: {
      ja: 'サービス',
      en: 'Service',
    },
    url: '/service',
    metaTitle:
      'サービス紹介 | AIプログラミングスクール SiiD',
    description: 'SiiDが提供するサービスの紹介ページです。生成AI時代のITエンジニア転職に向けた実践的な学習カリキュラムと、転職・キャリア形成までを見据えたサポート体制をご案内します。',
  },
  counseling: {
    name: {
      ja: '無料カウンセリング',
      en: 'Counseling',
    },
    url: '/counseling',
    description: 'SiiDの無料カウンセリングでは、現役エンジニアの講師が学習計画やキャリアのご相談に個別でお答えします。受講を迷っている段階でも構いません。所要60〜90分・オンライン・無理な勧誘はありません。',
  },
  line: {
    name: {
      ja: 'LINE登録で無料体験',
      en: 'Free trial',
    },
    url: '/line',
    description: 'SiiDのLINE公式アカウントに登録すると、プログラミング学習やITエンジニア転職に役立つ特典を無料で受け取れます。まずはLINE登録から、お気軽にSiiDをご体験ください。',
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
    description: 'SiiDのサービス紹介資料をダウンロードいただけます。公式LINEへのご登録で、コース内容・料金・転職サポートの詳細をまとめた資料をお受け取りください。',
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
  lpCareer: {
    name: {
      ja: 'AIプログラミングスクール SiiD',
      en: 'SiiD LP',
    },
    url: '/lp-career',
    description:
      '未経験からITエンジニア転職を目指すAIプログラミングスクールSiiD。経済産業省リスキル講座認定で、受講料は給付金により最大80%OFF。元人事部長の現役エンジニアが採用する側の目線で、学習からポートフォリオ制作・書類選考・面接対策まで総合プロデュースします。目標達成率88%・受講生満足度92%。無料カウンセリングを受付中です。',
    // 「ページ内容 | サイト名」で全角 28 字前後に収める(リリース前チェックリスト)。
    // 既定の `name.ja | commonTitle` は 58 字あり、「プログラミングスクール」「SiiD」も重複する。
    metaTitle: '未経験からITエンジニア転職 | AIプログラミングスクール SiiD',
  },
  counselingCompleteLpCareer: {
    name: { ja: '無料カウンセリングのご予約完了', en: 'Thank you' },
    url: '/lp-career/complete',
    metaTitle: 'ご予約完了 | SiiD 無料カウンセリング',
    description: '無料カウンセリングのご予約ありがとうございます。確認メールと当日の参加方法をご案内します。',
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
}

interface BuildPageMetadataOptions {
  title?: string;
  // ページネーション等で page.url と実 URL が異なる場合に指定(例: '/career-path/2')
  canonicalPath?: string;
  noindex?: boolean;
  // 共通 OGP 画像ではなくページ固有の画像を使う場合に指定(例: '/images/lp-career/ogp.png')
  ogpImagePath?: string;
}

// title / description / canonical / OGP / Twitter Card をまとめて生成する共通ヘルパー。
// canonical・OGP の URL は SEO 指摘(canonical 未設置・OGP の相対パス記述)に対応するため
// SITE_URL 起点の絶対 URL で出力する。
export function buildPageMetadata(page: PageMeta, options: BuildPageMetadataOptions = {}): Metadata {
  const title = options.title ?? page.metaTitle ?? `${page.name.ja} | ${commonTitle}`;
  // description は画面表示と meta の両方で使う。<br /> は meta では除去する(Issue #112)。
  const description = handleStringHTML(page.description, false);
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