import Image from 'next/image';

import styles from './ContentBlock.module.css';

type Props = {
  description: string;
  alt?: string;
  iconPath?: string;
  title?: string;
  subTitle?: string;
};

export default function ContentBlock({
  description,
  iconPath,
  alt,
  title,
  subTitle,
}: Props) {
  const hasIcon = Boolean(iconPath);
  const hasTitle = Boolean(title);

  return (
    <div className={styles.ContentBlock}>
      {hasTitle ? (
        <div className={styles.ContentBlock__TitleArea}>
          <h3 className={styles.ContentBlock__Title}>{title}</h3>
          {subTitle && <p className={styles.ContentBlock__SubTitle}>{subTitle}</p>}
        </div>
      ) : hasIcon ? (
        <Image
          src={iconPath ?? ''}
          alt={alt ?? ''}
          width={64}
          height={64}
          className={styles.ContentBlock__ServiceIcon}
        />
      ) : null}
      <div className={styles.ContentBlock__Balloon}>{description}</div>
    </div>
  );
}
