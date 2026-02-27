import { Metadata } from 'next';

import Breadcrumb, { BreadcrumbProps } from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Features from '@/components/Features/Features';
import Headline from '@/components/Headline/Headline';
import { commonTitle, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './Service.module.css';

export const metadata: Metadata = {
  title: `${pages.service.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.service.description, false),
};

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.service.name.ja, url: pages.service.url },
];

export default async function ServicePage() {
  return (
    <div>
      <Headline subTitle={pages.service.name.ja} title={pages.service.name.en} description={handleStringHTML(pages.service.description, true)} />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div className={styles.Service}>
          <Features />
        </div>
      </ContentsArea>
    </div>
  );
}
