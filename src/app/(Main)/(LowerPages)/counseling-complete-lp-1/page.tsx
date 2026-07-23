import { Metadata } from 'next';

import TrackOpenAiAdsConversion from '@/components/Analytics/TrackOpenAiAdsConversion';
import Breadcrumb, {
  BreadcrumbProps,
} from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { buildPageMetadata, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './CounselingCompleteLp1.module.css';

export const metadata: Metadata = buildPageMetadata(pages.counselingCompleteLp1, { noindex: true });

const YOUTUBE_URL = 'https://www.youtube.com/@programming-siid';
const CONTACT_URL = 'https://bug-fix.org/contact';

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.counselingCompleteLp1.name.ja, url: pages.counselingCompleteLp1.url },
];

export default function CounselingCompleteLp1() {
  return (
    <div>
      <TrackOpenAiAdsConversion
        eventName="appointment_scheduled"
        eventData={{ type: 'customer_action' }}
      />
      <Headline
        subTitle={pages.counselingCompleteLp1.name.ja}
        title={pages.counselingCompleteLp1.name.en}
        description={handleStringHTML(pages.counselingCompleteLp1.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <section className={styles.CounselingCompleteLp1}>
          <p className={styles.CounselingCompleteLp1__Lead}>
            お申し込みが完了しました！
            <br />
            オンライン説明会の日時・URLをメールでお送りいたしました。
          </p>
          <div className={styles.CounselingCompleteLp1__Body}>
            <p className={styles.CounselingCompleteLp1__Text}>
              当日お時間になりましたら、メールに記載の
              <strong>ZoomのURL</strong>
              にご参加下さいませ。
            </p>
            <p className={styles.CounselingCompleteLp1__Text}>
              また、限られた時間の中で最大限有意義なサービス説明をさせていただくために、
              <br />
              もしお時間がございましたら、弊社YouTubeチャンネルの受講生様対談動画を2,3本ほどご視聴いただけますと幸いです。
            </p>
            <p className={styles.CounselingCompleteLp1__LinkWrap}>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.CounselingCompleteLp1__Link}
              >
                SiiD YouTube
              </a>
            </p>
            <p className={styles.CounselingCompleteLp1__Text}>
              キャンセル・変更に関しては、
              <br />
              お問合せフォームからその旨をお伝えいただきますようお願いいたします。
            </p>
            <p className={styles.CounselingCompleteLp1__LinkWrap}>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.CounselingCompleteLp1__CancelLink}
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
