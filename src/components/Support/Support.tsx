import SupportList from '@/components/SupportList/SupportList';

import styles from './Support.module.css';

export default function Support() {
  return (
    <div className={styles.Support}>
      <div className={styles.Support__Container}>
        <div className={styles.Support__HeadingContainer}>
          <div className={styles.Support__Title}>{'</ Support >'}</div>
          <h2 className={styles.Support__Heading}>アフターサポート</h2>
          <p className={styles.Support__Description}>
            SiiDは学んで終わりではなく、その先の人生もあなたと共にありたいと考えています。
            <br />
            そのためのサポートもしっかりとご用意しています。
          </p>
        </div>
        <SupportList />
      </div>
    </div>
  );
}
