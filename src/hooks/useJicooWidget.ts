import { RefObject, useEffect } from 'react';

// Jicoo の予約フォームを埋め込むホスト(Issue #71 / #138 / #157)。
//
// Jicoo 公式の埋め込みスクリプト(event_type.js)は使わず、iframe の生成と通知の処理をここで持つ。
// 公式スクリプトは windowHeight の通知ごとに高さを上書きする(画面切り替え中の一時的な低い値で
// フォームが縮み、入力位置が上下する)うえ、scrollWidgetTop で親ページを強制スクロールするため。
//
// - windowHeight: マウント中の最大値を保持して iframe の高さにする。幅が変わったときだけ基準を戻す
// - redirectUrl: Jicoo の予約完了後の転送先だけ親ページで開く
// - scrollWidgetTop: 無視する(入力位置は利用者が操作する)
//
// 対象要素が画面に近づいてから iframe を読み込む(rootMargin 600px)。

type Options = {
  /** iframe の title(スクリーンリーダー向け) */
  title: string;
};

export default function useJicooWidget(
  ref: RefObject<HTMLElement | null>,
  widgetUrl: string,
  { title }: Options,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    const jicooOrigin = new URL(widgetUrl).origin;
    let frame: HTMLIFrameElement | null = null;
    let maximumHeight = 0;
    let animationFrame = 0;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== jicooOrigin || !frame || event.source !== frame.contentWindow) {
        return;
      }
      const data = event.data;
      if (!data || typeof data !== 'object') { return; }

      if (data.name === 'windowHeight') {
        const height = typeof data.value === 'number' || typeof data.value === 'string'
          ? Number(data.value) : NaN;
        if (!Number.isFinite(height) || height <= 0 || height > 20000) { return; }
        // 画面切り替え中の一時的な低い値で、カードや入力位置を上下させない。
        maximumHeight = Math.max(maximumHeight, Math.ceil(height));
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          if (frame) { frame.style.height = `${maximumHeight}px`; }
        });
      }

      if (data.name === 'redirectUrl' && typeof data.value === 'string') {
        try {
          const url = new URL(data.value, window.location.href);
          // Jicoo内の入力画面遷移は埋め込みのまま。設定済みの完了URLだけ親で開く。
          const isEventPage = /^\/t\/[^/]+\/e\/[^/]+$/.test(url.pathname);
          if ((url.protocol === 'https:' || url.origin === window.location.origin)
            && (url.origin !== jicooOrigin || isEventPage)) {
            window.location.assign(url.href);
          }
        } catch { /* 不正な通知では画面を遷移させない。 */ }
      }
      // scrollWidgetTopではページを強制移動しない。入力位置は利用者が操作する。
    };

    // 幅が変わるとJicoo側の折り返しも変わり、高さが再通知される(実測: SP縦で入力画面 1901px →
    // 横向きで 1666px)。保持中の最大値に張り付かないよう、幅の変化時だけ基準を戻す。
    // SPのアドレスバー伸縮による高さだけの変化では戻さない。
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) { return; }
      lastWidth = window.innerWidth;
      maximumHeight = 0;
    };

    const load = () => {
      if (frame) { return; }
      frame = document.createElement('iframe');
      frame.src = widgetUrl;
      frame.title = title;
      el.appendChild(frame);
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('resize', onResize);
    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrame);
      frame?.remove();
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return cleanup;
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

    return () => { io.disconnect(); cleanup(); };
  }, [ref, widgetUrl, title]);
}
