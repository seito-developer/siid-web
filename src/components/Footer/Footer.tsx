import React from 'react';

import ContactButton from '../ContactButton/ContactButton';

import styles from './Footer.module.css';
import FooterMenu from './FooterMenu/FooterMenu';
import Pagetop from './Pagetop/Pagetop';

export default function Footer() {
  
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__Container}>
        <div className={styles.Footer__Inner}>
          <FooterMenu />
          <div className={styles.Footer__ContactButton}>
            <ContactButton modifier="isFooter" />
          </div>
          <div className={styles.Footer__Pagetop}>
            <Pagetop />
          </div>
        </div>
      </div>
    </footer>
  );
}
