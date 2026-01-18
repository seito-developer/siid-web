'use client';

import { useRef, useState } from 'react';

import styles from './FaqItem.module.css';

type FaqItemProps = {
  number: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FaqItem({ number, question, answer, defaultOpen = false }: FaqItemProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onOpen = () => {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel || details.open || isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    setIsOpen(true);
    details.setAttribute('open', '');
    panel.style.blockSize = '0';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (panel) {
          panel.style.blockSize = `${panel.scrollHeight}px`;
        }
      });
    });

    const handleTransitionEnd = () => {
      if (panel) {
        panel.style.blockSize = '';
      }
      isTransitioningRef.current = false;
    };

    panel.addEventListener('transitionend', handleTransitionEnd, { once: true });
  };

  const onClose = () => {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel || !details.open || isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    setIsOpen(false);
    panel.style.blockSize = `${panel.scrollHeight}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (panel) {
          panel.style.blockSize = '0';
        }
      });
    });

    const handleTransitionEnd = () => {
      details.removeAttribute('open');
      if (panel) {
        panel.style.blockSize = '';
      }
      isTransitioningRef.current = false;
    };

    panel.addEventListener('transitionend', handleTransitionEnd, { once: true });
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const details = detailsRef.current;
    if (!details) {
      return;
    }

    if (details.open) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <details ref={detailsRef} className={`${styles.FaqItem} ${isOpen ? styles.FaqItem__Open : ''}`} open={defaultOpen}>
      <summary className={styles.FaqItem__Question} onClick={handleClick}>
        <span className={styles.FaqItem__Number}>{number}</span>
        <span className={styles.FaqItem__QuestionText}>{question}</span>
        <span className={styles.FaqItem__Icon} aria-hidden="true"></span>
      </summary>
      <div ref={panelRef} className={styles.FaqItem__AnswerWrapper}>
        <div className={styles.FaqItem__Answer}>
          <p className={styles.FaqItem__AnswerText}>{answer}</p>
        </div>
      </div>
    </details>
  );
}
