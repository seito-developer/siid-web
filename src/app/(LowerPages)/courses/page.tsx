import { Metadata } from 'next';

import Breadcrumb, { BreadcrumbProps } from '@/components/Breadcrumb/Breadcrumb';
import ContentsArea from '@/components/ContentsArea/ContentsArea';
import CourseAdvice from '@/components/Courses/CourseAdvice/CourseAdvice';
import CourseComparison from '@/components/Courses/CourseComparison/CourseComparison';
import CoursePlans from '@/components/Courses/CoursePlans/CoursePlans';
import LineBanner from '@/components/Courses/LineBanner/LineBanner';
import Headline from '@/components/Headline/Headline';
import ReskillBanner from '@/components/ReskillBanner/ReskillBanner';
import { commonTitle, pages } from '@/constants/meta';
import { getCoursePlansData } from '@/lib/getCoursePlans';
import { handleStringHTML } from '@/utils/helper';

import styles from './Courses.module.css';

export const metadata: Metadata = {
  title: `${pages.courses.name.ja} | ${commonTitle}`,
  description: handleStringHTML(pages.courses.description, false),
};

const breadcrumb: BreadcrumbProps[] = [
  { title: pages.index.name.ja, url: pages.index.url },
  { title: pages.courses.name.ja, url: pages.courses.url },
];

export default function Courses() {
  const { plans, comparison } = getCoursePlansData();

  return (
    <div className={styles.Courses}>
      <Headline
        subTitle={pages.courses.name.ja}
        title={pages.courses.name.en}
        description={handleStringHTML(pages.courses.description, true)}
      />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ContentsArea>
        <div className={styles.Courses__Contents}>
          <CoursePlans plans={plans} />
          <div className={styles.Courses__Reskill}>
            <ReskillBanner />
          </div>
          <CourseComparison plans={plans} comparison={comparison} />
          <CourseAdvice plans={plans} />
          <div className={styles.Courses__Line}>
            <LineBanner />
          </div>
        </div>
      </ContentsArea>
    </div>
  );
}
