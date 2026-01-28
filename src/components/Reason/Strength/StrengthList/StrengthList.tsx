import StrengthCard from './StrengthCard/StrengthCard';
import styles from './StrengthList.module.css';

export default function StrengthList() {
  const strengths = [
    {
      icon: 'chart' as const,
      title: '「エンジニア×経営人事」視点のエッセンス',
      items: ['エンジニア歴7年以上の開発実績', '2000人以上を選考し、150名以上のエンジニアを採用してきた経営人事経験', 'Adobe Japan等を含む内定実績'],
    },
    {
      icon: 'gear' as const,
      title: '基礎学問×市場ニーズ×最新トレンドまでをカバー',
      items: ['コンピュータ、アルゴリズムなどの情報工学分野から指導', 'PHP/Laravel/GitHubなど企業が求める技術を徹底指導', 'Docker/Fly.Io/React/TypeScriptなど最新技術もカバー'],
    },
    {
      icon: 'chat' as const,
      title: 'IT人材に必要なコミュニケーション力向上も指導',
      items: ['対人事/経営陣/技術者などタイプ別の模擬面接対策', 'ITエンジニア特化の履歴書/職務経歴書添削', '一流エンジニアとしてのマインド面の学習も◎'],
    },
    {
      icon: 'app' as const,
      title: 'アプリ完成までを徹底サポート',
      items: ['企画/設計/開発までをカバー', 'テンプレートや添削で迷わず作りきれるシステム。就活でウケるポートフォリオを伝授', '作って終わりじゃない！完成物を人事に確実にみてもらう術までフォロー'],
    },
    {
      icon: 'goal' as const,
      title: '個々に合わせたゴールまでの戦略立案',
      items: ['完全未経験からでも前職を活かしたアピール方法を提案', 'ネガティブ要素を払拭するリカバリー案', '希望の就業エリアや働き方を踏まえての対策', '個々に合わせた学習時間の見積もりとスケジューリング'],
    },
    {
      icon: 'community' as const,
      title: '学び続けられる環境・仕組み',
      items: ['仕事や家庭と両立しながら進められる仕組みと体制', '小さな成功体験を頼めるカリキュラム', 'Zoomやチャットで講師陣に気軽に相談できる体制', '同じ志をもった同級生や卒業生がいる永久コミュニティ'],
    },
  ];

  return (
    <div className={styles.StrengthList}>
      {strengths.map((strength, index) => (
        <StrengthCard key={index} icon={strength.icon} title={strength.title} items={strength.items} />
      ))}
    </div>
  );
}
