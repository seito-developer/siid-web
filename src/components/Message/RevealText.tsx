'use client';

import React, { useEffect, useRef } from 'react';

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function RevealText({ children, className = '' }: RevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const update = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const threshold = viewportWidth >= 1280 ? 0.6 : 0.6;
      const start = rect.top - viewportHeight * threshold;
      const end = rect.bottom - viewportHeight * threshold;
      const progress = Math.max(0, Math.min(1, (0 - start) / (end - start || 1)));

      // 全ての .ch 要素を取得（テキストとSVG両方）
      const chars = container.querySelectorAll('.ch');
      const totalChars = chars.length;
      const visibleCount = Math.floor(progress * totalChars);

      // 順番にクラスを付ける
      chars.forEach((char, index) => {
        if (index < visibleCount) {
          char.classList.add('is-on');
        } else {
          char.classList.remove('is-on');
        }
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // childrenを解析して文字とLogoを分割
  const renderContent = () => {
    const elements: React.ReactNode[] = [];
    let charIndex = 0;

    const processNode = (node: React.ReactNode): void => {
      if (typeof node === 'string') {
        // 文字列を1文字ずつ分割
        node.split('').forEach(char => {
          if (char === ' ') {
            elements.push(
              <span key={charIndex++} className="ch">
                {'\u00A0'}
              </span>,
            );
          } else if (char !== '\n') {
            elements.push(
              <span key={charIndex++} className="ch">
                {char}
              </span>,
            );
          }
        });
      } else if (React.isValidElement(node)) {
        if (node.type === 'br') {
          // br要素のprops（classNameなど）を保持
          elements.push(React.cloneElement(node, { key: `br-${charIndex++}` }));
        } else {
          // その他の要素（RevealLogoなど）はそのまま通す
          elements.push(React.cloneElement(node, { key: `element-${charIndex++}` }));
        }
      }
    };

    React.Children.forEach(children, processNode);
    return elements;
  };

  return (
    <p ref={containerRef} className={`reveal-text ${className}`}>
      {renderContent()}
    </p>
  );
}
