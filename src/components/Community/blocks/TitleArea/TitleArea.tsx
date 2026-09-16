import styles from './TitleArea.module.css';

type Props = {
  en: string;
  title: string;
  lead: string;
};

export default function TitleArea({ en, title, lead }: Props) {
  return (
    <>
      <p className={styles.TitleArea__TitleEn}>&lt;/ <span className={styles.TitleArea__En}>{en}</span> &gt;</p>
      <h2 className={styles.TitleArea__Title}>{title}</h2>
      <p className={styles.TitleArea__Lead}>{lead}</p>
    </>
  );
}
