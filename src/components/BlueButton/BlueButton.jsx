import React from "react";

import styles from "./BlueButton.module.css";

export default function BlueButton(props) {
  return (
    <div>
      <button
        type="button"
        style={{
          width: props.maxwdt === true ? "100%" : "auto",
          margin: props.maxwdt === true ? "15px 0" : "0 0",
        }}
        className={styles.blueButton}
        {...props}
      >
        {props.label}
      </button>
    </div>
  );
}
