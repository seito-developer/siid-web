import styles from './Faq.module.css';
import FaqItem from './FaqItem/FaqItem';

const faqData = [
  {
    number: 'Q1',
    question: '質問が入ります',
    answer:
      '回答の文章が入ります回答の文章が入ります回答の文章が入ります回答の文章が入ります回答の文章が入ります回答の文章が入ります回答の文章が入ります回答の文章が入ります回答の文章が入ります',
  },
  {
    number: 'Q2',
    question: '最長で18ヶ月の受講期間を超えたらどうなりますか',
    answer: '回答の文章が入ります',
  },
  {
    number: 'Q3',
    question: '月に１万円で他のスクールよりも安いのはどうしてですか',
    answer: '回答の文章が入ります',
  },
  {
    number: 'Q4',
    question: 'リスキル応援給付金を使いたいのですが....',
    answer: '回答の文章が入ります',
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