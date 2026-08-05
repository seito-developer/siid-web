import FeaturesItem from '../FeaturesItem/FeaturesItem';

import styles from './FeaturesList.module.css';

const FEATURES = [
  {
    id: 1,
    image: '/siid/images/service/features/featurelist/featureitem/feature-1.jpg',
    title1: '最短ロードマップ&',
    title2: '学習カリキュラム',
    description: '最新技術を押さえた動画やテキストのロードマップで学習をサポートし、小さな成功体験を積み重ながら進捗を可視化。アクティブ率に応じた講師からの声掛けで、ひとりで悩まず続けられます。',
  },
  {
    id: 2,
    image: '/siid/images/service/features/featurelist/featureitem/feature-2.webp',
    title1: '転職向けポートフォリオ',
    title2: '完成までの並走サポート',
    description: 'アイデア出しから設計、実装・デプロイ、さらには履歴書や面接対策まで、プロダクト制作と転職活動のすべてをゼロから並走サポートします。',
  },
  {
    id: 3,
    image: '/siid/images/service/features/featurelist/featureitem/feature-3.jpg',
    title1: 'セイトによる',
    title2: '徹底1on1 Zoom',
    description: 'エンジニア・経営・人事の視点を持つセイトによる模擬面接で、一次〜最終面接まで徹底対策。技術問題の解法レクチャーも行い、合格ラインに達するまで何度でも実施します。',
  },
  {
    id: 4,
    image: '/siid/images/service/features/featurelist/featureitem/feature-4.jpg',
    title1: '勝ちパターンを押さえた',
    title2: '黄金テンプレート&添削',
    description: '履歴書・職務経歴書・写真の作り方から、35〜40種以上の面接想定質問への対策、GitHubや求人サイト・SNSのプロフィール整備まで、選考突破に必要な情報発信とアピール方法をまるごとサポートします。',
  },
];

export default function FeaturesList() {
  return (
    <div className={styles.FeaturesList}>
      <ul className={styles.FeaturesList__List}>
        {FEATURES.map(feature => (
          <FeaturesItem
            key={feature.id}
            image={feature.image}
            title1={feature.title1}
            title2={feature.title2}
            description={feature.description}
          />
        ))}
      </ul>
    </div>
  );
}
