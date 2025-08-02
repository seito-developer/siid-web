export function handleStringHTML(str:string, isHTML: boolean = false): string {
  if (isHTML) {
    // HTMLとして返す（そのまま返す）
    return str;
  } else {
    // <br />タグを削除して文字列として返す
    return str.replace(/<br\s*\/?>/gi, '');
  }
}
