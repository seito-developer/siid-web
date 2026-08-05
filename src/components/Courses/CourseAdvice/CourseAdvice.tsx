import Image from 'next/image';

import { CoursePlan } from '@/lib/getCoursePlans';

import SectionHeading from '../SectionHeading/SectionHeading';

import styles from './CourseAdvice.module.css';

type Props = {
  plans: CoursePlan[];
};

export default function CourseAdvice({ plans }: Props) {
  return (
    <section className={styles.CourseAdvice}>
      <SectionHeading en="Advice" title="コース選びで迷っている方へ" />
      <div className={styles.CourseAdvice__BalloonWrap}>
        <Image
          src="/siid/images/courses/bracket-left.svg"
          alt=""
          width={32}
          height={43}
          className={styles.CourseAdvice__Bracket}
        />
        <div className={styles.CourseAdvice__Balloon}>
          <Image
            src="/siid/images/courses/balloon.svg"
            alt=""
            width={484}
            height={92}
            className={styles.CourseAdvice__BalloonBg}
          />
          <Image
            src="/siid/images/courses/balloon-star.svg"
            alt=""
            width={38}
            height={36}
            className={styles.CourseAdvice__BalloonStarLeft}
          />
          <Image
            src="/siid/images/courses/balloon-star.svg"
            alt=""
            width={38}
            height={36}
            className={styles.CourseAdvice__BalloonStarRight}
          />
          <p className={styles.CourseAdvice__BalloonText}>
            こんなお悩み
            <br className="br-sp" />
            持っていませんか？
          </p>
        </div>
        <Image
          src="/siid/images/courses/bracket-right.svg"
          alt=""
          width={32}
          height={43}
          className={styles.CourseAdvice__Bracket}
        />
      </div>
      <ul className={styles.CourseAdvice__Columns}>
        {plans.map((plan) => (
          <li key={plan.id} className={`${styles.CourseAdvice__Column} ${styles[`is-${plan.id}`]}`}>
            <div className={styles.CourseAdvice__Worries}>
              <ol className={styles.CourseAdvice__WorryList}>
                {plan.advice.map((worry, i) => (
                  <li key={i} className={styles.CourseAdvice__Worry}>
                    <span className={styles.CourseAdvice__WorryBadge}>
                      <Image
                        src={`/siid/images/courses/badge-nayami-${plan.id === 'fullSupport' ? 'fullsupport' : plan.id}.svg`}
                        alt=""
                        width={37}
                        height={43}
                      />
                      <span className={styles.CourseAdvice__WorryBadgeText}>
                        悩み
                        <strong>{`0${i + 1}`}</strong>
                      </span>
                    </span>
                    <p>{worry}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.CourseAdvice__Course}>
              <h3 className={styles.CourseAdvice__CourseTitle}>
                {plan.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p className={styles.CourseAdvice__CourseDescription}>{plan.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
