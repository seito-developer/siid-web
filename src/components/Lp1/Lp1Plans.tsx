import Lp1SectionCta from './Lp1SectionCta';

export default function Lp1Plans() {
  return (
    <section className="plans sec" id="plan">
      <div className="sec-head">
        <div className="en">COURSE</div>
        <h2>目的別に選べる<br />3つのプラン</h2>
      </div>
      <div className="plan-grid">
        <div className="plan">
          <span className="badge">CAREER</span>
          <h3>Career</h3>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 8px' }}>
            まずは転職に挑戦したい方向け
          </p>

          <div className="price-stack">
            <div className="price-monthly">
              <span className="lead">月々</span>
              <span>22,000</span><span className="yen">円</span><span className="tilde">〜</span>
              <span className="tax">（税込）</span>
            </div>
            <p className="price-note">
              ※ 24回分割の場合の参考額。<br />
              ご利用のクレジットカード会社所定の分割手数料が別途発生し、実際の月々お支払額・回数はカード会社の規定に準じます。
            </p>

            <div className="price-benefit">
              <div className="price-bulk">
                <span className="non-benefit-label">▼ 一括払い</span>
                <b>528,000円</b>（税込）
              </div>
              <span className="benefit-label">▼ Reスキル給付金利用で最大80%が給付</span>
              <span className="benefit-amount">
                実質 110,000<span className="yen">円</span><span className="tilde">〜</span>
                <span className="tax">（税込）</span>
              </span>
            </div>
          </div>

          <ul>
            <li>学習期間：12ヶ月</li>
            <li>Discord / Zoom質問・相談</li>
            <li>オフ会・オンラインイベント</li>
            <li>書類添削・模擬面接・ポートフォリオ添削（各工程2回まで）</li>
            <li>SiiD Passport（求人紹介）</li>
            <li style={{ opacity: 0.5 }}>
              個別1on1コンサル ／ アフターサポート ／ SiiD Quest はなし
            </li>
          </ul>
        </div>

        <div
          className="plan"
          style={{ borderColor: 'var(--navy)', boxShadow: '5px 5px 0 var(--navy)' }}
        >
          <span className="badge" style={{ background: 'var(--orange)', color: 'var(--ink-2)' }}>
            オススメ
          </span>
          <h3>Career + FullSupport</h3>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 8px' }}>
            本気で転職・キャリアアップを目指す方向け
          </p>

          <div className="price-stack">
            <div className="price-monthly">
              <span className="lead">月々</span>
              <span>29,083</span><span className="yen">円</span><span className="tilde">〜</span>
              <span className="tax">（税込）</span>
            </div>
            <p className="price-note">
              ※ 24回分割の場合の参考額。<br />
              ご利用のクレジットカード会社所定の分割手数料が別途発生し、実際の月々お支払額・回数はカード会社の規定に準じます。
            </p>
            <div className="price-benefit">
              <div className="price-bulk">
                <span className="non-benefit-label">▼ 一括払い</span>
                <b>698,000円</b>（税込）
              </div>
              <span className="benefit-label">▼ 給付金制度活用で 最大80%が給付対象</span>
              <span className="benefit-amount">
                実質 ¥258,600<span className="yen">円</span><span className="tilde">〜</span>
                <span className="tax">（税込）</span>
              </span>
            </div>
          </div>

          <ul>
            <li>学習期間：12ヶ月</li>
            <li>書類添削・模擬面接・ポートフォリオ添削：<b>無制限</b></li>
            <li>カリキュラム：無制限</li>
            <li>Python・TypeScript・React・Next.js まで学習可能</li>
            <li>個別1on1コンサル</li>
            <li>実案件の疑似体験／求人の紹介</li>
            <li>アフターサポート（転職成功まで・最長＋2年）</li>
          </ul>
        </div>

        <div className="plan">
          <span className="badge">VIP</span>
          <h3>Career + VIP</h3>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 8px' }}>
            個人・企業様向けに幅広い内容をサポート。
          </p>
          <div className="price price-vip">お問い合わせください</div>
          <ul>
            <li>
              Career + FullSupportと同様の内容に加え、目的に応じて個別に学習内容をご相談いただけます。
            </li>
            <li>集団受講・企業研修◎</li>
          </ul>
        </div>
      </div>
      <p
        style={{
          maxWidth: 920,
          margin: '24px auto 0',
          fontSize: 11,
          color: 'var(--muted)',
          lineHeight: 1.7,
        }}
      >
        ※
        表示価格はすべて税込です。「月々」金額は本体価格を24回で按分した参考額であり、ご利用のクレジットカード会社所定の分割手数料が別途発生します。実際の月々お支払額・回数はカード会社の規定に準じます。
        <br />
        ※
        Careerコース（12ヶ月プラン）は、経済産業省「第四次産業革命スキル習得講座（リスキル講座）」の認定講座です。給付金制度のご活用により、受講料の最大80%が給付対象となります（実質還付）。詳しい適用条件は無料カウンセリングにてご案内します。
      </p>
      <Lp1SectionCta />
    </section>
  );
}
