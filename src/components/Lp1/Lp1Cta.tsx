'use client';

import { useEffect, useRef } from 'react';

const JICOO_WIDGET_URL = 'https://www.jicoo.com/event_types/7prAIkBVVBVF/widget';
const JICOO_SCRIPT_URL = 'https://www.jicoo.com/widget/event_type.js';

// 旧LPの Jicoo 埋め込みを React 化。
// セクションがビューポートに近づいたら(rootMargin 600px)ウィジェットの script を一度だけロードする。
export default function Lp1Cta() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el) {
      return undefined;
    }

    const load = () => {
      if (loadedRef.current) {
        return;
      }
      loadedRef.current = true;
      const script = document.createElement('script');
      script.src = JICOO_SCRIPT_URL;
      script.async = true;
      document.body.appendChild(script);
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: '600px' },
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-sec" id="cta">
      <div className="sec-head" style={{ marginBottom: 12 }}>
        <div className="en" style={{ color: '#fff' }}>GET STARTED</div>
      </div>
      <h2>まずはお気軽にご相談ください。</h2>
      <div className="cta-note">所要60-90分 ／ オンライン対応 ／ 無理な勧誘はありません</div>
      <div
        ref={widgetRef}
        className="jicoo-widget"
        data-url={JICOO_WIDGET_URL}
        style={{
          minWidth: 320,
          height: 720,
          border: '1px solid #e4e4e4',
          boxSizing: 'content-box',
        }}
      />
    </section>
  );
}
