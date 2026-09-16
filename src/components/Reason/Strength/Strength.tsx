import Logo from '@/components/Logo/Logo';

import ServiceSection from './ServiceSection/ServiceSection';
import styles from './Strength.module.css';
import StrengthList from './StrengthList/StrengthList';

export default function Strength() {
  const serviceSections = [
    {
      title: 'サービス',
      description: (
        <>
          受講中も卒業後も使える
          <br className="br-sp" />
          実践的なサービス
        </>
      ),
      linkHref: '/service',
      items: [
        { type: 'curriculum' as const, title: 'カリキュラム' },
        { type: 'template' as const, title: '黄金テンプレ' },
        {
          type: 'portfolio' as const,
          title: (
            <>
              ポートフォリオ
              <br />
              作成
            </>
          ),
        },
      ],
    },
    {
      title: 'コミュニティ',
      description: (
        <>
          切磋琢磨しあえる仲間と
          <br className="br-sp" />
          ワクワクが続く
        </>
      ),
      linkHref: '/community',
      items: [
        { type: 'community' as const, title: 'コミュニティ' },
        { type: 'zoom' as const, title: '講座・Zoom' },
      ],
    },
  ];

  return (
    <div className={styles.Strength}>
      <div className={styles.Strength__Container}>
        <div className={styles.Strength__TitleContainer}>
          <h3 className={styles.Strength__Title}>
            <div className={styles.Strength__TitleIcon}>
              <svg width="97" height="111" fill="none">
                <use href="#Hexagon" />
              </svg>
              <span className={styles.Strength__TitleIconText}>CHECK</span>
            </div>
            <span className={styles.Strength__TitleText}>
              <Logo fill="#000" />
              のここがすごい！
            </span>
          </h3>
          <p className={styles.Strength__Intro}>こうした不安を解消するために、SiiDは「学ぶ内容」「相談できる環境」「就活対策」のすべてを現役エンジニアの視点で設計しています。</p>
        </div>

        <StrengthList />

        <div className={styles.Strength__ServiceTitleContainer}>
          <h3 className={styles.Strength__ServiceTitle}>
            <div className={styles.Strength__ServiceTitleIcon}>
              <svg width="97" height="111" fill="none">
                <use href="#Hexagon" />
              </svg>
              <span className={styles.Strength__ServiceTitleIconText}>CHECK</span>
            </div>
            <span className={styles.Strength__ServiceTitleText}>充実したサービス</span>
          </h3>
          <p className={styles.Strength__ServiceIntro}>学習カリキュラムや添削などのサービスと、卒業後も続くコミュニティの両輪で、学びを転職とキャリアの成果につなげます。</p>

          <div className={styles.Strength__ServiceSections}>
            {serviceSections.map((section, index) => (
              <ServiceSection key={index} title={section.title} description={section.description} items={section.items} linkHref={section.linkHref} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
