import React from "react";
import HeroMainCopy from "./HeroMainCopy";
import HeroSubCopy from "./HeroSubCopy";
import HeroBackLogo from "./HeroBackLogo";
import ScrollDown from "./ScrollDown/ScrollDown";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.Hero}>
        <HeroMainCopy />
        <HeroSubCopy />
        <HeroBackLogo />
        <div className={styles.Hero__ScrollDown}>
          <ScrollDown />
        </div>
    </div>
  );
}