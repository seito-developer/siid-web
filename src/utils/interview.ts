import type { InterviewCard, InterviewPost } from '@/types/interview';

export const BLOG_URL = 'https://blog.bug-fix.org';

// 抽出結果がこれより長い場合は「が」がプロフィール以外の位置にあると判断して捨てる。
// 現行 35 件のプロフィール部分は最長 30 字前後。
const MAX_PROFILE_LENGTH = 40;

/**
 * インタビュー記事のタイトルからプロフィールのタグを取り出す。
 *
 * タイトルは「30代女性・商社の経理職（大阪府）が完全未経験から…した話」のように
 * 「プロフィール が 成果」の形で運用されている（microCMS にタグのフィールドは無い）。
 * 最初の「が」より前を「・」で区切ってタグにする。形式に合わないタイトルは
 * タグなし（空配列）として扱い、一覧の表示は崩さない。
 */
export function extractProfileTags(title: string): string[] {
  const index = title.indexOf('が');
  if (index <= 0) {
    return [];
  }
  const profile = title.slice(0, index);
  if (profile.length > MAX_PROFILE_LENGTH) {
    return [];
  }
  return splitOutsideParens(profile)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

// 「文系大学4年生（男性・兵庫県）」のように括弧内にも「・」があるため、括弧の外の「・」だけで区切る。
function splitOutsideParens(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of text) {
    if (ch === '（' || ch === '(') {
      depth += 1;
    } else if (ch === '）' || ch === ')') {
      depth = Math.max(0, depth - 1);
    } else if (ch === '・' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += ch;
  }
  parts.push(current);
  return parts;
}

export function toInterviewCard(post: InterviewPost): InterviewCard {
  return {
    id: post.id,
    title: post.title,
    publishedAt: post.publishedAt,
    url: `${BLOG_URL}/blog/${post.id}`,
    eyecatchUrl: post.eyecatch?.url ?? null,
    tags: extractProfileTags(post.title),
  };
}
