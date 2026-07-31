import Image from 'next/image';

import { CoursePlan } from '@/lib/getCoursePlans';

import SealCheckIcon from '../SealCheckIcon/SealCheckIcon';

import styles from './PlanCard.module.css';

type Props = {
  plan: CoursePlan;
};

export default function PlanCard({ plan }: Props) {
  return (
    <article className={`${styles.PlanCard} ${styles[`PlanCard--${plan.id}`]}`}>
      {plan.recommend && (
        <div className={styles.PlanCard__Badge}>
          <Image
            src="/siid/images/courses/icon-megaphone.svg"
            alt=""
            width={20}
            height={20}
          />
          <span>おすすめ</span>
        </div>
      )}
      <header className={styles.PlanCard__Header}>
        <h3 className={styles.PlanCard__Title}>
          {plan.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h3>
        <p className={styles.PlanCard__Description}>{plan.description}</p>
      </header>
      <div className={styles.PlanCard__Body}>
        <p className={styles.PlanCard__Price}>
          <strong>{plan.price}</strong>
          <span className={styles.PlanCard__PriceUnit}>円(税込)</span>
          <span className={styles.PlanCard__PriceFrom}>〜</span>
        </p>
        <p className={styles.PlanCard__Subsidized}>
          給付金適用後
          <strong>{plan.subsidizedPrice}</strong>
          <span>円(税込)〜</span>
        </p>
        <ul className={styles.PlanCard__Features}>
          {plan.features.map((feature) => (
            <li key={feature.text} className={styles.PlanCard__Feature}>
              <span className={styles.PlanCard__FeatureIcon}>
                <SealCheckIcon />
              </span>
              <p>
                {feature.text}
                {feature.em && <em>{feature.em}</em>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
