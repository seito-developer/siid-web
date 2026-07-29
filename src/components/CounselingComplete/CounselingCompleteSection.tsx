import TrackOpenAiAdsConversion from '@/components/Analytics/TrackOpenAiAdsConversion';
import Breadcrumb, {
  BreadcrumbProps,
} from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './CounselingCompleteSection.module.css';

const YOUTUBE_URL = 'https://www.youtube.com/@programming-siid';
const CONTACT_URL = 'https://bug-fix.org/contact';

type PageMeta = {
  name: { ja: string; en: string };
  url: string;
  description: string;
};

// /counseling-complete と /counseling-complete-lp-1 で共用する申込完了ページ本体。
// 両ページとも OpenAI Ads の CV(appointment_scheduled)を発火する。
export default function CounselingCompleteSection({ page }: { page: PageMeta }) {
  const breadcrumb: BreadcrumbProps[] = [
    { title: pages.index.name.ja, url: pages.index.url },
    { title: page.name.ja, url: page.url },
  ];

  return (
    <div>
      <TrackOpenAiAdsConversion
        eventName="appointment_scheduled"
        eventData={{ type: 'customer_action' }}
      />
      <Headline
        subTitle={page.name.ja}
        title={page.name.en}
        description={handleStringHTML(page.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <section className={styles.CounselingCompleteSection}>
          <p className={styles.CounselingCompleteSection__Lead}>
            お申し込みが完了しました！
            <br />
            オンライン説明会の日時・URLをメールでお送りいたしました。
          </p>
          <div className={styles.CounselingCompleteSection__Body}>
            <p className={styles.CounselingCompleteSection__Text}>
              当日お時間になりましたら、メールに記載の
              <strong>ZoomのURL</strong>
              にご参加下さいませ。
            </p>
            <p className={styles.CounselingCompleteSection__Text}>
              また、限られた時間の中で最大限有意義なサービス説明をさせていただくために、
              <br />
              もしお時間がございましたら、弊社YouTubeチャンネルの受講生様対談動画を2,3本ほどご視聴いただけますと幸いです。
            </p>
            <p className={styles.CounselingCompleteSection__LinkWrap}>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.CounselingCompleteSection__Link}
              >
                SiiD YouTube
              </a>
            </p>
            <p className={styles.CounselingCompleteSection__Text}>
              キャンセル・変更に関しては、
              <br />
              お問合せフォームからその旨をお伝えいただきますようお願いいたします。
            </p>
            <p className={styles.CounselingCompleteSection__LinkWrap}>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.CounselingCompleteSection__CancelLink}
              >
                キャンセル・変更のご連絡
              </a>
            </p>
          </div>
        </section>
      </ContentsArea>
    </div>
  );
}
