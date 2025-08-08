/* eslint-disable react/no-array-index-key */
import classNames from "classnames";
import React from "react";

import styles from "./SubTitle.module.css";

function SubTitle(props) {
  return (
    <div className={styles.subTitleWrapper}>
      {props.values.map((item, i) => (
        <div
          key={`${item}${i}`}
          className={classNames(styles.item, props.smallTxt && styles.smallTxt)}
        >
          <div>{item}</div>
          {i + 1 !== props.values.length && (
            <span className={styles.radialDivider} />
          )}
        </div>
      ))}
    </div>
  );
}

export default SubTitle;
