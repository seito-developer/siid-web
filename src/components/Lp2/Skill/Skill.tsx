'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { LP2_IMAGE_QUALITY, lp2Asset } from '@/constants/lp2Assets';
import { LP2_SKILLS } from '@/constants/lp2Skills';

import SectionLabel from '../SectionLabel/SectionLabel';

import styles from './Skill.module.css';

// SKILLS(docs/spec/lp2-sections/09-skill.md と 09-skill.notes.md)。
//
// SP のみアコーディオン。カンプに非表示アートボード sp4_open.jpg(展開状態)が
// 同梱されており、「気になる項目をタップすると開きます。」の指示テキストがある
// (カンプの原文は「聞きます」だが誤植のため修正して実装する)。
// PC は 5 枚とも常時展開する。

function Card({ card, index }: { card: (typeof LP2_SKILLS)[number]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `lp2-skill-panel-${index}`;

  return (
    <li className={`${styles.Skill__Card} ${isOpen ? styles.isOpen : ''}`}>
      {/* SP ではボタン、PC では見出しとして振る舞う */}
      <button
        type="button"
        className={styles.Skill__CardHead}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className={styles.Skill__CardTitle}>{card.title}</span>
        <span className={styles.Skill__Chevron} aria-hidden="true" />
      </button>

      <div className={styles.Skill__Panel} id={panelId}>
        <p className={styles.Skill__Bar}>技術</p>
        <ul className={styles.Skill__Tags}>
          {card.tags.map((tag) => (
            <li key={tag.label}>
              <Image
                src={lp2Asset(`/images/lp-2/skills/${tag.icon}.webp`)}
                alt=""
                width={22}
                height={22}
                quality={LP2_IMAGE_QUALITY}
              />
              {tag.label}
            </li>
          ))}
        </ul>

        <p className={styles.Skill__Bar}>できるようになること</p>
        <ul className={styles.Skill__Outcomes}>
          {card.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Skill() {
  return (
    <section className={styles.Skill} id="skill">
      <Image
        className={styles.Skill__Bg}
        src={lp2Asset('/images/lp-2/skill-bg.webp')}
        alt=""
        width={1440}
        height={1700}
        sizes="100vw"
        quality={LP2_IMAGE_QUALITY}
      />

      <div className={styles.Skill__Inner}>
        <SectionLabel inverse className={styles.Skill__Label}>
          SKILLS
        </SectionLabel>

        <h2 className={styles.Skill__Title}>
          <span className={styles.Skill__TitleSmall}>学んで</span>
          <span className={styles.Skill__TitleLarge}>できるようになる</span>
        </h2>

        <p className={styles.Skill__Lead}>知識を集めるのではなく、仕事で使えるアウトプットへ。</p>
        <p className={styles.Skill__Hint}>気になる項目をタップすると詳細が開きます。</p>

        <ul className={styles.Skill__Cards}>
          {LP2_SKILLS.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
