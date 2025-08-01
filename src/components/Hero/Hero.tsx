"use client";

import React from "react";
import HeroMainCopy from "./HeroMainCopy/HeroMainCopy";
import HeroMainCopyPc from "./HeroMainCopy/HeroMainCopyPc";
import HeroSubCopy from "./HeroSubCopy/HeroSubCopy";
import HeroBackLogo from "./HeroBackLogo";
import ScrollDown from "./ScrollDown/ScrollDown";
import styles from "./Hero.module.css";
import useIsPc from "@/hooks/useIsPc";
import HeroSubCopyPc from "./HeroSubCopy/HeroSubCopyPc";
import Corner, { CornerPosition } from "../Corner/Corner";
import News from "../News/News";
import ReskillBanner from "../ReskillBanner/ReskillBanner";
import NavigationPc from "../Navigation/NavigationPc/NavigationPc";

export default function Hero() {
  const isPc = useIsPc();

  return (
    <div className={styles.Hero}>
      <div className={styles.Hero__Copy}>
        <div className={styles.Hero__MainCopy}>
          {isPc ? <HeroMainCopyPc /> : <HeroMainCopy />}
        </div>
        <div className={styles.Hero__SubCopy}>
          {isPc ? <HeroSubCopyPc /> : <HeroSubCopy />}
        </div>
      </div>
      <div className={styles.Hero__BackLogo}>
        <HeroBackLogo />
      </div>
      <div className={styles.Hero__ScrollDown}>
        <ScrollDown />
      </div>
      {isPc && (
        <>
          <div className={styles.Hero__RigtBottomCorner}>
            <Corner
              width="16px"
              height="16px"
              bottom="0"
              right="0"
              position={CornerPosition.BOTTOM_RIGHT}
            />
          </div>
          <div className={styles.Hero__News}>
            <News />
          </div>
          <div className={styles.Hero__ReskillBanner}>
            <ReskillBanner />
          </div>
          <div className={styles.Hero__Navigation}>
            <NavigationPc />
          </div>
        </>
      )}
    </div>
  );
}
