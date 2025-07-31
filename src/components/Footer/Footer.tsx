import React from 'react'
import FooterMenu from './FooterMenu/FooterMenu'
import styles from './Footer.module.css';
import Logo from '../Logo/Logo';
import ContactButton from '../ContactButton/ContactButton';
import Pagetop from './Pagetop/Pagetop';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
        <div className={styles.Footer__Inner}>
            <Logo width={134} height={34} fill='#fff' />
            <FooterMenu />
            <div className={styles.Footer__ContactButton}>
                <ContactButton />
            </div>
            <div className={styles.Footer__Pagetop}>
                <Pagetop />
            </div>
        </div>
    </footer>
  )
}