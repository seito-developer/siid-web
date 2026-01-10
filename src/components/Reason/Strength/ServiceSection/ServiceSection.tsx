import Link from 'next/link';

import ServiceItem from './ServiceItem/ServiceItem';
import styles from './ServiceSection.module.css';

interface ServiceSectionProps {
  title: string;
  description: React.ReactNode;
  items: Array<{
    type: 'curriculum' | 'template' | 'portfolio' | 'community' | 'zoom';
    title: React.ReactNode;
  }>;
  linkHref: string;
}

export default function ServiceSection({ title, description, items, linkHref }: ServiceSectionProps) {
  return (
    <div className={styles.ServiceSection}>
      <div className={styles.ServiceSection__Header}>
        <h4 className={styles.ServiceSection__Title}>{title}</h4>
        <p className={styles.ServiceSection__Description}>{description}</p>
        <Link href={linkHref} className={styles.ServiceSection__Link}>
          <span>詳細を見る</span>
          <svg width={11} height={11} fill="none">
            <use href="#rightArrowWhite" />
          </svg>
        </Link>
      </div>

      <div className={styles.ServiceSection__Items}>
        {items.map((item, index) => (
          <ServiceItem key={index} type={item.type} title={item.title} />
        ))}
      </div>
    </div>
  );
}
