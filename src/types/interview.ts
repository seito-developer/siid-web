/** microCMS（SiiD BLOG）の「受講生様インタビュー」記事。取得するフィールドのみ。 */
export type InterviewPost = {
  id: string;
  title: string;
  publishedAt: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
};

/** 一覧・スライダーに渡す表示用の形。記事 URL とタグは取得時に組み立てる。 */
export type InterviewCard = {
  id: string;
  title: string;
  publishedAt: string;
  url: string;
  eyecatchUrl: string | null;
  tags: string[];
};

export type InterviewList = {
  contents: InterviewCard[];
  totalCount: number;
};
