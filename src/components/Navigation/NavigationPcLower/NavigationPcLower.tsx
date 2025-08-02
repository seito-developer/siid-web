import ContactButton from '@/components/ContactButton/ContactButton'
import React from 'react'
import styles from './NavigationPcLower.module.css'
import Menu from '../Menu/Menu'
import Logo from '@/components/Logo/Logo'
import Link from 'next/link'
import Corner, { CornerPosition } from '@/components/Corner/Corner'

export default function NavigationPcLower() {
  return (
    <nav className={styles.NavigationPcLower}>
      <div className={styles.NavigationPcLower__Container}>
        <div className={styles.NavigationPcLower__logo}>
          <Link href='/'>
            <Logo width={102} height={25} fill='#fff' />
          </Link>
          <Corner bottom='-20px' left="0" position={CornerPosition.TOP_LEFT} />
          <Corner top='0' right="-20px" position={CornerPosition.TOP_LEFT} />
        </div>
        <div className={styles.NavigationPcLower__Menu}>
          <Menu modifierClass="isLower" />
        </div>
      </div>
    </nav>
  )
}