import Image from 'next/image';

const headingStyle: React.CSSProperties = {
  color: '#fff',
  fontWeight: 800,
  marginBottom: 8,
  fontSize: 12,
  letterSpacing: '0.1em',
};

export default function Lp1Footer() {
  return (
    <footer className="foot">
      <div className="foot-wrap">
        <div>
          <div className="logo" style={{ marginBottom: 10 }}>
            <Image src="/images/lp-1/siid-logo-w.svg" alt="SiiD" width={469} height={117} />
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: '#a8b0cc' }}>
            AIプログラミングスクール SiiD。
            <br />
            AIと現役エンジニアの伴走で、最短ルートのキャリア設計を。
          </p>
        </div>
        <div className="cols">
          <div>
            <div style={headingStyle}>SERVICE</div>
            <a href="#plan">コース一覧</a>
            <a href="#reason">選ばれる理由</a>
            <a href="#voice">受講生の声</a>
          </div>
          <div>
            <div style={headingStyle}>COMPANY</div>
            <a href="https://bug-fix.org/" target="_blank" rel="noopener noreferrer">運営会社</a>
            <a href="https://bug-fix.org/privacy-policy" target="_blank" rel="noopener noreferrer">
              プライバシーポリシー
            </a>
            <a href="https://bug-fix.org/law" target="_blank" rel="noopener noreferrer">
              特定商取引法に基づく表記
            </a>
          </div>
        </div>
        <div className="bottom" style={{ gridColumn: '1/-1' }}>
          <span>© 2026 BugFix LLC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
