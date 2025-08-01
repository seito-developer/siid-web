import ContentsArea from "@/components/ContentsArea/ContentsArea";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import News from "@/components/News/News";
import ReskillBanner from "@/components/ReskillBanner/ReskillBanner";
import styles from "./Home.module.css";
import HomeLayout from "./homeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITエンジニア転職 × 生成AI特化のプログラミングスクール - SiiD",
  description: "SiiDは、ITエンジニア転職と生成AIに特化したプログラミングスクールです。実践的なカリキュラムと最新の技術を学び、あなたのキャリアを次のステージへと導きます。",
};

export default function Home() {
  return (
    <HomeLayout>
      <div className={styles.Home}>
        <Header />
        <div className={styles.Home__Hero}>
          <Hero />
        </div>

        <ContentsArea>
          <div className={styles.Home__News}>
            <News />
          </div>
          <div className={styles.Home__ReskillBanner}>
            <ReskillBanner />
          </div>

          <ul>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
          </ul>
        </ContentsArea>
      </div>
    </HomeLayout>
  );
}