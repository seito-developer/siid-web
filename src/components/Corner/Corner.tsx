import React from 'react'
import styles from './Corner.module.css'

export enum CornerPosition {
  TOP_LEFT = 'topLeft',
  TOP_RIGHT = 'topRight',
  BOTTOM_LEFT = 'bottomLeft',
  BOTTOM_RIGHT = 'bottomRight'
}

export default function Corner( { width = "20px", height = "20px", top = "auto", right = "auto", bottom = "auto", left = "auto", position = CornerPosition.TOP_LEFT }: { width?: string, height?: string, right?: string, top?: string, bottom?: string, left?: string, position?: CornerPosition } ) {
    const borderRadius = position === CornerPosition.TOP_LEFT ? "16px 0 0 0" :
                         position === CornerPosition.TOP_RIGHT ? "0 16px 0 0" :
                         position === CornerPosition.BOTTOM_LEFT ? "0 0 0 16px" :
                         "0 0 16px 0";
  return (
    <div className={styles.Corner} style={{ width, height, right, top, bottom, left }} >
        <div className={styles.Corner__Inner} style={{ borderRadius }} />
    </div>
  )
}