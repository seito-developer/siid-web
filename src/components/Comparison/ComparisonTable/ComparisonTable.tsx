import Logo from '../../Logo/Logo';

import styles from './ComparisonTable.module.css';

export default function ComparisonTable() {
  return (
    <>
      <div className={styles.ComparisonTable__Container}>
        <div className={styles.ComparisonTable}>
          {/* ヘッダー行 - セル1 */}
          <div className={styles.ComparisonTable__HeaderCell}></div>
          {/* ヘッダー行 - セル2 (強調) */}
          <div className={`${styles.ComparisonTable__HeaderCell} ${styles.ComparisonTable__HeaderCell_Highlight}`}>
            <div className={styles.ComparisonTable__Logo}>
              <Logo fill="#000" />
            </div>
          </div>
          {/* ヘッダー行 - セル3 */}
          <div className={styles.ComparisonTable__HeaderCell}>他社A</div>
          {/* ヘッダー行 - セル4 */}
          <div className={styles.ComparisonTable__HeaderCell}>他社B</div>
          {/* ヘッダー行 - セル5 */}
          <div className={styles.ComparisonTable__HeaderCell}>他社C</div>

          {/* 1ヶ月あたりの受講費用 - ラベル */}
          <div className={styles.ComparisonTable__Label}>
            1ヶ月
            <br className="br-sp" />
            あたりの
            <br className="br-sp" />
            受講費用
          </div>
          {/* 1ヶ月あたりの受講費用 - SiiD */}
          <div className={`${styles.ComparisonTable__Cell} ${styles.ComparisonTable__Cell_Highlight}`}>
            <div className={styles.ComparisonTable__Price}>
              <span className={styles.ComparisonTable__PriceNumber}>1</span>
              <span className={styles.ComparisonTable__PriceUnit}>万円〜/月</span>
            </div>
            <div className={styles.ComparisonTable__Description}>
              何故こんなに安いのかを言及する
              <br className="br-sp" />
              ひとこと
            </div>
          </div>
          {/* 1ヶ月あたりの受講費用 - 他社A */}
          <div className={styles.ComparisonTable__Cell}>
            <div className={styles.ComparisonTable__Price}>
              <span className={styles.ComparisonTable__PriceNumber}>22</span>
              <span className={styles.ComparisonTable__PriceUnit}>万円〜/月</span>
            </div>
            <span className={`${styles.ComparisonTable__StarBottom}`}>
              <svg width="14" height="7" fill="none">
                <use href="#StarBottom" />
              </svg>
            </span>
          </div>
          {/* 1ヶ月あたりの受講費用 - 他社B */}
          <div className={styles.ComparisonTable__Cell}>
            <div className={styles.ComparisonTable__Price}>
              <span className={styles.ComparisonTable__PriceNumber}>5</span>
              <span className={styles.ComparisonTable__PriceUnit}>万円〜/月</span>
            </div>
            <span className={`${styles.ComparisonTable__StarBottom}`}>
              <svg width="14" height="7" fill="none">
                <use href="#StarBottom" />
              </svg>
            </span>
          </div>
          {/* 1ヶ月あたりの受講費用 - 他社C */}
          <div className={styles.ComparisonTable__Cell}>
            <div className={styles.ComparisonTable__Price}>
              <span className={styles.ComparisonTable__PriceNumber}>12</span>
              <span className={styles.ComparisonTable__PriceUnit}>万円〜/月</span>
            </div>
          </div>

          {/* 受講完了までの所要時間 - ラベル */}
          <div className={styles.ComparisonTable__Label}>
            受講完了
            <br className="br-sp" />
            までの
            <br className="br-sp" />
            所要時間
          </div>
          {/* 受講完了までの所要時間 - SiiD */}
          <div className={`${styles.ComparisonTable__Cell} ${styles.ComparisonTable__Cell_Highlight}`}>
            <div className={styles.ComparisonTable__Period}>
              <div className={styles.ComparisonTable__PeriodTitle}>個々にパーソナライズ</div>
              <div className={styles.ComparisonTable__PeriodDetail}>12ヶ月＋アフターサポート</div>
            </div>
          </div>
          {/* 受講完了までの所要時間 - 他社A */}
          <div className={styles.ComparisonTable__Cell}>
            <div className={styles.ComparisonTable__Period}>
              <div className={styles.ComparisonTable__PeriodTitle}>スピード型</div>
              <div className={styles.ComparisonTable__PeriodDetail}>最短2ヶ月〜4ヶ月</div>
            </div>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* 受講完了までの所要時間 - 他社B */}
          <div className={styles.ComparisonTable__Cell}>
            <div className={styles.ComparisonTable__Period}>
              <div className={styles.ComparisonTable__PeriodTitle}>スピード型</div>
              <div className={styles.ComparisonTable__PeriodDetail}>最短5ヶ月〜9ヶ月</div>
            </div>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* 受講完了までの所要時間 - 他社C */}
          <div className={styles.ComparisonTable__Cell}>
            <div className={styles.ComparisonTable__Period}>
              <div className={styles.ComparisonTable__PeriodTitle}>スピード型</div>
              <div className={styles.ComparisonTable__PeriodDetail}>最短3ヶ月〜4ヶ月</div>
            </div>
            <span className={`${styles.ComparisonTable__StarLeft}`}>
              <svg width="7" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#StarLeft" />
              </svg>
            </span>
          </div>

          {/* リスキル応援給付金 - ラベル */}
          <div className={styles.ComparisonTable__Label}>
            リスキル
            <br className="br-sp" />
            応援給付金
          </div>
          {/* リスキル応援給付金 - SiiD */}
          <div className={`${styles.ComparisonTable__Cell} ${styles.ComparisonTable__Cell_Highlight}`}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#475499' }}>
                <use href="#Circle" />
              </svg>
            </span>
          </div>
          {/* リスキル応援給付金 - 他社A */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Cross}`}>
              <svg width="22" height="22" fill="none" style={{ color: '#000' }}>
                <use href="#Cross" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* リスキル応援給付金 - 他社B */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* リスキル応援給付金 - 他社C */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Triangle}`}>
              <svg width="24" height="21" fill="none" style={{ color: '#000' }}>
                <use href="#Triangle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__StarLeft}`}>
              <svg width="7" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#StarLeft" />
              </svg>
            </span>
          </div>

          {/* 講師の質 - ラベル */}
          <div className={styles.ComparisonTable__Label}>講師の質</div>
          {/* 講師の質 - SiiD */}
          <div className={`${styles.ComparisonTable__Cell} ${styles.ComparisonTable__Cell_Highlight}`}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_DoubleCircle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#475499' }}>
                <use href="#DoubleCircle" />
              </svg>
            </span>
          </div>
          {/* 講師の質 - 他社A */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* 講師の質 - 他社B */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* 講師の質 - 他社C */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__StarLeft}`}>
              <svg width="7" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#StarLeft" />
              </svg>
            </span>
          </div>

          {/* カリキュラムの質 - ラベル */}
          <div className={styles.ComparisonTable__Label}>
            カリキュラム
            <br className="br-sp" />
            の質
          </div>
          {/* カリキュラムの質 - SiiD */}
          <div className={`${styles.ComparisonTable__Cell} ${styles.ComparisonTable__Cell_Highlight}`}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_DoubleCircle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#475499' }}>
                <use href="#DoubleCircle" />
              </svg>
            </span>
          </div>
          {/* カリキュラムの質 - 他社A */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* カリキュラムの質 - 他社B */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* カリキュラムの質 - 他社C */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__StarLeft}`}>
              <svg width="7" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#StarLeft" />
              </svg>
            </span>
          </div>

          {/* アフターサポート - ラベル */}
          <div className={styles.ComparisonTable__Label}>
            アフター
            <br className="br-sp" />
            サポート
          </div>
          {/* アフターサポート - SiiD */}
          <div className={`${styles.ComparisonTable__Cell} ${styles.ComparisonTable__Cell_Highlight}`}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_DoubleCircle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#475499' }}>
                <use href="#DoubleCircle" />
              </svg>
            </span>
          </div>
          {/* アフターサポート - 他社A */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* アフターサポート - 他社B */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
          </div>
          {/* アフターサポート - 他社C */}
          <div className={styles.ComparisonTable__Cell}>
            <span className={`${styles.ComparisonTable__Mark} ${styles.ComparisonTable__Mark_Circle}`}>
              <svg width="20" height="20" fill="none" style={{ color: '#342525' }}>
                <use href="#Circle" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__StarLeft}`}>
              <svg width="7" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#StarLeft" />
              </svg>
            </span>
          </div>

          {/* 比較ポイント - ラベル */}
          <div className={styles.ComparisonTable__Label}>比較ポイント</div>
          {/* 比較ポイント - SiiD */}
          <div className={`${styles.ComparisonTable__Cell} ${styles.ComparisonTable__Cell_Highlight}`}>
            <ul className={styles.ComparisonTable__List}>
              <li>厳選された現役エンジニア講師が少人数にきめ細かく対応</li>
              <li>最新技術（ChatGPT等）の活用＋ゼミ形式で実践的に学習</li>
              <li>セイトによる無制限の個別コンサル</li>
              <li>無制限の永久コミュニティ質問サポート</li>
              <li>半永久更新型コンテンツの利用が可能</li>
            </ul>
          </div>
          {/* 比較ポイント - 他社A */}
          <div className={styles.ComparisonTable__Cell}>
            <ul className={styles.ComparisonTable__List}>
              <li>専属マンツーマン指導で実務経験豊富な講師が対応</li>
              <li>完全オーダーメイド型で個別の目標に沿ったカリキュラム</li>
            </ul>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__StarTop}`}>
              <svg width="14" height="7" fill="none" style={{ color: '#342525' }}>
                <use href="#StarTop" />
              </svg>
            </span>
          </div>
          {/* 比較ポイント - 他社B */}
          <div className={styles.ComparisonTable__Cell}>
            <ul className={styles.ComparisonTable__List}>
              <li>約1,000時間の実践的カリキュラムで現場対応力を養成</li>
              <li>就職率90%以上の実績と無期限のサポート体制</li>
            </ul>
            <span className={`${styles.ComparisonTable__Star} ${styles.ComparisonTable__Mark_Star}`}>
              <svg width="14" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#Star" />
              </svg>
            </span>
            <span className={`${styles.ComparisonTable__StarTop}`}>
              <svg width="14" height="7" fill="none" style={{ color: '#342525' }}>
                <use href="#StarTop" />
              </svg>
            </span>
          </div>
          {/* 比較ポイント - 他社C */}
          <div className={styles.ComparisonTable__Cell}>
            <ul className={styles.ComparisonTable__List}>
              <li>多彩なコースで最新トレンド講座も充実</li>
              <li>現役エンジニアを中心に対面・オンラインでの手厚いサポート</li>
            </ul>
            <span className={`${styles.ComparisonTable__StarLeft}`}>
              <svg width="7" height="14" fill="none" style={{ color: '#342525' }}>
                <use href="#StarLeft" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <p className={styles.ComparisonTable__Note}>
        ※【フォローアップ調査のお願い】
        <br />
        卒業して1年後を目処に、卒業生の皆様にはSiiDプログラム向上の目的で、フォローアップ調査のお願いをする可能性がございます。（習得したスキルの実事業での活用状況、勤務先での処遇の変化があったか、など）調査へのご協力はあくまで任意です。
      </p>
    </>
  );
}
