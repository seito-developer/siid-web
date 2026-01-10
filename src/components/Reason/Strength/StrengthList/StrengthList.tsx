import StrengthCard from './StrengthCard/StrengthCard';
import styles from './StrengthList.module.css';

export default function StrengthList() {
  const strengths = [
    {
      icon: 'chart' as const,
      title: '「エンジニア×経営人事」視点のエッセンス',
      items: ['エンジニア視点だけの偏った学習', '2000人以上を輩出し、150社以上のエンジニアを採用した企業人事観点'],
    },
    {
      icon: 'gear' as const,
      title: '基礎学問×市場ニーズ×最新トレンドでとことんバージョンアップ',
      items: ['コンピュータ、アルゴリズムなどの情報工学的な学習', 'PHP/Laravel/GitHubなど企業で実際に使われるツール', 'ChatGPTなど最新技術の活用', 'Docker/Fly.io/React/TypeScript/など最新技術をカバー'],
    },
    {
      icon: 'chat' as const,
      title: 'IT人材に必要なコミュニケーション向上と指導',
      items: ['対人/書類/技術用などのタイプ別の徹底指導', '現場での指導', '実際のプロジェクトでの現場/実践/報告書作成', '一生モノのビジネスマインドの学び'],
    },
    {
      icon: 'app' as const,
      title: 'アプリ完成までを徹底サポート',
      items: ['企画/設計/開発までをカバー', '自分のアイデアを形にできるまで伴走するシステム、規定でサポート', 'ポートフォリオを応援', '作って終わりじゃない！実践性を人事に伝えることもフォロー'],
    },
    {
      icon: 'goal' as const,
      title: '個々に合わせたゴールまでの戦略立案',
      items: ['完全希望制などの画一的な方法ではなく個々の目標に合わせた立案', 'スキルアップ課題を見出すリカバリー', '卒業後のビジョンまで伴走'],
    },
    {
      icon: 'community' as const,
      title: '学び続けられる環境・仕組み',
      items: ['仕事や家庭と両立しながら通める柔軟な仕組み', '少数制や専任講師で徹底的な学習', 'Zoomやチャットで随時質問に答える体制', '同じ志を持った仲間や卒業生と繋がれるコミュニティ'],
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
