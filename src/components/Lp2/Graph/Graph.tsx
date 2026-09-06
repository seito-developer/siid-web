import { LP2_COURSE_TABLE } from '@/constants/lp2CourseTable';

import SectionBg from '../SectionBg/SectionBg';

import styles from './Graph.module.css';

// コース比較表(docs/spec/lp2-sections/12-graph.md と 12-graph.notes.md)。
//
// カンプ上は「表」という 1 枚のスマートオブジェクトに統合されていてテキストを
// 取り出せないため、書き出した画像から内容を書き起こしてある。
// 実装では画像を貼らず <table> として組む。

export default function Graph() {
  const { head, rows } = LP2_COURSE_TABLE;

  return (
    <section className={styles.Graph} id="graph">
      <SectionBg
        name="graph"
        pcWidth={1440}
        pcHeight={1374}
        spWidth={750}
        spHeight={1725}
      />

      <div className={styles.Graph__Inner}>
        {/* カンプにこのセクションの見出しは無いが、見出しの無い section は
            アウトライン上たどれないため、視覚的に隠した h2 を置く */}
        <h2 className={styles.Graph__SrOnly}>コース比較表</h2>

        {/* SP は表がはみ出すため横スクロールさせる(カンプにも「＋scroll」の指示がある) */}
        <p className={styles.Graph__ScrollHint} aria-hidden="true">
          ＋scroll
        </p>

        <div className={styles.Graph__TableWrap}>
          <table className={styles.Graph__Table}>
            <thead>
              <tr>
                {head.map((label, i) => (
                  <th
                    key={label}
                    scope="col"
                    className={i === 2 ? styles.isFeatured : undefined}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, i) => (
                    <td key={`${row.label}-${head[i + 1]}`} className={i === 1 ? styles.isFeatured : undefined}>
                      {value === '◎' || value === '◯' || value === '—' ? (
                        <>
                          <span aria-hidden="true">{value}</span>
                          <span className={styles.Graph__SrOnly}>
                            {value === '—' ? '対象外' : '対応'}
                          </span>
                        </>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.Graph__Note}>
          ※税込。分割手数料別途。給付には所定条件があり、適用可否は無料相談でご案内します。
        </p>
      </div>
    </section>
  );
}
