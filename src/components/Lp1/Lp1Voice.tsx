import Image from 'next/image';

import Lp1SectionCta from './Lp1SectionCta';

const voices: { src: string; alt: string; caption: string }[] = [
  {
    src: '/images/lp-1/works/thumb-iryu.webp',
    alt: 'Iryuさん（文系大学生）新卒でメガベンチャー内定',
    caption: '10代男性・文系大学生 → 新卒でメガベンチャー内定！',
  },
  {
    src: '/images/lp-1/works/thumb-sho.webp',
    alt: 'ショウさん（公務員）データサイエンティストに転職',
    caption: '20代男性・公務員からデータサイエンティストに転職！',
  },
  {
    src: '/images/lp-1/works/thumb-maru.webp',
    alt: 'まるさん（医療従事者）Webエンジニアに内定',
    caption: '20代女性・医療系からWebエンジニアに内定！',
  },
  {
    src: '/images/lp-1/works/thumb-hachi.webp',
    alt: 'ハチさん（デザイナー）フルリモートWeb開発企業へ',
    caption: '30代女性・WebデザイナーからUI/UXデザイナーへ転職！',
  },
  {
    src: '/images/lp-1/works/thumb-ryusei.webp',
    alt: 'リュウセイさん（現役エンジニア）フリーランス転身で年収2.5倍',
    caption: '20代男性・現役エンジニアがフリーランサー転身で年収が2.5倍へ！',
  },
  {
    src: '/images/lp-1/works/thumb-shota.webp',
    alt: 'ショウタさん（介護職）Webエンジニアに転職',
    caption: '40代男性・介護職からWebエンジニアに転職！',
  },
];

export default function Lp1Voice() {
  return (
    <section className="voice sec" id="voice">
      <div className="sec-head">
        <div className="en">VOICE</div>
        <h2>受講生様の成果事例</h2>
        <p className="voice-lead">
          20〜40代の社会人の方を中心に、性別・職業問わず、未経験の方も現役エンジニアの方も支援させていただいております。（下記は実績の一部です）
        </p>
      </div>
      <div className="voice-grid">
        {voices.map((voice) => (
          <article key={voice.src} className="v-card">
            <div className="v-thumb">
              <Image src={voice.src} width={500} height={282} alt={voice.alt} />
            </div>
            <p className="v-caption">{voice.caption}</p>
          </article>
        ))}
      </div>
      <figure className="voice-others">
        <Image
          src="/images/lp-1/voices.webp"
          width={900}
          height={1362}
          alt="その他の受講生の声"
        />
        <figcaption>その他にも多くの受講生様が成果を出されています。</figcaption>
      </figure>
      <Lp1SectionCta />
    </section>
  );
}
