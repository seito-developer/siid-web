// コース機能のラベル定義
export const COURSE_FEATURE_LABELS = {
  reskill: 'リスキル講座',
  access: 'カリキュラムの\nアクセス期限',
  documentReview: '書類添削',
  mockInterview: '模擬面接',
  portfolioReview: 'ポートフォリオの添削',
  consult: '個別コンサル(1on1)',
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
  price: string;
  features: CourseFeatures;
};

// コースデータ
export const COURSES: Course[] = [
  {
    type: 'full-support',
    title: 'Career\n+Full Support',
    recommend: true,
    price: '324,192',
    features: {
      reskill: '給付金対象コース',
      access: '転職成功するまで',
      documentReview: '無期限',
      portfolioReview: '無期限',
      mockInterview: '無期限',
      consult: '転職成功するまで\n最大月1回',
      homeworkReview: 'あり',
    },
  },
  {
    type: 'vip',
    title: 'Career\n+VIP Edition',
    price: '524,192',
    features: {
      reskill: '給付金対象コース',
      access: '転職を含むそのほか目的が成功するまで',
      mockInterview: '無期限',
      portfolioReview: '無期限',
      documentReview: '無期限',
      consult: '目的達成するまで無制限',
      homeworkReview: 'あり',
    },
  },
  {
    type: 'career',
    title: 'Career',
    price: '93,452',
    features: {
      reskill: '給付金対象コース',
      access: '転職成功するまで',
      documentReview: '2回まで',
      mockInterview: '2回まで',
      portfolioReview: '各工程2回まで',
      consult: 'なし',
      homeworkReview: 'あり',
    },
  },
];
