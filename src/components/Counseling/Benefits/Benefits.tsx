import styles from './Benefits.module.css';

const benefits: string[] = [
  '【Win/Mac対応】1分でわかる！プログラミング学習向けPCの選び方（PCを30%割引で買える裏技つき）',
  '【歴14年エンジニアが選ぶ】主要AIツール5選・完全解説ガイド',
  '【歴13年のエンジニアが活用する】Claude Code & Codex 裏ワザ＆プロンプト９セット',
  '【Tier表別】AI時代のプログラミング言語27選・完全解説ガイド',
  '300人の受講生データから作った「あなたのAI時代キャリア適性診断」GPTs',
  '【実例ベース】年代別・未経験からエンジニア＆AI関連職へ転職までの20〜40代ロードマップ',
  '【外資テック内定エンジニア直伝】フルスタックエンジニアへの完全ロードマップ75分特別動画講義',
];

export default function Benefits() {
  return (
    <section className={styles.Benefits} aria-labelledby="counseling-benefits-title">
      <div className={styles.Benefits__Head}>
        <p className={styles.Benefits__Lead}>無料カウンセリング参加者限定</p>
        <h2 id="counseling-benefits-title" className={styles.Benefits__Title}>
          <span className={styles.Benefits__TitleNum}>7</span>大特典をプレゼント
        </h2>
      </div>
      <ol className={styles.Benefits__List}>
        {benefits.map((benefit, index) => (
          <li key={index} className={styles.Benefits__Item}>
            <span className={styles.Benefits__ItemNum} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.Benefits__ItemText}>{benefit}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
