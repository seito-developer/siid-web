// コンバージョン集中のため共通クローム(グローバルナビ・フッターメニュー)を
// 簡易表示に切り替えるページ。ロゴはリンクなし・フッターはコピーライトのみ (Issue #42)
export const CONVERSION_FOCUSED_PATHS = ['/counseling'];

export const isConversionFocusedPage = (pathname: string) =>
  CONVERSION_FOCUSED_PATHS.includes(pathname);
