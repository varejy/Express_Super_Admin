import React from "react";
import classNames from "classnames";

import { Input } from "semantic-ui-react";
import styles from "./TextInput.module.css";

export default function TextInput(props) {
  let classes = styles.textInput;
  if (props.className) {
    classes = classNames(classes, props.className);
  }

  return <Input {...props} className={classes} />;
}
