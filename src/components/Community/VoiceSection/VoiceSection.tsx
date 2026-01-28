import React from 'react';
import styles from './VoiceSection.module.css';

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

export default function VoiceSection(props: Props) {
  const { voices = DEFAULT_VOICES, laneCount = 4 } = props;

  const lanes = splitIntoLanes(voices, laneCount);

  return (
    <section className={styles.voiceSection} aria-label="受講者の声">
      <div className={styles.ribbon} aria-hidden="true">
        <RibbonText text="VOICE" repeat={14} />
      </div>

      <div className={styles.inner}>
        <aside className={styles.leftCard}>
          <div className={styles.leftCardTitle}>受講者の声</div>
          <div className={styles.leftCardWatermark} aria-hidden="true">
            SiiD
          </div>
        </aside>

        <div className={styles.lanes} aria-label="受講者コメント">
          {lanes.map((lane, laneIndex) => (
            <div
              key={laneIndex}
              className={styles.lane}
              data-lane={laneIndex}
            >
              {lane.map((v) => (
                <div key={v.id} className={styles.bubble}>
                  {v.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ribbon} aria-hidden="true">
        <RibbonText text="VOICE" repeat={14} />
      </div>
    </section>
  );
}

function RibbonText(props: { text: string; repeat?: number }) {
  const { text, repeat = 12 } = props;
  return (
    <div className={styles.ribbonInner}>
      {Array.from({ length: repeat }).map((_, i) => (
        <span key={i} className={styles.ribbonWord}>
          {text}
        </span>
      ))}
    </div>
  );
}