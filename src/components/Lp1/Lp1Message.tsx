import Image from 'next/image';

const stats: { num: string; unit?: string; label: string; isSmall?: boolean }[] = [
  { num: '88', unit: '%', label: '目標達成率' },
  { num: '92', unit: '%', label: '受講生満足度' },
  { num: '13', unit: '万', label: 'YouTube登録者' },
  { num: '給付金◎', label: '経産省リスキル講座', isSmall: true },
];

export default function Lp1Message() {
  return (
    <section className="message" id="about">
      <div className="sec-head is-long is-white">
        <div className="en">MESSAGE</div>
        <h2 style={{ color: '#fff' }}>
          <strong className="strong">
            現役エンジニアと<br className="sp-br" />元人事部長の講師が<br className="sp-br" />直接指導！
          </strong>
          <br />
          最速でAI/ITエンジニアへ<br className="sp-br" />あなたを転職させます
        </h2>
      </div>

      <div className="stats-strip">
        {stats.map((stat) => (
          <div key={stat.label} className="stat">
            <div className={stat.isSmall ? 'num num-sm' : 'num'}>
              {stat.num}
              {stat.unit && <span className="unit">{stat.unit}</span>}
            </div>
            <div className="label">{stat.label}</div>
          </div>
        ))}
      </div>

      <figure className="founder-quote">
        <Image
          className="founder-photo"
          src="/images/lp-1/seito.webp"
          width={154}
          height={154}
          alt="主任講師 堀口セイト"
        />
        <blockquote className="founder-text">
          <p>
            「技術の学習だけでは転職市場で通用しません。
            <br />
            企業は皆さんの経歴、コミュ力、ポテンシャルなど、総合力を見て採用を判断するからです。
            <br />
            <br />
            だから私たちは、<em>採用側の目線</em>で受講生様を<em>企業が求める人材へと</em>総合プロデュースします。」
          </p>
          <figcaption>
            — 主任講師 / 堀口セイト
            <a href="#mentor" className="founder-link">詳しいプロフィール →</a>
          </figcaption>
        </blockquote>
      </figure>

      <div className="message-big">
        <strong className="strong">
          未経験からの学習<br className="sp-br" />／エンジニア転職<br className="sp-br" />／ポートフォリオ作成
        </strong>
        <br className="sp-br" />
        を全力支援します
      </div>
    </section>
  );
}
