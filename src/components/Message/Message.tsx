'use client';

import useIsPc from '@/hooks/useIsPc';

import Corner, { CornerPosition } from '../Corner/Corner';
import Logo from '../Logo/Logo';

import styles from './Message.module.css';
import RevealText from './RevealText';

export default function Message() {
  const isPc = useIsPc();
  return (
    <div className={styles.Message}>
      <div className={styles.Message__Container}>
        <div className={styles.Message__Logo}>
          <Logo fill="#fff" />
        </div>
        <div className={styles.Message__Corner}>
          <Corner top="16px" left="-24px" position={CornerPosition.TOP_LEFT} color="#475499" />
          <Corner top="16px" right="-24px" position={CornerPosition.TOP_RIGHT} color="#475499" />
        </div>
        <div className={styles.Message__Title}>{'</ Message >'}</div>
        <RevealText className={styles.Message__Text}>
          <Logo fill="#fff" />は{!isPc && <br />}
          プログラミング技術の
          {!isPc && <br />}
          習得を超え、{isPc && <br />}学びを実践に
          {!isPc && <br />}
          変えるための場。
          <br />
          スキルをどのように活かし、
          <br />
          次の一歩をどのように
          <br />
          踏み出すかまでを共に考える。
        </RevealText>
        <RevealText className={styles.Message__Text}>
          実践的なカリキュラムを通じて<br />コミュニケーション力や
          {!isPc && <br />}
          課題解決力といった
          <br />
          現場で求められるスキルを。
        </RevealText>
        <RevealText className={styles.Message__Text}>
          一人ひとりに合わせた
          {!isPc && <br />}
          学習設計と
          <br />
          親身なフォローアップ体制で、<br />知識を行動に変え、
          {!isPc && <br />}
          挑戦と成長の連続を支え、
          <br />
          未来に向かって進む力を育む。
        </RevealText>
        <RevealText className={styles.Message__Text}>
          <Logo fill="#fff" />
          と共に、
          <br />
          人生を切り開く
          <br />
          あなたらしい学びと
          <br />
          進み方を見つけよう。
        </RevealText>
      </div>
    </div>
  );
}
