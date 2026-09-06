'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_VOICES } from '@/constants/lp2Voices';

import SectionBg from '../SectionBg/SectionBg';
import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Voice.module.css';

// VOICE(docs/spec/lp2-sections/13-voice.md)。
// 「続きを読む」はモーダルではなくカード内で伸びるアコーディオン。

function Card({ voice, index }: { voice: (typeof LP2_VOICES)[number]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyId = `lp2-voice-body-${index}`;

  return (
    <li className={`${styles.Voice__Card} ${isOpen ? styles.isOpen : ''}`}>
      <p className={styles.Voice__No}>
        <span>VOICE</span>
        <strong>{voice.no}</strong>
      </p>

      <h3 className={styles.Voice__Title}>
        {voice.title.split('\n').map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </h3>

      <div className={styles.Voice__Profile}>
        <Image
          className={styles.Voice__Photo}
          src={lp2Asset(`/images/lp-2/${voice.photo}.webp`)}
          alt=""
          width={voice.photoWidth}
          height={voice.photoHeight}
          sizes="(min-width: 768px) 293px, 45vw"
          quality={LP2_IMAGE_QUALITY}
        />
        <p className={styles.Voice__Name}>
          {voice.name}
          <br />
          {voice.profile.split('\n').map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className={styles.Voice__Text}>
        <p className={styles.Voice__Lead}>
          {voice.lead.split('\n').map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>

        <div className={styles.Voice__Body} id={bodyId}>
          {voice.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <button
          type="button"
          className={styles.Voice__More}
          aria-expanded={isOpen}
          aria-controls={bodyId}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? '閉じる' : '続きを読む'}
          <span aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export default function Voice() {
  return (
    <section className={styles.Voice} id="voice">
      <SectionBg
        name="voice"
        pcWidth={1440}
        pcHeight={1730}
        spWidth={750}
        spHeight={3872}
      />

      <div className={styles.Voice__Inner}>
        <SectionLabel inverse className={styles.Voice__Label}>
          VOICE
        </SectionLabel>
        <h2 className={styles.Voice__Heading}>受講生の声</h2>

        <ul className={styles.Voice__Cards}>
          {LP2_VOICES.map((voice, i) => (
            <Card key={voice.no} voice={voice} index={i} />
          ))}
        </ul>

        <p className={styles.Voice__Note}>※個人の感想であり、成果を保証するものではありません</p>
      </div>
    </section>
  );
}
