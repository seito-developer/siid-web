import ContactButton from '@/components/ContactButton/ContactButton'
import React from 'react'
import styles from './NavigationPc.module.css'
import Menu from '../Menu/Menu'
import Logo from '@/components/Logo/Logo'

export default function NavigationPc() {
  return (
    <nav className={styles.NavigationPc}>
      <div className={styles.NavigationPc__Container}>
        <div className={styles.NavigationPc__ContactButton}>
          <ContactButton />
        </div>
        <div>
          <Menu />
        </div>
      </div>
      <div className={styles.NavigationPc__ButtonContainer}>
        <Logo />
      </div>
    </nav>
  )
}