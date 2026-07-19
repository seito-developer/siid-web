import React from 'react';

import Image from 'next/image';

import { LinePresent } from '@/lib/getLinePresents';

import Eyebrow from '../Eyebrow/Eyebrow';

import styles from './LinePresents.module.css';

type Props = {
  presents: LinePresent[];
};

export default function LinePresents({ presents }: Props) {
  return (
    <section className={styles.LinePresents}>
      <div className={styles.LinePresents__Header}>
        <Eyebrow label="Present" />
        <h2 className={styles.LinePresents__Heading}>
          【全員対象】LINE登録でもらえる10つの特典
        </h2>
      </div>

      <ul className={styles.LinePresents__List}>
        {presents.map((present) => (
          <li className={styles.LinePresents__Item} key={present.no}>
            <span className={styles.LinePresents__Badge}>
              <span className={styles.LinePresents__BadgeCheck}>Check</span>
              <span className={styles.LinePresents__BadgeNo}>{present.no}</span>
            </span>
            <div className={styles.LinePresents__Image}>
              <Image
                src={present.imageUrl}
                alt=""
                width={present.width}
                height={present.height}
              />
            </div>
            <p className={styles.LinePresents__Title}>{present.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
