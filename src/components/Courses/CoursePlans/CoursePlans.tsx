import React from 'react';

import { COURSE_PLAN_ANCHOR_IDS } from '@/constants/coursePlans';
import { CoursePlan } from '@/lib/getCoursePlans';

import PlanCard from '../PlanCard/PlanCard';
import SectionHeading from '../SectionHeading/SectionHeading';

import styles from './CoursePlans.module.css';

type Props = {
  plans: CoursePlan[];
};

export default function CoursePlans({ plans }: Props) {
  return (
    <section className={styles.CoursePlans}>
      <div className={styles.CoursePlans__Heading}>
        <SectionHeading en="Course" title="コース紹介" />
      </div>
      <ul className={styles.CoursePlans__List}>
        {plans.map((plan) => (
          <li
            key={plan.id}
            id={COURSE_PLAN_ANCHOR_IDS[plan.id]}
            className={styles.CoursePlans__Item}>
            <PlanCard plan={plan} />
          </li>
        ))}
      </ul>
    </section>
  );
}
