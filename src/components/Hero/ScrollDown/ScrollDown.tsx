import React from 'react'
import styles from './ScrollDown.module.css';

export default function ScrollDown() {
  return (
    <div className={styles.ScrollDown}>
        <span>Scroll down</span>
        <svg width={19} height={19}>
            <use href={`#scrollArrow`} />
        </svg>
    </div>
  )
}