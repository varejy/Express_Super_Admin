import React from "react";
import classNames from "classnames";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import styles from "./EditButton.module.css";

export default function EditButton(props) {
  return (
    <IconButton
      className={classNames(
        styles.editButton,
        props.smallPadding && styles.smallPadding
      )}
      type="submit"
      aria-label="edit"
      {...props}
    >
      {props.icon ? props.icon : <EditIcon />}
    </IconButton>
  );
}
