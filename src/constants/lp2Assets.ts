// lp-2 の静的アセットのパス。
//
// next.config.ts の basePath('/siid')は next/image の src には自動で付かないため、
// 既存 lp-1 と同じく明示する必要がある。パスが各所に散らばらないよう定数にまとめる。
export const LP2_BASE = '/siid';

/** public/ 配下のパスから、basePath 込みの URL を組み立てる。 */
export function lp2Asset(path: string): string {
  return `${LP2_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export const LP2_LOGO = lp2Asset('/images/lp-1/siid-logo.svg');
export const LP2_LOGO_WHITE = lp2Asset('/images/lp-1/siid-logo-w.svg');
