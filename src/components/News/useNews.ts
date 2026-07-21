'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage news articles navigation and touch events.
 * @param {number} length - Number of news posts.
 * @returns {Object} - Contains current index, animation state, and handlers for navigation and touch events.
 */

const useNews = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextArticle = () => {
    if (isAnimating || length === 0) {return;}
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prevArticle = () => {
    if (isAnimating || length === 0) {return;}
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {return;}

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextArticle();
    } else if (isRightSwipe) {
      prevArticle();
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return {
    currentIndex,
    isAnimating,
    nextArticle,
    prevArticle,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useNews;
