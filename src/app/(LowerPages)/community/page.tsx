import { Metadata } from 'next';

import Breadcrumb, { BreadcrumbProps } from '@/components/Breadcrumb/Breadcrumb';
import OfflineSection from '@/components/Community/mainSection/OfflineSection';
import OnlineSection from '@/components/Community/mainSection/OnlineSection';
import Tab from '@/components/Community/Tab/Tab';
import VoiceSection from '@/components/Community/Voice/Voice';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { buildPageMetadata, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './Community.module.css';

export const metadata: Metadata = buildPageMetadata(pages.community);

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.community.name.ja, url: pages.community.url },
];

export default function Community() {
  return (
    <div>
      <Headline
        subTitle={pages.community.name.ja}
        title={pages.community.name.en}
        description={handleStringHTML(pages.community.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div className={styles.community}>
          <Tab />
          <OnlineSection />
          <VoiceSection />
          <OfflineSection />
        </div>
      </ContentsArea>
    </div>
  );
}
