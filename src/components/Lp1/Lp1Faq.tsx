'use client';

import { useState } from 'react';

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'プログラミング未経験ですが、ついていけるでしょうか？',
    answer: (
      <>
        問題ありません。SiiDの受講生様は7割が未経験の方です。<br />
        ゼロからでも始められるよう、講師にZoomで質問・相談できる機会が毎日用意されていたり、学習ペースを自分で決められる環境がございます。
      </>
    ),
  },
  {
    question: '現役エンジニアでも受講できますか？',
    answer: (
      <>
        問題ありません。SiiDの受講生様は3割が現役エンジニアの方です。<br />
        モダン技術や生成AIスキルの習得、あるいは年収アップなどの転職目的でご受講いただけます。
      </>
    ),
  },
  {
    question: '仕事や家庭があるので忙しいのですが、両立できますか？',
    answer: (
      <>
        大丈夫です。チャット質問は24時間ご利用いただけますし、Zoomでのご質問・ご相談は毎日夜21:00〜23:00に実施しているのでお仕事終わりに参加できます。<br />
        また、学習ペースもご自身で決められるので、お仕事やご家庭の状況に合わせて無理なく続けられます。
      </>
    ),
  },
  {
    question: '30代・40代ですが、未経験からのエンジニア転職は難しくないでしょうか？',
    answer: (
      <>
        正直ベースでお答えすると、未経験でのエンジニア転職成功者の平均年齢は27歳（※当社調べ）のため、それを大きく超えるご年齢（おおよそ35歳以上）の転職は決して簡単ではありません。<br />
        ただ、SiiDではこれまでのご経歴を強みに変える自己分析・企業分析を重視しています。主任講師は、現役エンジニアでありながら人事部長・経営者として採用側も見てきた視点を持ち、「その年齢・その経歴だからこそ刺さる見せ方」をご提案します。<br />
        30代・40代で未経験からエンジニア転職成功事例は複数ございますので、年齢に不安がある方もまずはご相談ください。
      </>
    ),
  },
  {
    question: 'カウンセリングに参加したら、その場で無理に勧誘されませんか？',
    answer: (
      <>
        無理な勧誘や押し売りは一切ございません。<br />
        お客様の学習目的やご希望のキャリアがSiiDでご提供できるサービスに当てはまらないと判断した場合は、他の選択肢をアドバイスすることもあります。現状を整理することだけでもお役に立てますので、お気軽にご利用ください。
      </>
    ),
  },
  {
    question: '自分が給付金制度の対象になるか知りたいです。',
    answer: (
      <>
        SiiDのCareerコース（12ヶ月プラン）は、経済産業省「第四次産業革命スキル習得講座（リスキル講座）」の認定講座です。条件を満たす方は給付金制度のご活用により、受講料の最大80%が給付対象（実質還付）となります。<br />
        ご経歴により適用可否が変わりますので、カウンセリングにて手続きの流れも含めご案内します。
      </>
    ),
  },
  {
    question: '卒業後のサポートはどうなりますか？',
    answer: (
      <>
        卒業後もカリキュラムへの無期限アクセス、コミュニティ、相談ルームに継続利用いただけます。<br />
        さらにパートナー企業GIG経由の求人紹介「SiiD Passport」、実案件を経験できる「SiiD Quest」も卒業後に活用可能です。学び続けられる環境を無期限でご用意しています。
      </>
    ),
  },
  {
    question: 'カウンセリングは何を相談すればいいですか？',
    answer: (
      <>
        「何から始めていいか分からない」「自分にエンジニアが向いているか知りたい」「給付金を使えるか確認したい」など、漠然としたご相談で問題ありません。<br />
        業界の実情や転職難易度、キャリア選択の考え方など、ネットに載っていない情報も含め一緒に整理します。
      </>
    ),
  },
];

// 旧LPの script.js を React 化: クリックで開閉トグル、初期状態は先頭のみ open
export default function Lp1Faq() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="faq sec" id="faq">
      <div className="sec-head">
        <div className="en">FAQ</div>
        <h2>よくあるご質問</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className={openIndexes.includes(index) ? 'faq-item open' : 'faq-item'}
          >
            <div
              className="faq-q"
              role="button"
              tabIndex={0}
              aria-expanded={openIndexes.includes(index)}
              onClick={() => toggle(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(index);
                }
              }}
            >
              {faq.question}
            </div>
            <div className="faq-a">{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
