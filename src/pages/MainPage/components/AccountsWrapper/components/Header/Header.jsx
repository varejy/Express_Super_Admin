import React, { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import SearchAndSelect from "./components/SearchAndSelect/SearchAndSelect";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";

import styles from "./Header.module.css";
import Drawer from "../../../../../../components/Drawer/Drawer";

function Header() {
  const { accounts } = useSelector((rootReducer) => rootReducer.accounts);
  const [state, setState] = useState(false);

  const toggleDrawer = (value) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(value);
  };

  return (
    <div className={classNames(styles.header, styles.displayFlex)}>
      <span className={classNames(styles.elemWrapper, styles.displayFlex)}>
        <div className={styles.title}>Аккаунты</div>
        <div className={styles.subTitle}>
          {`Отфильтровано ${accounts.length} аккаунта`}
        </div>
      </span>
      <div
        className={classNames(
          styles.searchAndBtnWrapper,
          styles.elemWrapper,
          styles.displayFlex
        )}
      >
        <SearchAndSelect />
        <button
          type="button"
          onClick={toggleDrawer(true)}
          className={classNames(styles.createAccountBtn, styles.displayFlex)}
        >
          Создать аккаунт
        </button>
      </div>
      <Drawer
        status={state}
        component={<CreateAccountForm toggleDrawer={toggleDrawer} />}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
}

export default Header;
