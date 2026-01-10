'use client';

import useIsPc from '@/hooks/useIsPc';

import Corner, { CornerPosition } from '../Corner/Corner';
import Logo from '../Logo/Logo';

import styles from './Comparison.module.css';
import ComparisonTable from './ComparisonTable/ComparisonTable';

export default function Comparison() {
  const isPc = useIsPc();
  return (
    <div className={styles.Comparison}>
      <div className={styles.Comparison__Container}>
        {!isPc && (
          <div className={styles.Comparison__Corner}>
            <Corner top="0" left="-32px" position={CornerPosition.TOP_LEFT} color="var(--background)" bgColor="#475499" />
            <Corner top="0" right="-32px" position={CornerPosition.TOP_RIGHT} color="var(--background)" bgColor="#475499" />
          </div>
        )}
        <div className={styles.Comparison__Title}>{'</ Comparison >'}</div>
        <h2 className={styles.Comparison__Heading}>
          <Logo fill="#000" />
          と他スクールとの
          {!isPc && <br />}
          比較
        </h2>

        <ComparisonTable />
      </div>
    </div>
  );
}
