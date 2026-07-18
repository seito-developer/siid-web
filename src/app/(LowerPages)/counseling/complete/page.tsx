import { Metadata } from 'next';

import Link from 'next/link';

import Breadcrumb, {
  BreadcrumbProps,
} from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { commonTitle, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './Complete.module.css';

export const metadata: Metadata = {
  title: `${pages.counselingComplete.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.counselingComplete.description, false),
  robots: { index: false, follow: false },
};

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.counseling.name.ja, url: pages.counseling.url },
  { title: pages.counselingComplete.name.ja, url: pages.counselingComplete.url },
];

const steps: { title: string; text: string }[] = [
  {
    title: '確認メールをご確認ください',
    text: 'ご予約内容と当日のご案内を記載した確認メールをお送りしました。届かない場合は迷惑メールフォルダもご確認ください。',
  },
  {
    title: '参加特典を受け取れます',
    text: 'カウンセリング当日、7大特典をまとめてお渡しします。当日を楽しみにお待ちください。',
  },
  {
    title: '当日はオンラインで実施します',
    text: 'ご予約いただいた日時にご参加ください。ご不明点があれば確認メールへの返信でお問い合わせいただけます。',
  },
];

export default function CounselingComplete() {
  return (
    <div>
      <Headline
        subTitle={pages.counselingComplete.name.ja}
        title={pages.counselingComplete.name.en}
        description={handleStringHTML(pages.counselingComplete.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <section className={styles.Complete}>
          <p className={styles.Complete__Lead}>
            この度は無料カウンセリングにお申し込みいただき、
            <br />
            誠にありがとうございます。
          </p>
          <ol className={styles.Complete__Steps}>
            {steps.map((step, index) => (
              <li key={index} className={styles.Complete__Step}>
                <span className={styles.Complete__StepNum} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.Complete__StepBody}>
                  <h2 className={styles.Complete__StepTitle}>{step.title}</h2>
                  <p className={styles.Complete__StepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.Complete__Actions}>
            <Link href={pages.index.url} className={styles.Complete__HomeLink}>
              TOPページへ戻る
            </Link>
          </div>
        </section>
      </ContentsArea>
    </div>
  );
}
