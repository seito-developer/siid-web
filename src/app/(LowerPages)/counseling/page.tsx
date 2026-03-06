import { Metadata } from 'next';

import Script from 'next/script';

import Breadcrumb, {
  BreadcrumbProps,
} from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { commonTitle, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './Counseling.module.css';

export const metadata: Metadata = {
  title: `${pages.counseling.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.counseling.description, false),
};

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.counseling.name.ja, url: pages.counseling.url },
];

export default function Courses() {
  return (
    <div className={styles.Courses}>
      <Headline
        subTitle={pages.counseling.name.ja}
        title={pages.counseling.name.en}
        description={handleStringHTML(pages.counseling.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
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
