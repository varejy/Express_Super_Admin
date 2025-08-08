import React from "react";

import styles from "./DescriptionCreator.module.css";

function DescriptionCreator(props) {
  return (
    <div
      className={styles.wrapper}
      style={{ margin: props.margin || "16px 0px" }}
    >
      {props.values.map((item) => (
        <div className={styles.item} key={item.key}>
          <div className={styles.key}>{item.key}</div>
          <div className={styles.value}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default DescriptionCreator;
