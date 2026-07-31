import SupportItem from '../SupportItem/SupportItem';

import styles from './SupportList.module.css';

const SUPPORTS = [
  {
    id: 1,
    number: 1,
    title: '半永久更新型コンテンツ',
    description: (
      <>
        買い切り型のカリキュラムにも関わらず<span className={styles.SupportList__Highlight}>受講後も永久アクセス可能・随時更新。</span>新規コンテンツはもちろん、古い情報はアップデートしていきます！
      </>
    ),
    image: '/siid/images/service/support/supportlist/supportitem/support-1.png',
  },
  {
    id: 2,
    number: 2,
    title: 'ずっと使える相談ルーム',
    description: (
      <>
        24時間サポートOKのチャットサポートに加え、毎週５日間「SiiD」の講師陣が1日2時間Zoomミーティングを開きそこで受講生さんの質問にフランクに答える仕組みがあります。卒業生も使える＝エンジニアの先生に質問し放題の環境をご用意しています
      </>
    ),
    image: '/siid/images/service/support/supportlist/supportitem/support-2.png',
  },
  {
    id: 3,
    number: 3,
    title: 'セイトによる無制限の個別コンサル',
    description: (
      <>
        受講生の転職が成功するまでサポートを実施。とことん最後までサポートし結果にコミットする。セイトが覚悟を持ったアフターサポートになります。
      </>
    ),
    image: '/siid/images/service/support/supportlist/supportitem/support-3.png',
  },
  {
    id: 4,
    number: 4,
    title: '永久コミュニティ',
    description: (
      <>
        月に1度オンラインで定期イベントを行っています。また不定期でオフ会も。イベントでは卒業生や外部の現役エンジニアさんをお招きして対談したり、交流会を行っています。卒業後も活用できるので、ぜひ横のつながりを作ってください！
      </>
    ),
    image: '/siid/images/service/support/supportlist/supportitem/support-4.png',
  },
  {
    id: 5,
    number: 5,
    title: '続・SiiD Passport',
    description: (
      <>
        希望者にのみ求人を紹介するサポートを行っています。<br />パートナー会社である株式会社GIGとの提携により、Web業界のエンジニア求人を中心に面談・ご相談の上求人をご提案します。現役で受講されている方も卒業生も使えるサービスとなっていますので、ぜひ選択肢を広げるためにお使いください◎
      </>
    ),
    image: '/siid/images/service/support/supportlist/supportitem/support-5.png',
  },
];

export default function SupportList() {
  return (
    <ul className={styles.SupportList}>
      {SUPPORTS.map(support => (
        <SupportItem key={support.id} number={support.number} title={support.title} description={support.description} image={support.image} />
      ))}
    </ul>
  );
}
