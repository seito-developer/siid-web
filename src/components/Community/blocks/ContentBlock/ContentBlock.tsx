import styles from './ContentBlock.module.css';

type Props = {
  description: string;
  alt?: string;
  iconPass?: string;
  title?: string;
  subTitle?: string;
};

export default function ContentBlock({
  description,
  iconPass,
  alt,
  title,
  subTitle,
}: Props) {
  const hasIcon = Boolean(iconPass);
  const hasTitle = Boolean(title);

  return (
    <div className={styles.header}>
      {hasTitle ? (
        <div className={styles.titleArea}>
          <h3 className={styles.title}>{title}</h3>
          {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
        </div>
      ) : hasIcon ? (
        <img
          src={iconPass}
          alt={alt ?? ''}
          className={styles.serviceIcon}
        />
      ) : null}
      <div className={styles.balloon}>{description}</div>
    </div>
  );
}
