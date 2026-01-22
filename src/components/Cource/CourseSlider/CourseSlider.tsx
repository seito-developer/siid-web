'use client';

import { useRef, useState } from 'react';

import { COURSES } from '@/constants/courseData';

import CourseCard from '../CourseCard/CourseCard';

import styles from './CourseSlider.module.css';

export default function CourseSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setActiveIndex(prev => (prev + 1) % COURSES.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    setActiveIndex(prev => (prev - 1 + COURSES.length) % COURSES.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div className={styles.Slider}>
      <div className={styles.CardStack} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {COURSES.map((course, index) => {
          const position = (index - activeIndex + COURSES.length) % COURSES.length;

          return (
            <div key={index} className={`${styles.Card} ${styles[`Card--${course.type}`]} ${styles[`Card--position${position}`]}`}>
              <CourseCard {...course} />
            </div>
          );
        })}
        <button className={styles.NavButton} onClick={handlePrev} aria-label="前のコース">
          <span>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <use href="#circleLeftAllowBlue" />
            </svg>
          </span>
        </button>
        <button className={styles.NavButton} onClick={handleNext} aria-label="次のコース">
          <span>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <use href="#circleRightAllowBlue" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
