'use client';

import React, { useState } from 'react';

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
      {/* カードの枠・番号の丸・青い帯・写真はセクション背景に含まれる */}
      <p className={styles.Voice__No}>
        <span>VOICE</span>
        <strong>{voice.no}</strong>
      </p>

      <h3 className={styles.Voice__Title}>
        {/* `\n` は既定の改行、`<sp>` は SP だけの改行。
            カンプの折り返しが PC と SP で違うカードがあるため分けている */}
        {voice.title
          .split(/(\n|<sp>)/)
          .filter(Boolean)
          .map((part, i) => {
            if (part === '\n') {
              return <br key={`br-${i}`} className={styles.Voice__TitleBreak} />;
            }
            if (part === '<sp>') {
              return <br key={`br-${i}`} className={styles.Voice__TitleBreakSp} />;
            }
            return <span key={part}>{part}</span>;
          })}
      </h3>

      {/* 受講生の写真は意匠画像に焼き込まれているため、ここでは描かない */}
      <div className={styles.Voice__Profile}>
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
        <SectionLabel gradient className={styles.Voice__Label}>
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
