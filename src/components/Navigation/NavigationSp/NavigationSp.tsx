import React, { useState } from "react";
import styles from "./NavigationSp.module.css";
import Logo from "@/components/Logo/Logo";
import HamburgerMenu from "@/components/Navigation/HamburgerMenu/HamburgerMenu";
import Menu from "@/components/Navigation/Menu/Menu";
import ContactButton from "@/components/ContactButton/ContactButton";

function NavigationSp() {
  const [isActive, setIsActive] = useState(false);
  return (
    <nav className={`${styles.NavigationSp} ${isActive ? styles.isActive : ""}`}>
      <div className={styles.NavigationSp__Container}>
        <div className={styles.NavigationSp__ContactButton}>
          <ContactButton />
        </div>
        <div>
          <Menu />
        </div>
      </div>
      <div className={styles.NavigationSp__ButtonContainer}>
        <button
          type="button"
          className={styles.NavigationSp__Button}
          onClick={() => setIsActive(!isActive)}
        >
          <div className={styles.NavigationSp__Item}>
            <Logo />
          </div>
          <div className={styles.NavigationSp__Item}>
            <HamburgerMenu isActive={isActive} />
          </div>
        </button>
      </div>
      <div className={styles.NavigationSp__ButtonBack} />
      <div
        className={styles.NavigationSp__Closer}
        onClick={() => setIsActive(false)}
      />
    </nav>
  );
}

export default NavigationSp;
