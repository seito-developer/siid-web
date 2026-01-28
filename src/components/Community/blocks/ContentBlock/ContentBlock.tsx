import styles from './ContentBlock.module.css';

type Props = {
  description: string;
  alt: string;
  iconPass: string;
};

export default function ContentBlock({ description, alt, iconPass }: Props) {
  return (
    <div className={styles.header}>
      <img 
        src={iconPass}
        alt={alt}
        className={styles.serviceIcon}
      />
      <div className={styles.balloon}>{description}</div>
    </div>
  );
}
