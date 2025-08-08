import React from "react";

import styles from "./ColoredSubTitleGenerator.module.css";

function ColoredSubTitleGenerator(props) {
  return (
    <div className={styles.wrapper}>
      {props.values.map((item) => (
        <div className={styles.item} key={item.key}>
          <div className={styles.key}>{item.key}</div>
          <div
            className={styles.value}
            style={{ color: item.color || "#03A9F4" }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColoredSubTitleGenerator;
