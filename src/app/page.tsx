import ContentsArea from "@/components/ContentsArea/ContentsArea";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import News from "@/components/News/News";
import ReskillBanner from "@/components/ReskillBanner/ReskillBanner";
import styles from "./Home.module.css";

export default function Home() {
  return (
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
  );
}