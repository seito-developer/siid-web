import Image from 'next/image';

import styles from './SubSupporterCard.module.css';

type SubSupporterCardProps = {
  id: string;
  name: string;
  englishName: string;
  role: string;
  avatarUrl: string;
};

export default function SubSupporterCard({ id, name, englishName, role, avatarUrl }: SubSupporterCardProps) {
  return (
    <div className={styles.SubSupporterCard}>
      <div className={styles.SubSupporterCard__Header}>
        <div className={styles.SubSupporterCard__BadgeContainer}>
          <div className={styles.SubSupporterCard__Badge}>
            <div className={styles.SubSupporterCard__BadgeLabel}>サポート講師</div>
            <div className={styles.SubSupporterCard__BadgeNumber}>{id}</div>
          </div>
          <div className={styles.SubSupporterCard__EnglishName}>{englishName}</div>
        </div>

        <Image src={avatarUrl} alt="" width={576} height={663} className={styles.SubSupporterCard__Avatar} />
      </div>

      <div className={styles.SubSupporterCard__NameContainer}>
        <h3 className={styles.SubSupporterCard__Name}>
          <span className={styles.SubSupporterCard__NameRole}>{role}</span>
          <span className={styles.SubSupporterCard__NameText}>{name}</span>
        </h3>
      </div>
    </div>
  );
}
