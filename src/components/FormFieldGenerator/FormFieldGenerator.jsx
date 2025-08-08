import classNames from "classnames";
import React from "react";

import styles from "./FormFieldGenerator.module.css";

function FormFieldGenerator(props) {
  return (
    <div
      className={classNames(
        styles.field,
        props.alignStart && styles.alignStart,
        props.small && styles.small
      )}
    >
      <div
        className={classNames(
          styles.fieldText,
          props.alignStart && styles.paddingForText
        )}
      >
        {props.text}
      </div>
      <div
        className={classNames(styles.fieldValue, props.small && styles.small)}
      >
        {props.value}
      </div>
    </div>
  );
}

export default FormFieldGenerator;
