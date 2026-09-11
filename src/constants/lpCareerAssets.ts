// lp-career の静的アセットのパス。
//
// next.config.ts の basePath('/siid')は next/image の src には自動で付かないため、
// 既存 lp-1 と同じく明示する必要がある。パスが各所に散らばらないよう定数にまとめる。
export const LP_CAREER_BASE = '/siid';

/** public/ 配下のパスから、basePath 込みの URL を組み立てる。 */
export function lpCareerAsset(path: string): string {
  return `${LP_CAREER_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export const LP_CAREER_LOGO = lpCareerAsset('/images/lp-1/siid-logo.svg');
export const LP_CAREER_LOGO_WHITE = lpCareerAsset('/images/lp-1/siid-logo-w.svg');

/**
 * lp-career の画像に指定する品質。
 *
 * next/image の既定(75)で再エンコードすると、カンプの背景グラデーションで
 * 色が 20 程度ずれることを実測で確認した(例: #24A6FC → #0E9FF7)。
 * 90 まで上げると基準画像とほぼ一致する。
 */
// セクション背景の webp は psd_tool.py が q=80 で書き出したもの。
// next/image で q=90 に再エンコードすると元より大きくなる(strength は 138KB → 171KB)。
// リリース前チェックリストの推奨も「品質 80 前後」。
export const LP_CAREER_IMAGE_QUALITY = 80;
