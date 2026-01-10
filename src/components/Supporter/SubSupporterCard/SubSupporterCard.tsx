import Image from 'next/image';

import styles from './SubSupporterCard.module.css';

type SubSupporterCardProps = {
  id: string;
  name: string;
  englishName: string;
  role: string;
  avatarUrl: string;
  socialLinks: {
    x?: string;
    github?: string;
    youtube?: string;
    tiktok?: string;
    instagram?: string;
    note?: string;
  };
};

export default function SubSupporterCard({ id, name, englishName, role, avatarUrl, socialLinks }: SubSupporterCardProps) {
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

        <Image src={avatarUrl} alt={name} width={120} height={148} className={styles.SubSupporterCard__Avatar} />


      </div>

      <div className={styles.SubSupporterCard__NameContainer}>
        <h3 className={styles.SubSupporterCard__Name}>
          <span className={styles.SubSupporterCard__NameRole}>{role}</span>
          <span className={styles.SubSupporterCard__NameText}>{name}</span>
        </h3>

        <div className={styles.SubSupporterCard__Social}>
          {socialLinks.x && (
            <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg width="24" height="24" className={styles.SubSupporterCard__SocialIconX}>
                <use href="#x" />
              </svg>
            </a>
          )}
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="24" height="24" className={styles.SubSupporterCard__SocialIconGithub}>
                <use href="#github" />
              </svg>
            </a>
          )}
          {socialLinks.youtube && (
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="29" height="20" className={styles.SubSupporterCard__SocialIconYoutube}>
                <use href="#youtube" />
              </svg>
            </a>
          )}
          {socialLinks.tiktok && (
            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="25" height="28" className={styles.SubSupporterCard__SocialIconTiktok}>
                <use href="#tiktok" />
              </svg>
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="30" height="30" className={styles.SubSupporterCard__SocialIconInstagram}>
                <use href="#instagram" />
              </svg>
            </a>
          )}
          {socialLinks.note && (
            <a href={socialLinks.note} target="_blank" rel="noopener noreferrer" aria-label="Note">
              <svg width="32" height="32" className={styles.SubSupporterCard__SocialIconNote}>
                <use href="#note" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
