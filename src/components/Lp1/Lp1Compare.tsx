type CompareRow = {
  head: React.ReactNode;
  siid: React.ReactNode;
  general: React.ReactNode;
  career: React.ReactNode;
};

const rows: CompareRow[] = [
  {
    head: '受講期間',
    siid: (
      <>
        12ヶ月＋<br />アフターサポート
      </>
    ),
    general: '3~6ヶ月',
    career: '6~9ヶ月',
  },
  { head: '給付金', siid: 'リスキル最大80%', general: 'なし', career: '最大70%' },
  {
    head: (
      <>
        カリキュラム<br />利用期間
      </>
    ),
    siid: '無期限',
    general: '在籍中のみ',
    career: '在籍中のみ',
  },
  { head: '転職支援', siid: '無制限', general: 'なし', career: 'あり' },
  { head: 'ポートフォリオ作成', siid: 'あり', general: 'なし', career: 'あり' },
  {
    head: '質問・相談',
    siid: 'Zoom 週7回（毎日21:00〜23:00）／チャット無制限',
    general: 'チャットのみ',
    career: 'Zoom 週1回／チャット無制限',
  },
  { head: '1on1個別相談', siid: '無制限', general: 'なし', career: '制限あり' },
  {
    head: '講師属性',
    siid: (
      <>
        現役エンジニア＋<br />人事部長・社長経験者
      </>
    ),
    general: '卒業生メンター',
    career: '現役エンジニア',
  },
];

export default function Lp1Compare() {
  return (
    <section className="compare sec">
      <div className="sec-head">
        <div className="en">COMPARISON</div>
        <h2><span className="brand">SiiD</span>と他スクールの<br />徹底比較</h2>
      </div>
      <div className="table-wrap">
        <table className="ctable">
          <thead>
            <tr>
              <th className="rowhead"></th>
              <th className="siid-h">SiiD</th>
              <th>一般的な<br />プログラミングスクール</th>
              <th>転職特化型<br />スクール</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="rowhead">{row.head}</td>
                <td className="siid-c">{row.siid}</td>
                <td>{row.general}</td>
                <td>{row.career}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
