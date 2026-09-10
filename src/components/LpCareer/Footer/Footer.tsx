import Image from 'next/image';

import { LP_CAREER_LOGO_WHITE } from '@/constants/lpCareerAssets';

import styles from './Footer.module.css';

// カンプにフッターが存在しないため新規に設計した(docs/spec/07_lp-career-renewal.md §10)。
// 運営会社・プライバシーポリシー・特商法の表記が無いページは公開ページとして
// 不適切であり、広告審査でも問題になり得る。
// LP は 1 ページ完結のためサイト内リンクは置かず、法的表記のみの最小構成とする。

const LINKS = [
  { label: '運営会社', href: 'https://bug-fix.org/' },
  { label: 'プライバシーポリシー', href: 'https://bug-fix.org/privacy-policy' },
  { label: '特定商取引法に基づく表記', href: 'https://bug-fix.org/law' },
];

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__Inner}>
        <Image
          className={styles.Footer__Logo}
          src={LP_CAREER_LOGO_WHITE}
          alt="SiiD"
          width={469}
          height={117}
        />
        <p className={styles.Footer__Lead}>
          ITエンジニア転職 × 生成AI特化のプログラミングスクール
        </p>
        <ul className={styles.Footer__Links}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <small className={styles.Footer__Copyright}>© 2026 BugFix LLC. All rights reserved.</small>
      </div>
    </footer>
  );
}
