import Image from 'next/image';

import Lp1SectionCta from './Lp1SectionCta';

type Reason = {
  no: string;
  image: { src: string; width: number; height: number };
  title: React.ReactNode;
  text: React.ReactNode;
};

const reasons: Reason[] = [
  {
    no: '01',
    image: { src: '/siid/images/lp-1/feature-1.webp', width: 444, height: 282 },
    title: (
      <>
        ゴールから逆算する<br /><span className="brand">必要なことだけ</span>学ぶ設計
      </>
    ),
    text: 'まず1年以内の目標を定め、そのゴールに直結する技術だけを学ぶ。「全部学ぶ」よりも、あえて捨てる勇気で最短ルートを案内します。忙しい社会人でも成果に繋がる学習設計です。',
  },
  {
    no: '02',
    image: { src: '/siid/images/lp-1/feature-3.webp', width: 444, height: 258 },
    title: (
      <>
        生成AIで最短学習！<br />独自の<span className="brand">AI先生</span>も完備
      </>
    ),
    text: 'ChatGPT・Copilot・Cursor・Codexを前提とした実践的な活用法を指導。SiiD独自開発の「AI先生」と対話しながら、書類作成やポートフォリオの仕様書を従来の4〜5倍のスピードで質高く仕上げます。',
  },
  {
    no: '03',
    image: { src: '/siid/images/lp-1/feature-2.webp', width: 888, height: 503 },
    title: (
      <>
        徹底したポートフォリオ添削と模擬面接で、万全の就活対策<br />
      </>
    ),
    text: '自己分析・企業分析・履歴書／職務経歴書／GitHub／ポートフォリオ添削・模擬面接まで一貫支援。人柄・コミュニケーション含めた「受かる人材」へと磨き上げます。',
  },
  {
    no: '04',
    image: { src: '/siid/images/lp-1/feature-4.webp', width: 444, height: 282 },
    title: (
      <>
        現役エンジニア＋<br />人事経験のある講師陣
      </>
    ),
    text: '講師には現役フルスタック／Webエンジニアが複数人在籍。主任講師は前職約100人規模の開発会社で人事や経営の経験を持つため、その視点から企業が求める人材にあなたをプロデュースします。',
  },
  {
    no: '05',
    image: { src: '/siid/images/lp-1/feature-5.webp', width: 627, height: 335 },
    title: (
      <>
        チャットで24h質問＋<br />毎日のZoom相談・交流室
      </>
    ),
    text: (
      <>
        チャットでの質問は24時間・無制限。 さらに毎日21:00〜23:00はZoom相談ルームを常時開放。<br />
        言語化しづらい悩みもその場で解決できるほか、講師や他の受講生様たちと交流できる時間も設けています。
      </>
    ),
  },
  {
    no: '06',
    image: { src: '/siid/images/lp-1/feature-6.webp', width: 295, height: 195 },
    title: (
      <>
        卒業後も参加可能！<br />イベントも豊富な永久コミュニティ
      </>
    ),
    text: (
      <>
        SiiDは卒業生との交流も盛んです。<br />
        カリキュラムの閲覧、オフ会などのイベント、チャット等、多くのサービスが卒業後も利用可能！<br />
        困ったときにいつでも頼れる仲間と講師がいる環境を提供します。
      </>
    ),
  },
];

export default function Lp1Reasons() {
  return (
    <section className="reasons sec" id="reason">
      <div className="sec-head">
        <div className="en">REASON</div>
        <h2><span className="brand">SiiD</span>が<br />選ばれる6つの理由</h2>
      </div>
      <div className="reason-grid">
        {reasons.map((reason) => (
          <article key={reason.no} className="r-card">
            <div className="no">{reason.no}</div>
            <div className="visual">
              <Image
                src={reason.image.src}
                width={reason.image.width}
                height={reason.image.height}
                alt=""
              />
            </div>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </article>
        ))}
      </div>
      <Lp1SectionCta />
    </section>
  );
}
