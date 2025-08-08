import React from "react";

import styles from "./CreateBtnGenerator.module.css";

function CreateBtnGenerator(props) {
  return (
    <div className={styles.createButton}>
      <div className={styles.createButtonIcon} />
      {props.text}
    </div>
  );
}

export default CreateBtnGenerator;
