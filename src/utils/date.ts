/**
 * publishedAt（ISO 8601 / UTC）を「yyyy/mm/dd」に整形する。
 * タイムゾーンを Asia/Tokyo に固定することで、サーバー（UTC）とクライアント（JST）で
 * 表示がズレる＝Hydration Error になるのを防ぐ。不正な値は空文字を返す。
 */
const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function formatPublishedDate(dateTime: string): string {
  const date = new Date(dateTime);
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);
}
