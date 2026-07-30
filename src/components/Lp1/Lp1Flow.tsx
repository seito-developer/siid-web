const steps: { title: string; text: string }[] = [
  {
    title: 'STEP 1　個別説明会を予約',
    text: 'カウンセリング予約ページから日時を選択。現在のご経歴・悩み・目指したいキャリアを事前アンケートでお聞かせください。',
  },
  {
    title: 'STEP 2　個別説明会（オンライン）',
    text: 'SiiDで学べること・受講スタイル・目指せるゴールをご説明。「自分の年齢・経歴で転職できるか」「仕事と両立できるか」「給付金は使えるか」など、具体的なご相談にお答えします。',
  },
  {
    title: 'STEP 3　プラン決定・お申し込み',
    text: 'Career / FullSupport / VIP の中からご希望のプランを選択。給付金対象の方は、申請手続きもサポートします。',
  },
  {
    title: 'STEP 4　受講スタート',
    text: 'ゴールから逆算した学習計画を設計。Discord 24時間質問＋毎日夜のZoom相談室で、つまずきをその日のうちに解決しながら学習を進めます。',
  },
];

export default function Lp1Flow() {
  return (
    <section className="flow sec">
      <div className="sec-head">
        <div className="en">FLOW</div>
        <h2>個別説明会から<br />受講開始までの流れ</h2>
      </div>
      <div className="steps">
        {steps.map((step) => (
          <div key={step.title} className="step">
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
