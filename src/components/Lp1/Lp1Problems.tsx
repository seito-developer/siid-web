import Image from 'next/image';

const concerns: string[] = [
  '何から学べばいいか分からず、独学で遠回りしてしまう',
  '生成AI時代、どんなスキルを身につければ生き残れるのかわからない',
  '30代・40代からでも、本当に転職できるのか不安',
  '仕事や家庭と両立しながら、本当に学習を続けられるか不安',
];

export default function Lp1Problems() {
  return (
    <section className="reason sec" id="problems">
      <div className="sec-head">
        <div className="en">PROBLEMS</div>
        <h2>こんなお悩みや<br />不安はありませんか？</h2>
      </div>

      <div className="p-wrap">
        <div className="p-visual">
          <Image
            src="/images/lp-1/nayami.webp"
            width={1016}
            height={572}
            alt="ゴールに向かって曲がりくねった山道を登るビジネスパーソン"
          />
        </div>

        <div className="concerns">
          <p className="concerns-lead">
            未経験からAI学習やエンジニア転職を目指す社会人の多くが、こんな不安を抱えています。
          </p>
          {concerns.map((concern) => (
            <div key={concern} className="concern">
              {concern}
            </div>
          ))}
          <div className="concern-bridge">
            次章「<b>SiiDが選ばれる6つの理由</b>」で、この悩みにお答えします。
          </div>
        </div>
      </div>
    </section>
  );
}
