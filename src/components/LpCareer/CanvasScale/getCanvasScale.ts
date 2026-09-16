/**
 * LP 全体の縮尺(lp-career-tokens / LpCareer.module.css の --lp-career-canvas-scale と同じ式)。
 * SP は設計幅 375px、PC は 1440px を基準にする。
 * visualViewport.width はピンチ操作で変わるため使用しない。
 */
export function getCanvasScale(viewportWidth: number = window.innerWidth): number {
  return viewportWidth < 768 ? viewportWidth / 375 : Math.min(1, viewportWidth / 1440);
}
