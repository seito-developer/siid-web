import { Metadata } from 'next';

import Breadcrumb, { BreadcrumbProps } from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import { commonTitle, pages } from '@/constants/meta';
import { handleStringHTML } from '@/utils/helper';

import styles from './CareerPath.module.css';

export const metadata: Metadata = {
  title: `${pages.careerPath.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.careerPath.description, false),
};

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.careerPath.name.ja, url: pages.careerPath.url },
];

export default function CareerPath() {
  return (
    <div className={styles.CareerPath}>
      <Headline
        subTitle={pages.careerPath.name.ja}
        title={pages.careerPath.name.en}
        description={handleStringHTML(pages.careerPath.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div style={{ height: '1000px' }}>
          Contents Area
        </div>
      </ContentsArea>
    </div>
  );
}
