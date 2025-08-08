import React from "react";
import classNames from "classnames";
import { IconButton } from "@mui/material";
import styles from "./DeleteButton.module.css";

export default function DeleteButton(props) {
  return (
    <div {...props}>
      <IconButton
        className={styles.deleteButton}
        type="submit"
        aria-label="delete"
      >
        <div className={styles.deleteIcon} />
      </IconButton>
    </div>
  );
}
