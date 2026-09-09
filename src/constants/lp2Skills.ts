// SKILLS のカード 5 枚(docs/spec/lp2-sections/09-skill.md)。
//
// カードの体裁(チェック印・グラデーションの帯・タグの角丸)は CSS で組み、
// タグのアイコンだけ PSD から書き出したものを使う。
export type Lp2SkillCard = {
  title: string;
  tags: { label: string; icon: string }[];
  outcomes: string[];
};

export const LP2_SKILLS: Lp2SkillCard[] = [
  {
    title: '生成AI',
    tags: [
      { label: 'Claude Code', icon: 'claude-code' },
      { label: 'Figma AI', icon: 'figma-al' },
      { label: 'Codex', icon: 'codex' },
      { label: 'ChatGPT', icon: 'chatgpt' },
      { label: 'GitHub Copilot', icon: 'github-copilot' },
    ],
    outcomes: ['AIの学習に迷わない', 'AIで簡易的なプログラムを開発できる'],
  },
  {
    title: 'AIエンジニアリング',
    tags: [
      { label: 'プロンプト・エンジニアリング', icon: 'prompt' },
      { label: 'ハーネス・エンジニアリング', icon: 'harness' },
      { label: 'ビジネスフレームワーク', icon: 'business' },
      { label: 'アプリケーション開発', icon: 'appdev' },
      { label: 'Webサイト作成', icon: 'website' },
    ],
    outcomes: [
      'AIで実務レベルのWebサイトやアプリを開発できる',
      'AIで実務レベルの業務効率化を行える',
    ],
  },
  {
    title: 'フロントエンド',
    tags: [
      { label: 'HTML / CSS', icon: 'html-css' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'Node.js', icon: 'nodejs' },
      { label: 'React, Next.js', icon: 'react-nextjs' },
      { label: 'Firebase Firestore', icon: 'firebase-firestore' },
      { label: 'TailwindCSS', icon: 'tailwindcss' },
      { label: 'Vite', icon: 'vite' },
    ],
    outcomes: [
      '実務レベルのWebサイトを作成できる',
      'SPAを開発できる',
      'モダン開発のフロントエンドを学習できる',
    ],
  },
  {
    title: 'バックエンド',
    tags: [
      { label: 'PHP', icon: 'php' },
      { label: 'Laravel', icon: 'laravel' },
      { label: 'Livewire', icon: 'livewire' },
      { label: 'PostgreSQL', icon: 'postgresql' },
      { label: 'Fly.io', icon: 'flyio' },
    ],
    outcomes: [
      '実務レベルのWebアプリケーションを開発できる',
      '開発したアプリを一般公開できる',
      'モダン開発のバックエンドを学習できる',
    ],
  },
  {
    title: 'データ分析',
    tags: [
      { label: 'Python', icon: 'python' },
      { label: 'Pandas', icon: 'pandas' },
      { label: 'NumPy', icon: 'numpy' },
      { label: 'PostgreSQL', icon: 'postgresql' },
      { label: 'Streamlit', icon: 'streamlit' },
    ],
    outcomes: ['簡易的なデータ分析ができる', '分析したデータをグラフ化などで可視化し、Web公開できる'],
  },
];
