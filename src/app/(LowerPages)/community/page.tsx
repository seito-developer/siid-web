import { Metadata } from 'next';

import Breadcrumb, { BreadcrumbProps } from '@/components/Breadcrumb/Breadcrumb';
import CommunityTabs from '@/components/Community/CommunityTabs/CommunityTabs';
import CommunityOfflineSection from '@/components/Community/mainSection/OfflineSection';
import CommunityOnlineSection from '@/components/Community/mainSection/OnlineSection';
import VoiceSection from '@/components/Community/VoiceSection/VoiceSection';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';

import { commonTitle, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './Community.module.css';

export const metadata: Metadata = {
  title: `${pages.community.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.community.description, false),
};

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.community.name.ja, url: pages.community.url },
];

export default function Community() {
  return (
    <div className={styles.community}>
      <Headline
        subTitle={pages.community.name.ja}
        title={pages.community.name.en}
        description={handleStringHTML(pages.community.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div>
          <CommunityTabs />
          <CommunityOnlineSection />
          <VoiceSection></VoiceSection>
          <CommunityOfflineSection />
        </div>
      </ContentsArea>
    </div>
  );
}
