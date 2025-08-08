import React, { useState } from "react";
import classNames from "classnames";

import styles from "./Header.module.css";
import Search from "./Search/Search";
import Drawer from "../../../../components/Drawer/Drawer";
import CreateTariffPlanForm from "../CreateTariffPlanForm/CreateTariffPlanForm";

function Header() {
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
        <div className={styles.title}>Тарифные планы</div>
        <div className={styles.subTitle}>{`Всего ${13} тарифных планов`}</div>
      </span>
      <div
        className={classNames(
          styles.searchAndBtnWrapper,
          styles.elemWrapper,
          styles.displayFlex
        )}
      >
        <Search />
        <button
          type="button"
          onClick={toggleDrawer(true)}
          className={classNames(styles.createBtn, styles.displayFlex)}
        >
          Создать тарифный план
        </button>
      </div>
      <Drawer
        status={state}
        component={<CreateTariffPlanForm toggleDrawer={toggleDrawer} />}
        toggleDrawer={toggleDrawer}
        onOpen={() => {}}
      />
    </div>
  );
}

export default Header;
