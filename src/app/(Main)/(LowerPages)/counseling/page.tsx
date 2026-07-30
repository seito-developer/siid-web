import { Metadata } from 'next';

import Script from 'next/script';

import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Benefits from '@/components/Counseling/Benefits/Benefits';
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
          <div
            className="jicoo-widget"
            data-url="https://www.jicoo.com/event_types/dPvwnhRYxhQB/widget"
            style={{
              minWidth: '320px',
              height: '720px',
              border: '1px solid #e4e4e4',
              boxSizing: 'content-box',
            }}></div>
        </div>
        <Script
          type="text/javascript"
          src="https://www.jicoo.com/widget/event_type.js"
          async
        />
      </ContentsArea>
    </div>
  );
}
