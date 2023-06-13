import React from "react";
import styles from "./Summary.module.css";

type Props = {
  summary: string;
};

const Summary = ({ summary }: Props) => {
  if (!summary) {
    return null;
  }

  return (
    <div className={styles.summaryBox}>
      <h2>Summary</h2>
      <p className={styles.summaryText}>{summary}</p>
    </div>
  );
};

export default Summary;
