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
          他に劣らないひとつ上の
          <br className="br-sp" />
          クオリティを実現
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
            <div className={styles.Strength__TitleIcon}>CHECK</div>
            <span className={styles.Strength__TitleText}>
              <Logo fill="#000" />
              のここがすごい！
            </span>
          </h3>
          <p className={styles.Strength__Intro}>これらの悩みは9割の確率で挫折やモチベーションへ影響し、結局ITエンジニアになれないor非開発系の非正規の仕事に従事することになるケースを見てきました。</p>
        </div>

        <StrengthList />

        <div className={styles.Strength__ServiceTitleContainer}>
          <h3 className={styles.Strength__ServiceTitle}>
            <div className={styles.Strength__ServiceTitleIcon}>CHECK</div>
            <span className={styles.Strength__ServiceTitleText}>充実したサービス</span>
          </h3>
          <p className={styles.Strength__ServiceIntro}>これらの悩みは9割の確率で挫折やモチベーションへ影響し、結局ITエンジニアになれないor非開発系の非正規の仕事に従事することになるケースを見てきました。</p>

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
