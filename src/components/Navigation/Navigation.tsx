'use client';

import React, { useState } from "react";
import styles from "./Navigation.module.css";
import Logo from "@/components/Logo/Logo";
import HamburgerMenu from "@/components/HamburgerMenu/HamburgerMenu";
import Menu from "@/components/Menu/Menu";

export default function Navigation() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <nav className={`${styles.Navigation} ${isActive ? styles.isActive : ""}`}>
        <div className={styles.Navigation__Container}>
            <div>
                <Menu />
            </div>
        </div>
        <div className={styles.Navigation__ButtonContainer}>
            <button
                type="button"
                className={styles.Navigation__Button}
                onClick={() => setIsActive(!isActive)}
            >
                <div className={styles.Navigation__Item}>
                    <Logo />
                </div>
                <div className={styles.Navigation__Item}>
                    <HamburgerMenu />
                </div>
            </button>
        </div>
        <div className={styles.Navigation__ButtonBack} />
        <div className={styles.Navigation__Closer} onClick={() => setIsActive(false)} />
    </nav>
  );
}

