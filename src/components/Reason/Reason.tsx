'use client';

// import useIsPc from '@/hooks/useIsPc';

// import Corner, { CornerPosition } from '../Corner/Corner';
import Logo from '../Logo/Logo';

import Concerns from './Concerns/Concerns';
import styles from './Reason.module.css';
import Strength from './Strength/Strength';

export default function Reason() {
  // const isPc = useIsPc();
  return (
    <div className={styles.Reason}>
      <div className={styles.Reason__HeadingContainer}>
        <div className={styles.Reason__HeadingInner}>
          <div className={styles.Reason__Title}>{'</ Reason >'}</div>
          <h2 className={styles.Reason__Heading}>
            <Logo fill="#000" />
            が選ばれる理由
          </h2>
          <div className={styles.Reason__Concerns}>
            <Concerns />
          </div>
        </div>
      </div>
      <div className={styles.Reason__Strength}>
        <Strength />
      </div>
    </div>
  );
}
