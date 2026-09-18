import { Metadata } from 'next';

import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Benefits from '@/components/Counseling/Benefits/Benefits';
import BookingWidget from '@/components/Counseling/BookingWidget/BookingWidget';
import Headline from '@/components/Headline/Headline';
import { buildPageMetadata, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './Counseling.module.css';

export const metadata: Metadata = buildPageMetadata(pages.counseling);

export default function Courses() {
  return (
    <div className={styles.Courses}>
      <Headline
        subTitle={pages.counseling.name.ja}
        title={pages.counseling.name.en}
        description={handleStringHTML(pages.counseling.description, true)}
      />
      {/* パンくずは TOP へのリンクを含むため、コンバージョン特化ページでは出さない (Issue #42) */}
      <ContentsArea>
        <Benefits />
        <div className={styles.Counseling}>
          <BookingWidget />
        </div>
      </ContentsArea>
    </div>
  );
}
