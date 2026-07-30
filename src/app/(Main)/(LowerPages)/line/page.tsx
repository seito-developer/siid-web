import { Metadata } from 'next';

import Breadcrumb, {
  BreadcrumbProps,
} from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import Headline from '@/components/Headline/Headline';
import LineBanner from '@/components/Line/LineBanner/LineBanner';
import LinePresents from '@/components/Line/LinePresents/LinePresents';
import { buildPageMetadata, pages } from '@/constants/meta';
import { getLinePresents } from '@/lib/getLinePresents';
import { handleStringHTML } from '@/utils/helper';

import styles from './Line.module.css';

export const metadata: Metadata = buildPageMetadata(pages.line);

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.line.name.ja, url: pages.line.url },
];

export default function Line() {
  const presents = getLinePresents();

  return (
    <div className={styles.Line}>
      <Headline
        subTitle={pages.line.name.ja}
        title={pages.line.name.en}
        description={handleStringHTML(pages.line.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div className={styles.Line__Contents}>
          <LineBanner priority />
          <LinePresents presents={presents} />
          <LineBanner />
        </div>
      </ContentsArea>
    </div>
  );
}
