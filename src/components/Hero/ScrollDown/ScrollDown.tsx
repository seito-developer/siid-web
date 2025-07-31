import React from 'react'
import styles from './ScrollDown.module.css';
import Corner, { CornerPosition } from '@/components/Corner/Corner';

export default function ScrollDown() {
  return (
    <div className={styles.ScrollDown}>
        <span>Scroll down</span>
        <svg width={19} height={19}>
            <use href={`#scrollArrow`} />
        </svg>
        <Corner width='10px' height='10px' top='-10px' right="8px" position={CornerPosition.BOTTOM_RIGHT} />
        <Corner width='10px' height='10px' bottom='8px' left="-10px" position={CornerPosition.BOTTOM_RIGHT} />
    </div>
  )
}