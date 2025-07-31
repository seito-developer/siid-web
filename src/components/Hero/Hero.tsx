import React from "react";
import HeroMainCopy from "./HeroMainCopy";
import HeroSubCopy from "./HeroSubCopy";
import HeroBackLogo from "./HeroBackLogo";
import ScrollDown from "./ScrollDown/ScrollDown";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.Hero}>
      <div className={styles.Hero__Copy}>
        <div className={styles.Hero__MainCopy}>
          <HeroMainCopy />
        </div>  
        <div className={styles.Hero__SubCopy}>
          <HeroSubCopy />
        </div>
      </div>
      <div className={styles.Hero__BackLogo}>
        <HeroBackLogo />
      </div>
      <div className={styles.Hero__ScrollDown}>
        <ScrollDown />
      </div>
    </div>
  );
}