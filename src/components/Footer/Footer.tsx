import React from 'react';

import ContactButton from '../ContactButton/ContactButton';
import Corner, { CornerPosition } from '../Corner/Corner';

import styles from './Footer.module.css';
import FooterMenu from './FooterMenu/FooterMenu';
import Pagetop from './Pagetop/Pagetop';


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
  );
}