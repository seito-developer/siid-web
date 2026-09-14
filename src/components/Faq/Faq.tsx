import styles from './Faq.module.css';
import FaqItem from './FaqItem/FaqItem';

// 確定原稿(2026-09-15 ユーザー提供、Issue #82)。
// answer の改行は FaqItem 側の white-space: pre-line で表示に反映される。
const faqData = [
  {
    number: 'Q1',
    question: 'プログラミング未経験ですが、ついていけるでしょうか？',
    answer:
      '問題ありません。SiiDの受講生様は7割が未経験の方です。\nゼロからでも始められるよう、講師にZoomで質問・相談できる機会が毎日用意されていたり、学習ペースを自分で決められる環境がございます。',
  },
  {
    number: 'Q2',
    question: '現役エンジニアでも受講できますか？',
    answer:
      '問題ありません。SiiDの受講生様は3割が現役エンジニアの方です。\nモダン技術や生成AIスキルの習得、あるいは年収アップなどの転職目的でご受講いただけます。',
  },
  {
    number: 'Q3',
    question: '仕事や家庭があるので忙しいのですが、両立できますか？',
    answer:
      '大丈夫です。チャット質問は24時間ご利用いただけますし、Zoomでのご質問・ご相談は毎日夜21:00〜23:00に実施しているのでお仕事終わりに参加できます。\nまた、学習ペースもご自身で決められるので、お仕事やご家庭の状況に合わせて無理なく続けられます。',
  },
  {
    number: 'Q4',
    question: '30代・40代ですが、未経験からのエンジニア転職は難しくないでしょうか？',
    answer:
      '正直ベースでお答えすると、未経験でのエンジニア転職成功者の平均年齢は27歳（※当社調べ）のため、それを大きく超えるご年齢（おおよそ35歳以上）の転職は決して簡単ではありません。\nただ、SiiDではこれまでのご経歴を強みに変える自己分析・企業分析を重視しています。主任講師は、現役エンジニアでありながら人事部長・経営者として採用側も見てきた視点を持ち、「その年齢・その経歴だからこそ刺さる見せ方」をご提案します。\n30代・40代で未経験からエンジニア転職成功事例は複数ございますので、年齢に不安がある方もまずはご相談ください。',
  },
];

export default function Faq() {
  return (
    <div className={styles.Faq}>
      <div className={styles.Faq__Title}>{'</ Faq >'}</div>
      <h2 className={styles.Faq__Heading}>よくある質問</h2>
      <div className={styles.Faq__List}>
        {faqData.map((faq, index) => (
          <FaqItem key={index} number={faq.number} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
        ))}
      </div>
    </div>
  );
}
