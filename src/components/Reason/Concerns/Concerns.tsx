import ConcernCard from './ConcernCard/ConcernCard';
import styles from './Concerns.module.css';
import ConcernsImage from './ConcernsImage/ConcernsImage';

export default function Concerns() {
  const concerns = [
    { number: '01', title: 'マークアップやプログラミングだけで体系的に学べない' },
    { number: '02', title: 'チャットや限定的なZoomで相談・質問が気軽にできない' },
    { number: '03', title: '契約期間がきたらコミュニティへのアクセスができない' },
    { number: '04', title: '開発者や経営人材の実績がない講師ではない' },
    { number: '05', title: '情報や技術だけで就活対策ができない' },
    { number: '06', title: '一方的な情報のみでフィードバックがない' },
  ];

  return (
    <div className={styles.Concerns}>
      <h3 className={styles.Concerns__Heading}>
        <div className={styles.Concerns__HeadingIcon}>
          <svg width="97" height="111" fill="none">
            <use href="#Hexagon" />
          </svg>
          <span className={styles.Concerns__HeadingIconText}>CHECK</span>
        </div>
        <span>こんなお悩みや不安はありませんか？</span>
      </h3>

      <p className={styles.Concerns__Intro}>これらの悩みは9割の確率で挫折やモチベーションへ影響し、結局ITエンジニアになれないor非開発系の非正規の仕事に従事することになるケースを見てきました。</p>

      <div className={styles.Conserns__Image}>
        <ConcernsImage />
      </div>

      <div className={styles.Concerns__Grid}>
        {concerns.map(concern => (
          <ConcernCard key={concern.number} number={concern.number} title={concern.title} />
        ))}
      </div>
    </div>
  );
}
