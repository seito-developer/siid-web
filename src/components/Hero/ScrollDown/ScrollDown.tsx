"use client";

import React from "react";
import styles from "./ScrollDown.module.css";
import Corner, { CornerPosition } from "@/components/Corner/Corner";
import useIsPc from "@/hooks/useIsPc";

export default function ScrollDown() {
  const isPc = useIsPc();

  return (
    <div className={styles.ScrollDown}>
      <span>Scroll down</span>
      <svg width={19} height={19}>
        <use href={`#scrollArrow`} />
      </svg>
      {isPc ? (
        <>
          <Corner
            width="16px"
            height="16px"
            top="-16px"
            left="0"
            position={CornerPosition.BOTTOM_LEFT}
          />
          <Corner
            width="16px"
            height="16px"
            bottom="8px"
            right="-16px"
            position={CornerPosition.BOTTOM_LEFT}
          />
        </>
      ) : (
        <>
          <Corner
            width="10px"
            height="10px"
            top="-10px"
            right="8px"
            position={CornerPosition.BOTTOM_RIGHT}
          />
          <Corner
            width="10px"
            height="10px"
            bottom="8px"
            left="-10px"
            position={CornerPosition.BOTTOM_RIGHT}
          />
        </>
      )}
    </div>
  );
}
