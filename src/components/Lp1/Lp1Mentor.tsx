import Image from 'next/image';

export default function Lp1Mentor() {
  return (
    <section className="mentor sec" id="mentor">
      <div className="sec-head">
        <div className="en">MENTOR</div>
        <h2>主任講師のプロフィール</h2>
      </div>
      <div className="mentor-card">
        <div className="mentor-avatar" aria-hidden="true">
          <Image src="/images/lp-1/seito.webp" width={154} height={154} alt="" />
        </div>
        <div className="mentor-info">
          <span className="role">CHIEF INSTRUCTOR / FOUNDER</span>
          <h3>
            堀口 セイト
            <span className="name-en">HORIGUCHI SEITO</span>
          </h3>
          <ul>
            <li>合同会社BugFix代表・主任講師</li>
            <li>ミネルバ大学院卒</li>
          </ul>
          <p>
            前職の株式会社LIG在籍時に海外事業部長およびフィリピン支社代表取締役/VPoEとして受託開発・海外拠点を立ち上げ、約100人のエンジニアチームの採用・教育を引率する。
            <br />
            その後独立し開発事業を行うとともにSiiDを設立。現役エンジニアでありながら、人事部長・経営者の立場で採用現場を見てきた視点で、企業が求める本当に必要なスキルの指導に従事。
          </p>
          <ul className="mentor-facts">
            <li>
              <b>SNS</b>
              <br />
              YouTube登録者12.7万人~／Xフォロワー1万人~
            </li>
            <li>
              <b>専門</b>
              <br />
              Web開発・キャリア設計・採用／人事視点の指導
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
