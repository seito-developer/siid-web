import Image from 'next/image';

export default function Lp1Nav() {
  return (
    <header className="nav">
      <div className="logo">
        <Image src="/images/lp-1/siid-logo.svg" alt="SiiD" width={469} height={117} />
      </div>
      <div className="nav-right">
        <nav className="nav-links">
          <a href="#about"><span className="en">01 Message</span>SiiDとは</a>
          <a href="#reason"><span className="en">02 Reason</span>選ばれる理由</a>
          <a href="#plan"><span className="en">03 Course</span>コース</a>
          <a href="#voice"><span className="en">04 Voice</span>受講生の声</a>
          <a href="#faq"><span className="en">05 FAQ</span>よくある質問</a>
        </nav>
        <a href="#cta" className="nav-pill">無料カウンセリングを予約する</a>
      </div>
    </header>
  );
}
