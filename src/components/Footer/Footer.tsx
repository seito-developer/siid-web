import React from 'react'
import FooterMenu from './FooterMenu/FooterMenu'
import styles from './Footer.module.css';
import ContactButton from '../ContactButton/ContactButton';
import Pagetop from './Pagetop/Pagetop';
import Corner, { CornerPosition } from '../Corner/Corner';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
        <div className={styles.Footer__Inner}>
            <FooterMenu />
            <div className={styles.Footer__ContactButton}>
                <ContactButton modifier='isFooter' />
            </div>
            <div className={styles.Footer__Pagetop}>
                <Pagetop />
            </div>
        </div>
        <Corner bottom='-60px' left="8px" position={CornerPosition.BOTTOM_LEFT} />
        <Corner bottom='-60px' right="8px" position={CornerPosition.BOTTOM_RIGHT} />
    </footer>
  )
}