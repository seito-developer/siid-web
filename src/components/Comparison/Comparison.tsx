import Logo from '../Logo/Logo';

import styles from './Comparison.module.css';
import ComparisonTable from './ComparisonTable/ComparisonTable';

export default function Comparison() {
  return (
    <div className={styles.Comparison}>
      <div className={styles.Comparison__Container}>
        <div className={styles.Comparison__Title}>{'</ Comparison >'}</div>
        <h2 className={styles.Comparison__Heading}>
          <Logo fill="#000" />
          と他スクールとの
          <br className="br-sp" />
          比較
        </h2>

        <ComparisonTable />
      </div>
    </div>
  );
}
