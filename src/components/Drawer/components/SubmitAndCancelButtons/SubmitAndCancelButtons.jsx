import classNames from "classnames";
import React from "react";

import styles from "./SubmitAndCancelButtons.module.css";

function SubmitAndCancelButtons(props) {
  return !props.redactAccountType ? (
    <div className={styles.wrapper}>
      <div className={styles.central}>
        <div
          type="submit"
          className={classNames(styles.button, styles.submit)}
          onClick={() => props.handleSubmit()}
        >
          {props.approveText}
        </div>
        <div
          className={classNames(styles.button, styles.cancel)}
          onClick={() => props.handleClose(false)}
        >
          {props.cancelText || "Отменить"}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.centralAccount}>
        <div
          className={classNames(styles.button, styles.cancel)}
          onClick={() => props.handleDelete()}
        >
          {props.deleteText || "Удалить аккаунт"}
        </div>
        <div className={styles.container}>
          <div
            className={classNames(styles.button, styles.cancel)}
            onClick={() => props.handleClose(false)}
          >
            {props.cancelText || "Отменить"}
          </div>
          <div
            type="submit"
            className={classNames(styles.button, styles.submit)}
            onClick={() => props.handleSubmit()}
          >
            {props.approveText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitAndCancelButtons;
