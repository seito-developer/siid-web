import Image from 'next/image';

// PC / SP のヒーローは旧LPと同様に両方レンダリングし、CSS(min-width:750px)で出し分ける。
export default function Lp1Hero() {
  return (
    <>
      <div className="hero">
        <div className="hero-card">
          <Image
            className="hero-image"
            src="/siid/images/lp-1/hero.webp"
            width={1280}
            height={684}
            priority
            fetchPriority="high"
            alt="上位1%の次世代型AI人材へ。AIプログラミングスクールSiiD / 目標達成率88% / 受講生満足度92% / 給付金制度で受講料の最大80%が給付対象"
          />
          <a href="#cta" className="hero-cta hero-cta-pc">
            <span className="hero-cta-text">無料カウンセリングを予約する</span>
            <span className="hero-cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="hero-sp">
        <div className="hero-sp-main">
          <div className="hero-sp-title">
            <Image
              src="/siid/images/lp-1/hero-sp-title.svg"
              width={379}
              height={155}
              priority
              alt="上位1%の次世代型AI人材へ。AIプログラミングスクールSiiD"
            />
          </div>
          <a href="#cta" className="hero-cta hero-cta-sp">
            <span className="hero-cta-text">無料カウンセリングを予約</span>
            <span className="hero-cta-arrow" aria-hidden="true">→</span>
          </a>
          <figure className="hero-sp-works">
            <div className="hero-sp-budge" />
            <div className="hero-sp-reskill">
              <Image
                src="/siid/images/lp-1/benefits.webp"
                width={337}
                height={406}
                priority
                fetchPriority="high"
                alt="給付金制度で受講料の最大80%が給付対象"
              />
            </div>
          </figure>
        </div>

        <Image
          className="hero-sp-logo"
          src="/siid/images/lp-1/logo-hero.webp"
          width={360}
          height={90}
          alt="SiiDロゴ"
        />
      </div>
    </>
  );
}
