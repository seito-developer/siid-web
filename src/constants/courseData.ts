// コース機能のラベル定義
export const COURSE_FEATURE_LABELS = {
  reskill: 'リスキル講座',
  access: 'カリキュラムの\nアクセス期限',
  documentReview: '書類添削',
  mockInterview: '模擬面接',
  portfolioReview: 'ポートフォリオの添削',
  consult: '個別コンサル（1on1）',
  homeworkReview: '宿題の添削',
} as const;

// コースデータ型
export type CourseType = 'career' | 'full-support' | 'vip';

export type CourseFeatures = {
  reskill?: string;
  access?: string;
  documentReview?: string;
  mockInterview?: string;
  portfolioReview?: string;
  consult?: string;
  homeworkReview?: string;
};

export type Course = {
  type: CourseType;
  title: string;
  recommend?: boolean;
  // 価格を出さないプラン(顧問プラン。要お問い合わせ)は省略する
  price?: string;
  features: CourseFeatures;
};

// コースデータ
export const COURSES: Course[] = [
  {
    type: 'full-support',
    title: 'Career\n+Full Support',
    recommend: true,
    price: '275,600',
    features: {
      reskill: '給付金対象コース',
      access: '無期限',
      documentReview: '無制限',
      portfolioReview: '無制限',
      mockInterview: '無制限',
      consult: '転職成功するまで\n最大月1回',
      homeworkReview: 'あり',
    },
  },
  {
    type: 'vip',
    title: '顧問プラン',
    features: {
      reskill: '対象外',
      documentReview: 'なし',
      mockInterview: 'なし',
      portfolioReview: 'なし',
      consult: '月1〜3回',
      homeworkReview: 'なし',
    },
  },
  {
    type: 'career',
    title: 'Career',
    price: '105,600',
    features: {
      reskill: '給付金対象コース',
      access: '無期限',
      documentReview: '2回まで',
      mockInterview: '2回まで',
      portfolioReview: '各工程2回まで',
      consult: 'なし',
      homeworkReview: 'あり',
    },
  },
];
