export interface CareerPathData {
  id: string;
  title: string;
  voice: string;
  youtubeId: string;
  description: string;
  tags: string[];
  age: number;
  sex: string;
  course: string;
  reason: string;
  detailTitle: string;
  achievement: string;
  detailContent: string;
  // fetch-graduates スクリプトが付与するメタ情報（任意）
  thumbnail?: string;
  publishedAt?: string;
  // 編集フィールド未記入のドラフト。true の間はサイトに表示されない
  // （getCareerPathData で除外）。人が内容を埋めたら削除して公開する。
  _draft?: boolean;
}
