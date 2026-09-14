/**
 * 計測タグ（アナリティクス）の設定を環境変数から読み取る共有モジュール。
 * Analytics / GtmNoScript の両コンポーネントが参照する。
 *
 * 現行サイト（bug-fix.org/siid）から引き継いだタグ（Issue #19）:
 * - Google Analytics 4（gtag.js）
 * - Google Tag Manager（複数コンテナ対応）
 * - UserHeat（ヒートマップ）
 * - KARTE
 * - OpenAI Ads ピクセル
 *
 * ID は NEXT_PUBLIC_* 環境変数で管理し、未設定のタグは出力しない。
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const USERHEAT_ID = process.env.NEXT_PUBLIC_USERHEAT_ID;
export const KARTE_ID = process.env.NEXT_PUBLIC_KARTE_ID;
export const OPENAI_ADS_PIXEL_ID = process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID;

/** カンマ区切りの GTM コンテナ ID を配列化（例: "GTM-XXXX,GTM-YYYY"）。 */
export const GTM_IDS = (process.env.NEXT_PUBLIC_GTM_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

/**
 * Cookie 同意バナーを出しているページのパス（basePath 込み）。
 * このパス配下でだけ Google Consent Mode の既定値を denied にする。
 * Analytics は (Main) の layout とも共用のため、他ページの計測に影響させないための絞り込み。
 */
export const LP_CAREER_CONSENT_PATH = '/siid/lp-career';

/** Cookie 同意の保存先（localStorage のキー）。バナー側と共有する。 */
export const LP_CAREER_CONSENT_STORAGE_KEY = 'lp-career-cookie-consent';
