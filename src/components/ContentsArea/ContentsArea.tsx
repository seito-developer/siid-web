import React from "react";
import styles from "./ContentsArea.module.css";

type Props = {
  children: React.ReactNode;
};

export default function ContentArea({ children }: Props) {
  return <main className={styles.ContentsArea}>{children}</main>;
}
