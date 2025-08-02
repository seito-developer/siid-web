import React from 'react'
import styles from './NavigationPc.module.css'
import Menu from '../Menu/Menu'
import Logo from '@/components/Logo/Logo'

export default function NavigationPc() {
  return (
    <nav className={styles.NavigationPc}>
      <div className={styles.NavigationPc__Container}>
        <Logo />
        <Menu />
      </div>
    </nav>
  )
}