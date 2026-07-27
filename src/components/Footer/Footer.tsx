'use client';

import { usePathname } from 'next/navigation';

import { isConversionFocusedPage } from '@/constants/conversionFocusedPages';

import useIsPc from '../../hooks/useIsPc';
import ContactButton from '../ContactButton/ContactButton';
import Corner, { CornerPosition } from '../Corner/Corner';

import styles from './Footer.module.css';
import FooterMenu from './FooterMenu/FooterMenu';
import Pagetop from './Pagetop/Pagetop';

export default function Footer() {
  const isPc = useIsPc();
  const isConversionFocused = isConversionFocusedPage(usePathname());

  return (
    <footer className={styles.Footer}>
      {isPc && (
        <>
          <Corner
            width="16px"
            height="16px"
            bottom="0"
            left="8px"
            position={CornerPosition.BOTTOM_LEFT}
          />
          <Corner
            width="16px"
            height="16px"
            bottom="0"
            right="8px"
            position={CornerPosition.BOTTOM_RIGHT}
          />
        </> )}

      <div className={styles.Footer__Container}>
        <div className={styles.Footer__Inner}>
          <FooterMenu copyrightOnly={isConversionFocused} />
          {!isConversionFocused && (
            <>
              <div className={styles.Footer__ContactButton}>
                <ContactButton modifier="isFooter" />
              </div>
              <div className={styles.Footer__Pagetop}>
                <Pagetop />
              </div>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
