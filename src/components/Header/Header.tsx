import React from 'react'
import Logo from '../Logo/Logo'
import styles from './Header.module.css'
import ContactButton from '../ContactButton/ContactButton'
import Corner, { CornerPosition } from '../Corner/Corner'

export default function Header() {
  return (
    <header className={styles.Header}>
        <div className={styles.Header__Logo}>
            <Logo fill="#fff" />
            <Corner top='8px' right="-20px" position={CornerPosition.TOP_LEFT} />
            <Corner bottom='-20px' left="8px" position={CornerPosition.TOP_LEFT} />
        </div>
        <div className={styles.Header__Contact}>
            <ContactButton />
        </div>
        <div className={styles.Header__RightCorner}>
            <Corner top='8px' left="-20px" position={CornerPosition.TOP_RIGHT} />
            <Corner bottom='-20px' right="8px" position={CornerPosition.TOP_RIGHT} />
        </div>
    </header>
  )
}

