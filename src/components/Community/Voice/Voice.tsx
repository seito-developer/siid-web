import React from 'react';

import Image from 'next/image';

import RibbonText from '../parts/Ribbon/Ribbon';

import styles from './Voice.module.css';

type Voice = {
  id: string;
  text: string;
};

type Props = {
  voices?: Voice[];
  laneCount?: number;
};

const DEFAULT_VOICES: Voice[] = [
  { id: '1', text: '感動しました。笑' },
  { id: '2', text: 'セイトさんから直接日々の雑談にコメントもらえるとは' },
  { id: '3', text: 'セイトさんがリアルに存在して感動しました。笑' },
  { id: '4', text: 'コーディングの沼にハマってしまった時にすぐ助けてもらえて嬉しかったです' },
  { id: '5', text: '普段オフラインで会ってた仲間と会えて、情報交換したりと楽しい時間でした' },
  { id: '6', text: 'おかげで本業と両立しながらなんとかやれてます！' },
  { id: '7', text: 'みんなが頑張っている姿に、自分も負けてられないとやる気が湧いた！ありがとう' },
  { id: '8', text: 'セイトさんから直接日々の雑談にコメントもらえるとは' },
];

function splitIntoLanes<T>(items: T[], laneCount: number): T[][] {
  const lanes: T[][] = Array.from({ length: laneCount }, () => []);
  items.forEach((item, i) => {
    lanes[i % laneCount].push(item);
  });
  return lanes;
}

function laneDurationSec(laneIndex: number) {
  const base = 48;
  const diff = [0, 6, 12, 4, 10];
  return base + (diff[laneIndex % diff.length] ?? 0);
}

export default function Voice(props: Props) {
  const { voices = DEFAULT_VOICES, laneCount = 4 } = props;

  const lanes = splitIntoLanes(voices, laneCount);

  return (
    <div className={styles.Voice__Wrapper} aria-label="受講者の声">
      <div className={styles.Voice__Ribbon} aria-hidden="true">
        <RibbonText text="VOICE" durationSec={48} direction="left" variant="voice" />
      </div>

      <div className={styles.Voice__Inner}>
        <aside className={styles.Voice__LeftCard}>
          <div className={styles.Voice__LeftCardTitle}>受講者の声</div>
          <div className={styles.Voice__LeftCardWatermark} aria-hidden="true">
            <Image
              src="/images/community/logo_voice.svg"
              alt=""
              width={100}
              height={100}
              className={styles.Voice__LeftCardLogo}
              aria-hidden="true"
            />
          </div>
        </aside>

        <div className={styles.Voice__Lanes} aria-label="受講者コメント">
          {lanes.map((lane, laneIndex) => {
            const loopLane = [...lane, ...lane];
            const duration = laneDurationSec(laneIndex);

            return (
              <div
                key={laneIndex}
                className={styles.Voice__Lane}
                style={{ ['--duration' as string]: `${duration}s` }}
              >
                <div className={styles.Voice__Track} aria-hidden="true">
                  {loopLane.map((v, i) => (
                    <div key={`${v.id}-${i}`} className={styles.Voice__Bubble}>
                      {v.text}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.Voice__Ribbon} aria-hidden="true">
        <RibbonText text="VOICE" durationSec={48} direction="right" variant="voice" />
      </div>
    </div>
  );
}
