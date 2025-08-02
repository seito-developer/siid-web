import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import News from "@/components/News/News";
import ReskillBanner from "@/components/ReskillBanner/ReskillBanner";
import ClientLoadingScreen from "@/components/ClientLoadingScreen/ClientLoadingScreen";
import styles from "./Home.module.css";
import HomeLayout from "./homeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITエンジニア転職 × 生成AI特化のプログラミングスクール - SiiD",
  description: "SiiDは、ITエンジニア転職と生成AIに特化したプログラミングスクールです。実践的なカリキュラムと最新の技術を学び、あなたのキャリアを次のステージへと導きます。",
};

export default function Home() {
  return (
    <>
      <ClientLoadingScreen />
      <HomeLayout>
        <div className={styles.Home}>
          <Header />
          <div className={styles.Home__Hero}>
            <Hero />
          </div>

          <div className={styles.Home__Contents}>
            <div className={styles.Home__News}>
              <News />
            </div>
            <div className={styles.Home__ReskillBanner}>
              <ReskillBanner />
            </div>

            <div style={{ height: "1000px" }}>
              Contents Area
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}