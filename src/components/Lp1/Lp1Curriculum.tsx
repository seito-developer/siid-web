const techChips = [
  '生成 AI・開発ツール',
  'コンピュータサイエンス',
  'プログラミング',
  'データベース',
  'API',
  'セキュリティ',
  '要件定義・設計',
  'アルゴリズム',
  'ホスティング',
];

const toolChips = [
  'HTML',
  'CSS',
  'JavaScript',
  'PHP',
  'Laravel',
  'Livewire',
  'TailwindCSS',
  'Firebase',
  'PostgreSQL',
  'Fly.io',
  'Node.js',
  'Vite',
  'Git',
  'GitHub',
  'Docker',
  'VS Code',
];

const aiChips = ['ChatGPT', 'Codex', 'Cursor', 'GitHub Copilot', 'Figma AI'];

const fullSupportTechChips = ['Python', 'TypeScript', 'React', 'Next.js'];

const careerChips = [
  '業界研究 / 企業研究',
  '自己分析',
  '履歴書添削',
  '職務経歴書添削',
  'GitHub 添削',
  '求人サイトのプロフィール添削',
  '模擬面接',
  'ポートフォリオ / 仕様書添削',
  'コードレビュー',
];

const templateChips = ['職務経歴書', '履歴書', '要件定義書 / ER 図', '画面設計図'];

const aiToolChips = ['AI 仕様書 自動作成', 'AI 経歴書 自動作成'];

function ChipList({ chips, accent = false }: { chips: string[]; accent?: boolean }) {
  return (
    <ul className="c-chips">
      {chips.map((chip) => (
        <li key={chip} className={accent ? 'chip chip--accent' : 'chip'}>
          {chip}
        </li>
      ))}
    </ul>
  );
}

export default function Lp1Curriculum() {
  return (
    <section className="curriculum sec" id="curriculum">
      <div className="sec-head">
        <div className="en">CURRICULUM</div>
        <h2>SiiDで<span className="brand">具体的に学べる</span>スキル</h2>
        <p className="voice-lead">
          技術はもちろん、転職を成功させるための実務スキルまで。ゴールから逆算し、必要なものだけを最短ルートで身につけます。
        </p>
      </div>

      <div className="curriculum-grid">
        <article className="c-card">
          <div className="c-card-head">
            <span className="c-tag">TECH</span>
            <h3>AI・プログラミング学習</h3>
          </div>
          <ChipList chips={techChips} />

          <div className="c-subhead">学べる技術・ツール</div>
          <ChipList chips={toolChips} />

          <div className="c-subhead">学べるAIツール</div>
          <ChipList chips={aiChips} />

          <div className="c-subhead">Full Support オプション</div>
          <ChipList chips={fullSupportTechChips} accent />
        </article>

        <article className="c-card">
          <div className="c-card-head">
            <span className="c-tag c-tag--navy">CAREER</span>
            <h3>転職対策カリキュラム</h3>
          </div>

          <div className="c-subhead">学習・添削の範囲</div>
          <ChipList chips={careerChips} />

          <div className="c-subhead">提供テンプレート</div>
          <ChipList chips={templateChips} />

          <div className="c-subhead">SiiD 独自の生成 AI ツール</div>
          <ChipList chips={aiToolChips} />

          <div className="c-subhead">求人・案件サポート</div>
          <ChipList chips={['求人の紹介（正社員）']} />

          <div className="c-subhead">Full Support オプション</div>
          <ChipList chips={['実案件の疑似体験']} accent />
        </article>
      </div>

      <p className="c-note">
        ※ プランによって学べる技術・支援内容に差があります。詳細はプラン比較をご覧ください。
      </p>
    </section>
  );
}
